import { useState, useCallback, useRef } from "react";
import { platformsApi } from "../api";

// Opens a popup window for OAuth, polls for it closing, then refetches platforms
export function useOAuth(onSuccess) {
  const [connecting, setConnecting] = useState(null); // platform id being connected
  const [error, setError] = useState(null);
  const popupRef = useRef(null);
  const pollRef = useRef(null);

  const openOAuth = useCallback(async (platform) => {
    setError(null);
    setConnecting(platform);

    try {
      // Ask backend for the OAuth URL (includes our client_id, scopes, state)
      const { redirectUrl } = await platformsApi.getConnectUrl(platform);

      // ── Popup mode (preferred) ───────────────────────────────────────────────
      const width = 500, height = 700;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;

      const popup = window.open(
        redirectUrl,
        `clipdrop_oauth_${platform}`,
        `width=${width},height=${height},left=${left},top=${top},toolbar=0,menubar=0,location=0`
      );

      // If popup blocked, fall back to full redirect
      if (!popup || popup.closed || typeof popup.closed === "undefined") {
        window.location.href = redirectUrl;
        return;
      }

      popupRef.current = popup;

      // Poll every 500ms — when popup closes, check if connection succeeded
      pollRef.current = setInterval(async () => {
        if (popup.closed) {
          clearInterval(pollRef.current);
          setConnecting(null);

          // Re-fetch platforms — if platform now appears, OAuth worked
          try {
            const data = await platformsApi.list();
            const connected = data.platforms?.[platform];
            if (connected) {
              onSuccess?.(platform, connected);
            } else {
              setError(`${platform} was not connected. Please try again.`);
            }
          } catch {
            setError("Could not verify connection. Please refresh.");
          }
        }
      }, 500);

    } catch (err) {
      setError(err.message);
      setConnecting(null);
    }
  }, [onSuccess]);

  const cancelOAuth = useCallback(() => {
    if (popupRef.current && !popupRef.current.closed) {
      popupRef.current.close();
    }
    clearInterval(pollRef.current);
    setConnecting(null);
  }, []);

  return { connecting, error, openOAuth, cancelOAuth };
}
