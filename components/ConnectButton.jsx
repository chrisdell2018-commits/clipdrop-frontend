// ConnectButton.jsx
// Compact connect/disconnect button — use inline anywhere in your app.
// Great for the upload flow where you want to show platform status without
// navigating away.
//
// Usage:
//   <ConnectButton platformId="youtube" />
//   <ConnectButton platformId="tiktok" compact />

import { usePlatforms } from "../hooks/usePlatforms";

const PLATFORM_META = {
  youtube:   { name: "YouTube",   color: "#FF0000" },
  tiktok:    { name: "TikTok",    color: "#00f2ea" },
  instagram: { name: "Instagram", color: "#E1306C" },
  facebook:  { name: "Facebook",  color: "#1877F2" },
};

export const ConnectButton = ({ platformId, compact = false, onConnected }) => {
  const { isConnected, isConnecting, isDisconnecting, getUsername, connect, disconnect } = usePlatforms();
  const meta = PLATFORM_META[platformId];
  if (!meta) return null;

  const connected = isConnected(platformId);
  const connecting = isConnecting(platformId);
  const disconnecting = isDisconnecting(platformId);
  const busy = connecting || disconnecting;
  const username = getUsername(platformId);

  const handleConnect = async () => {
    await connect(platformId);
    if (onConnected) onConnected(platformId);
  };

  if (compact) {
    return (
      <button
        onClick={connected ? () => disconnect(platformId) : handleConnect}
        disabled={busy}
        title={connected ? `Disconnect ${meta.name}` : `Connect ${meta.name}`}
        style={{
          padding: "6px 12px", borderRadius: 8, border: "none",
          background: connected ? meta.color + "20" : "#1e1e30",
          color: connected ? meta.color : "#666",
          fontSize: 12, fontWeight: 500, cursor: busy ? "default" : "pointer",
          display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s",
        }}
      >
        <div style={{
          width: 6, height: 6, borderRadius: "50%",
          background: connected ? meta.color : "#444",
        }} />
        {busy ? "..." : connected ? (username || "Connected") : `Connect ${meta.name}`}
      </button>
    );
  }

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      background: "#0d0d18", border: "1px solid #1e1e30",
      borderRadius: 12, padding: "10px 14px",
    }}>
      <div style={{
        width: 8, height: 8, borderRadius: "50%",
        background: connected ? meta.color : "#333",
        flexShrink: 0,
      }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: "#e8e8f0" }}>{meta.name}</div>
        {connected && username && (
          <div style={{ fontSize: 11, color: "#555" }}>@{username}</div>
        )}
      </div>
      <button
        onClick={connected ? () => disconnect(platformId) : handleConnect}
        disabled={busy}
        style={{
          padding: "6px 14px", borderRadius: 8, border: "none",
          background: connected ? "transparent" : meta.color,
          color: connected ? "#555" : "#fff",
          fontSize: 12, fontWeight: 500, cursor: busy ? "default" : "pointer",
          border: connected ? "1px solid #2a2a3a" : "none",
          transition: "all 0.2s",
        }}
      >
        {busy ? "..." : connected ? "Disconnect" : "Connect"}
      </button>
    </div>
  );
};
