import { useState } from "react";
import { PLATFORM_META } from "../hooks/usePlatforms";

const ICONS = {
  youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.75a8.16 8.16 0 0 0 4.78 1.52V6.82a4.85 4.85 0 0 1-1.01-.13z"/>
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
};

export function PlatformCard({ platformId, connectionInfo, connecting, disconnecting, onConnect, onDisconnect }) {
  const meta = PLATFORM_META[platformId];
  const isConnected = !!connectionInfo;
  const isConnecting = connecting === platformId;
  const isDisconnecting = disconnecting === platformId;
  const [showConfirm, setShowConfirm] = useState(false);

  const busy = isConnecting || isDisconnecting;

  return (
    <div style={{
      background: "#0d0d18",
      border: `1.5px solid ${isConnected ? meta.color + "50" : "#1e1e30"}`,
      borderRadius: 18,
      padding: "22px 22px 20px",
      display: "flex",
      flexDirection: "column",
      gap: 16,
      transition: "border-color 0.2s, transform 0.15s",
      transform: isConnecting ? "scale(0.99)" : "scale(1)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Glow background when connected */}
      {isConnected && (
        <div style={{
          position: "absolute", inset: 0, borderRadius: 18,
          background: `radial-gradient(ellipse at top left, ${meta.color}08 0%, transparent 65%)`,
          pointerEvents: "none",
        }} />
      )}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
          background: isConnected ? meta.color + "20" : "#1a1a2e",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: isConnected ? meta.color : "#555",
          transition: "all 0.3s",
        }}>
          {ICONS[platformId]}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: "#e8e8f0", letterSpacing: -0.3 }}>{meta.name}</span>
            {isConnected && (
              <span style={{
                fontSize: 10, fontWeight: 600, color: "#22c55e",
                background: "rgba(34,197,94,0.12)", padding: "2px 7px",
                borderRadius: 6, letterSpacing: 0.5, textTransform: "uppercase",
              }}>Connected</span>
            )}
          </div>
          <div style={{ fontSize: 12, color: "#555", marginTop: 2 }}>{meta.description}</div>
        </div>
      </div>

      {/* Connected account info */}
      {isConnected && (
        <div style={{
          background: "#12121f", borderRadius: 10, padding: "10px 12px",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: meta.color + "30",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 700, color: meta.color,
          }}>
            {(connectionInfo.username || "?")[0].toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#ccc" }}>
              {connectionInfo.username || "Connected account"}
            </div>
            <div style={{ fontSize: 11, color: "#444" }}>
              {connectionInfo.tokenExpires
                ? `Token expires ${new Date(connectionInfo.tokenExpires).toLocaleDateString()}`
                : "Token valid"}
            </div>
          </div>
          <div style={{ marginLeft: "auto", fontSize: 11, color: "#555" }}>
            {meta.clipLabel}
          </div>
        </div>
      )}

      {/* Permissions list (shown when not connected) */}
      {!isConnected && (
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {meta.permissions.map((perm) => (
            <div key={perm} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "#555" }}>
              <span style={{ color: "#333", fontSize: 10 }}>✓</span> {perm}
            </div>
          ))}
        </div>
      )}

      {/* Action buttons */}
      {!showConfirm ? (
        <div style={{ display: "flex", gap: 8 }}>
          {!isConnected ? (
            <button
              onClick={() => onConnect(platformId)}
              disabled={busy}
              style={{
                flex: 1, padding: "10px 16px", borderRadius: 10, border: "none",
                background: busy ? "#1a1a2e" : meta.color,
                color: busy ? "#444" : "#fff",
                fontSize: 13, fontWeight: 600, cursor: busy ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                transition: "all 0.2s",
              }}
            >
              {isConnecting ? (
                <>
                  <Spinner color="#fff" /> Connecting...
                </>
              ) : (
                <>Connect {meta.name}</>
              )}
            </button>
          ) : (
            <>
              <div style={{
                flex: 1, padding: "10px 16px", borderRadius: 10,
                background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: 6, fontSize: 13, color: "#22c55e", fontWeight: 500,
              }}>
                ✓ Active
              </div>
              <button
                onClick={() => setShowConfirm(true)}
                disabled={busy}
                style={{
                  padding: "10px 14px", borderRadius: 10,
                  background: "transparent", border: "1px solid #2a2a3a",
                  color: "#555", fontSize: 13, cursor: busy ? "not-allowed" : "pointer",
                  transition: "all 0.15s",
                }}
              >
                Disconnect
              </button>
            </>
          )}
        </div>
      ) : (
        /* Disconnect confirm */
        <div style={{
          background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
          borderRadius: 10, padding: "12px 14px",
        }}>
          <div style={{ fontSize: 13, color: "#f87171", marginBottom: 10, fontWeight: 500 }}>
            Disconnect {meta.name}?
          </div>
          <div style={{ fontSize: 12, color: "#555", marginBottom: 12 }}>
            You'll need to reconnect before publishing to {meta.name} again.
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => { setShowConfirm(false); onDisconnect(platformId); }}
              disabled={isDisconnecting}
              style={{
                flex: 1, padding: "8px", borderRadius: 8, border: "none",
                background: "#ef4444", color: "#fff", fontSize: 12, fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {isDisconnecting ? "Disconnecting..." : "Yes, disconnect"}
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              style={{
                flex: 1, padding: "8px", borderRadius: 8,
                border: "1px solid #2a2a3a", background: "transparent",
                color: "#aaa", fontSize: 12, cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Spinner({ color = "#fff", size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3"
      style={{ animation: "spin 0.7s linear infinite" }}>
      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </svg>
  );
}
