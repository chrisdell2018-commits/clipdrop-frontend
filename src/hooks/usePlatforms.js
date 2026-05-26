import { useState, useEffect, useCallback } from "react";
import { platformsApi } from "../api";

export const PLATFORM_META = {
  youtube: {
    name: "YouTube",
    color: "#FF0000",
    bg: "rgba(255,0,0,0.08)",
    description: "Upload your full 30-min video as one piece.",
    permissions: ["Upload videos", "Manage your channel"],
    clipLabel: "1 full video",
    format: "16:9",
  },
  tiktok: {
    name: "TikTok",
    color: "#ff0050",
    bg: "rgba(255,0,80,0.08)",
    description: "Auto-split into 60-second vertical clips.",
    permissions: ["Publish videos", "Read basic profile"],
    clipLabel: "30 × 60s clips",
    format: "9:16",
  },
  instagram: {
    name: "Instagram",
    color: "#E1306C",
    bg: "rgba(225,48,108,0.08)",
    description: "Post as Reels up to 90 seconds each.",
    permissions: ["Publish Reels", "Read account info"],
    clipLabel: "20 × 90s Reels",
    format: "9:16",
  },
  facebook: {
    name: "Facebook",
    color: "#1877F2",
    bg: "rgba(24,119,242,0.08)",
    description: "Share short clips to your Page or profile.",
    permissions: ["Manage Page posts", "Read Page info"],
    clipLabel: "30 × 60s clips",
    format: "16:9",
  },
};

export function usePlatforms() {
  const [platforms, setPlatforms] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [disconnecting, setDisconnecting] = useState(null);

  const fetchPlatforms = useCallback(async () => {
    try {
      setError(null);
      const data = await platformsApi.list();
      setPlatforms(data.platforms || {});
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPlatforms(); }, [fetchPlatforms]);

  // Handle OAuth callback redirect (?platform=youtube&connected=true)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const platform = params.get("platform");
    const connected = params.get("connected");
    if (platform && connected === "true") {
      window.history.replaceState({}, "", window.location.pathname + "#/connections");
      fetchPlatforms();
    }
  }, [fetchPlatforms]);

  const disconnect = useCallback(async (platform) => {
    setDisconnecting(platform);
    try {
      await platformsApi.disconnect(platform);
      setPlatforms((prev) => { const n = { ...prev }; delete n[platform]; return n; });
    } catch (err) {
      setError(err.message);
    } finally {
      setDisconnecting(null);
    }
  }, []);

  return { platforms, loading, error, disconnecting, refetch: fetchPlatforms, disconnect };
}
