// usePlatforms.js — React hook that manages all platform connection state
// Drop this into any component that needs to know which platforms are connected.
//
// Usage:
//   const { platforms, loading, connect, disconnect, refresh } = usePlatforms();

import { useState, useEffect, useCallback } from "react";
import { getConnectedPlatforms, getOAuthUrl, disconnectPlatform } from "../api/platforms";

// Popup window config
const POPUP_CONFIG = "width=600,height=700,scrollbars=yes,resizable=yes,toolbar=no,menubar=no";

// Polls a popup window every 500ms and resolves when it closes
const waitForPopupClose = (popup) =>
  new Promise((resolve) => {
    const timer = setInterval(() => {
      if (popup.closed) {
        clearInterval(timer);
        resolve();
      }
    }, 500);
  });

// Parse ?platform=X&connected=true from URL (used on callback return)
const parseCallbackParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    platform: params.get("platform"),
    connected: params.get("connected") === "true",
    error: params.get("error"),
  };
};

export const usePlatforms = () => {
  const [platforms, setPlatforms] = useState({});
  const [loading, setLoading] = useState(true);
  const [connectingPlatform, setConnectingPlatform] = useState(null);
  const [disconnectingPlatform, setDisconnectingPlatform] = useState(null);
  const [error, setError] = useState(null);
  const [lastConnected, setLastConnected] = useState(null); // for success flash

  // ─── Load current connection state ──────────────────────────────────────────
  const refresh = useCallback(async () => {
    try {
      setError(null);
      const data = await getConnectedPlatforms();
      setPlatforms(data.platforms || {});
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // ─── Check if we just returned from an OAuth callback ──────────────────────
  useEffect(() => {
    const { platform, connected, error: cbError } = parseCallbackParams();
    if (platform) {
      if (connected) {
        setLastConnected(platform);
        refresh(); // reload connection state
        setTimeout(() => setLastConnected(null), 4000);
      } else if (cbError) {
        setError(`Failed to connect ${platform}: ${cbError}`);
      }
      // Clean up URL params without a page reload
      const url = new URL(window.location.href);
      url.searchParams.delete("platform");
      url.searchParams.delete("connected");
      url.searchParams.delete("error");
      window.history.replaceState({}, "", url.toString());
    }
  }, [refresh]);

  // ─── Connect a platform via popup OAuth window ───────────────────────────────
  const connect = useCallback(async (platformId) => {
    setConnectingPlatform(platformId);
    setError(null);

    try {
      // 1. Ask backend for the OAuth redirect URL
      const { redirectUrl } = await getOAuthUrl(platformId);

      // 2. Open OAuth in a popup window
      const popup = window.open(redirectUrl, `connect_${platformId}`, POPUP_CONFIG);

      if (!popup) {
        // Popup was blocked — fall back to redirect in same tab
        window.location.href = redirectUrl;
        return;
      }

      // 3. Wait for the popup to close (user finishes OAuth)
      await waitForPopupClose(popup);

      // 4. Reload connection state — backend has saved the token by now
      await refresh();
      setLastConnected(platformId);
      setTimeout(() => setLastConnected(null), 4000);

    } catch (err) {
      setError(`Could not connect ${platformId}: ${err.message}`);
    } finally {
      setConnectingPlatform(null);
    }
  }, [refresh]);

  // ─── Disconnect a platform ───────────────────────────────────────────────────
  const disconnect = useCallback(async (platformId) => {
    setDisconnectingPlatform(platformId);
    setError(null);

    try {
      await disconnectPlatform(platformId);
      setPlatforms((prev) => {
        const next = { ...prev };
        delete next[platformId];
        return next;
      });
    } catch (err) {
      setError(`Could not disconnect ${platformId}: ${err.message}`);
    } finally {
      setDisconnectingPlatform(null);
    }
  }, []);

  // ─── Helpers ────────────────────────────────────────────────────────────────
  const isConnected = (platformId) => !!platforms[platformId]?.connected;
  const isConnecting = (platformId) => connectingPlatform === platformId;
  const isDisconnecting = (platformId) => disconnectingPlatform === platformId;
  const getUsername = (platformId) => platforms[platformId]?.username;
  const connectedCount = Object.values(platforms).filter((p) => p.connected).length;

  return {
    platforms,           // raw platform data object
    loading,             // initial load
    error,               // last error message or null
    lastConnected,       // platform that just successfully connected (for flash)
    connect,             // (platformId) => void — opens OAuth popup
    disconnect,          // (platformId) => void — removes token
    refresh,             // () => void — manually reload from server
    isConnected,         // (platformId) => bool
    isConnecting,        // (platformId) => bool
    isDisconnecting,     // (platformId) => bool
    getUsername,         // (platformId) => string | undefined
    connectedCount,      // number of connected platforms
  };
};
