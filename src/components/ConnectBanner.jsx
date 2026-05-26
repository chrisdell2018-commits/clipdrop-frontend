/**
 * ConnectBanner
 * Shows inline when user tries to publish but platforms aren't connected.
 * Place this above the Publish button in your upload flow.
 */
export function ConnectBanner({ unconnectedPlatforms, onGoToConnections }) {
  if (!unconnectedPlatforms || unconnectedPlatforms.length === 0) return null;

  const PLATFORM_COLORS = {
    youtube: "#FF0000", tiktok: "#010101", instagram: "#E1306C", facebook: "#1877F2",
  };

  return (
    <div style={{
      background: "#1a1400",
      border: "1px solid #f59e0b40",
      borderRadius: 14,
      padding: "14px 18px",
      display: "flex",
      alignItems: "center",
      gap: 14,
      marginBottom: 16,
    }}>
      <div style={{ fontSize: 22, flexShrink: 0 }}>⚡</div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#f59e0b", marginBottom: 4 }}>
          Connect platforms before publishing
        </p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {unconnectedPlatforms.map((p) => (
            <span key={p} style={{
              fontSize: 11, padding: "2px 8px", borderRadius: 8,
              background: (PLATFORM_COLORS[p] || "#888") + "20",
              color: PLATFORM_COLORS[p] || "#888",
              fontWeight: 500,
            }}>
              {p.charAt(0).toUpperCase() + p.slice(1)} not connected
            </span>
          ))}
        </div>
      </div>
      <button
        onClick={onGoToConnections}
        style={{
          padding: "8px 14px", background: "#f59e0b", border: "none",
          borderRadius: 10, color: "#000", fontSize: 12, fontWeight: 700,
          cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap",
        }}
      >
        Connect now →
      </button>
    </div>
  );
}
