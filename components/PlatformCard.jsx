// PlatformCard.jsx — Single platform connection card
// Shows connection status, username, and connect/disconnect button.

import { useState } from "react";

const PLATFORMS_META = {
  youtube: {
    name: "YouTube",
    color: "#FF0000",
    bgColor: "#1a0a0a",
    borderColor: "#FF000030",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 0 0 .5 6.19C0 8.04 0 12 0 12s0 3.96.5 5.81a3.02 3.02 0 0 0 2.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14C24 15.96 24 12 24 12s0-3.96-.5-5.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
      </svg>
    ),
    description: "Upload full videos to your YouTube channel",
    contentType: "Full video · 1080p",
    docsUrl: "https://console.cloud.google.com/apis/dashboard",
    docsLabel: "Google Cloud Console",
  },
  tiktok: {
    name: "TikTok",
    color: "#00f2ea",
    bgColor: "#0a1a1a",
    borderColor: "#00f2ea25",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.73a4.85 4.85 0 0 1-1.01-.04z"/>
      </svg>
    ),
    description: "Post auto-split 60-second clips to TikTok",
    contentType: "60-sec clips · 9:16 vertical",
    docsUrl: "https://developers.tiktok.com/",
    docsLabel: "TikTok Developer Portal",
  },
  instagram: {
    name: "Instagram",
    color: "#E1306C",
    bgColor: "#1a0a10",
    borderColor: "#E1306C25",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    description: "Publish Reels to your Instagram account",
    contentType: "90-sec Reels · 9:16 vertical",
    docsUrl: "https://developers.facebook.com/apps/",
    docsLabel: "Meta Developer Portal",
  },
  facebook: {
    name: "Facebook",
    color: "#1877F2",
    bgColor: "#0a0e1a",
    borderColor: "#1877F225",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    description: "Share short videos to your Facebook Page",
    contentType: "60-sec clips · 16:9",
    docsUrl: "https://developers.facebook.com/apps/",
    docsLabel: "Meta Developer Portal",
  },
};

export const PlatformCard = ({
  platformId,
  isConnected,
  isConnecting,
  isDisconnecting,
  username,
  tokenExpires,
  justConnected,
  onConnect,
  onDisconnect,
}) => {
  const [showDisconnectConfirm, setShowDisconnectConfirm] = useState(false);
  const meta = PLATFORMS_META[platformId];
  if (!meta) return null;

  const isTokenExpiringSoon = tokenExpires && new Date(tokenExpires) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const isBusy = isConnecting || isDisconnecting;

  const handleDisconnect = () => {
    if (!showDisconnectConfirm) {
      setShowDisconnectConfirm(true);
      setTimeout(() => setShowDisconnectConfirm(false), 3000); // auto-cancel after 3s
      return;
    }
    setShowDisconnectConfirm(false);
    onDisconnect(platformId);
  };

  return (
    <div style={{
      background: isConnected ? meta.bgColor : "#0d0d18",
      border: `1px solid ${isConnected ? meta.borderColor : justConnected ? meta.color + "60" : "#1e1e30"}`,
      borderRadius: 16,
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: 14,
      transition: "border-color 0.3s, box-shadow 0.3s",
      boxShadow: justConnected ? `0 0 20px ${meta.color}20` : "none",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Connected glow strip */}
      {isConnected && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, transparent, ${meta.color}, transparent)`,
        }} />
      )}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: meta.color + "20",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: meta.color, flexShrink: 0,
        }}>
          {meta.icon}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: "#e8e8f0" }}>{meta.name}</span>
            {isConnected && (
              <span style={{
                fontSize: 10, fontWeight: 600,
                background: meta.color + "25", color: meta.color,
                padding: "2px 7px", borderRadius: 20, letterSpacing: "0.05em",
              }}>CONNECTED</span>
            )}
            {justConnected && (
              <span style={{
                fontSize: 10, fontWeight: 600,
                background: "#34d39925", color: "#34d399",
                padding: "2px 7px", borderRadius: 20,
              }}>✓ JUST CONNECTED</span>
            )}
          </div>
          <div style={{ fontSize: 12, color: "#555", marginTop: 2 }}>
            {isConnected && username ? `@${username}` : meta.description}
          </div>
        </div>
      </div>

      {/* Content type badge */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "#ffffff08", borderRadius: 8, padding: "8px 12px",
      }}>
        <span style={{ fontSize: 12, color: "#666" }}>Posts as</span>
        <span style={{ fontSize: 12, color: "#aaa", fontWeight: 500 }}>{meta.contentType}</span>
      </div>

      {/* Token expiry warning */}
      {isConnected && isTokenExpiringSoon && (
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "#f59e0b15", border: "1px solid #f59e0b30",
          borderRadius: 8, padding: "8px 12px",
        }}>
          <span style={{ fontSize: 14 }}>⚠️</span>
          <span style={{ fontSize: 12, color: "#f59e0b" }}>
            Access expires {new Date(tokenExpires).toLocaleDateString()} — reconnect soon
          </span>
        </div>
      )}

      {/* Action button */}
      {isConnected ? (
        <button
          onClick={handleDisconnect}
          disabled={isBusy}
          style={{
            width: "100%", padding: "10px 16px", borderRadius: 10,
            border: showDisconnectConfirm ? "1px solid #ef444460" : "1px solid #2a2a3a",
            background: showDisconnectConfirm ? "#ef444415" : "transparent",
            color: showDisconnectConfirm ? "#ef4444" : "#666",
            fontSize: 13, fontWeight: 500, cursor: isBusy ? "default" : "pointer",
            transition: "all 0.2s",
          }}
        >
          {isDisconnecting ? "Disconnecting..." : showDisconnectConfirm ? "Tap again to confirm disconnect" : "Disconnect"}
        </button>
      ) : (
        <button
          onClick={() => onConnect(platformId)}
          disabled={isBusy}
          style={{
            width: "100%", padding: "11px 16px", borderRadius: 10,
            border: "none",
            background: isBusy ? "#2a2a3a" : `linear-gradient(135deg, ${meta.color}dd, ${meta.color}99)`,
            color: isBusy ? "#555" : "#fff",
            fontSize: 13, fontWeight: 600, cursor: isBusy ? "default" : "pointer",
            transition: "all 0.2s",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}
        >
          {isConnecting ? (
            <>
              <span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>⟳</span>
              Connecting...
            </>
          ) : (
            `Connect ${meta.name}`
          )}
        </button>
      )}

      {/* API setup hint for disconnected */}
      {!isConnected && !isConnecting && (
        <p style={{ fontSize: 11, color: "#444", textAlign: "center", margin: 0 }}>
          Requires API keys from{" "}
          <a href={meta.docsUrl} target="_blank" rel="noopener noreferrer"
            style={{ color: "#666", textDecoration: "underline" }}>
            {meta.docsLabel}
          </a>
        </p>
      )}
    </div>
  );
};

export { PLATFORMS_META };
