// ConnectPlatforms.jsx
// Full "Connect your accounts" page — drop this into your router.
//
// Usage in App.jsx:
//   import { ConnectPlatforms } from "./components/ConnectPlatforms";
//   <Route path="/connections" element={<ConnectPlatforms />} />

import { usePlatforms } from "../hooks/usePlatforms";
import { PlatformCard } from "./PlatformCard";

const PLATFORM_ORDER = ["youtube", "tiktok", "instagram", "facebook"];

// ─── Skeleton loader for initial fetch ───────────────────────────────────────
const SkeletonCard = () => (
  <div style={{
    background: "#0d0d18", border: "1px solid #1e1e30",
    borderRadius: 16, padding: 20, display: "flex", flexDirection: "column", gap: 14,
  }}>
    {[40, 28, 20, 36].map((h, i) => (
      <div key={i} style={{
        height: h, borderRadius: 8, background: "#1a1a28",
        animation: `pulse 1.5s ease-in-out ${i * 0.1}s infinite`,
      }} />
    ))}
  </div>
);

export const ConnectPlatforms = () => {
  const {
    platforms, loading, error, lastConnected,
    connect, disconnect,
    isConnected, isConnecting, isDisconnecting,
    getUsername, connectedCount,
  } = usePlatforms();

  const allConnected = connectedCount === PLATFORM_ORDER.length;

  return (
    <div style={{
      minHeight: "100vh", background: "#0a0a0f",
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", color: "#e8e8f0",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@600;700;800&display=swap');
        * { box-sizing: border-box; }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .platform-grid > * {
          animation: fadeUp 0.4s ease both;
        }
        .platform-grid > *:nth-child(1) { animation-delay: 0.05s; }
        .platform-grid > *:nth-child(2) { animation-delay: 0.10s; }
        .platform-grid > *:nth-child(3) { animation-delay: 0.15s; }
        .platform-grid > *:nth-child(4) { animation-delay: 0.20s; }
      `}</style>

      {/* Top navigation */}
      <div style={{
        borderBottom: "1px solid #1a1a2e", padding: "0 32px",
        display: "flex", alignItems: "center", height: 56, gap: 12,
      }}>
        <div style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18,
          background: "linear-gradient(135deg, #7c6ef5, #e96dbd)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          ClipDrop
        </div>
        <span style={{ color: "#2a2a3a" }}>·</span>
        <span style={{ fontSize: 14, color: "#555" }}>Platform Connections</span>
        <div style={{ flex: 1 }} />
        {/* Connection counter */}
        <div style={{
          fontSize: 13, color: connectedCount > 0 ? "#34d399" : "#555",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: connectedCount > 0 ? "#34d399" : "#333",
          }} />
          {connectedCount}/{PLATFORM_ORDER.length} connected
        </div>
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "48px 24px" }}>

        {/* Hero header */}
        <div style={{ marginBottom: 40, maxWidth: 520 }}>
          <h1 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: 36, letterSpacing: -1, lineHeight: 1.1,
            margin: "0 0 12px",
          }}>
            Connect your<br />
            <span style={{
              background: "linear-gradient(135deg, #7c6ef5 0%, #e96dbd 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              publishing accounts
            </span>
          </h1>
          <p style={{ color: "#555", fontSize: 16, lineHeight: 1.6, margin: 0 }}>
            Link your accounts once. ClipDrop handles every upload automatically —
            you just upload one video and we do the rest.
          </p>
        </div>

        {/* Error banner */}
        {error && (
          <div style={{
            background: "#ef444415", border: "1px solid #ef444430",
            borderRadius: 12, padding: "12px 16px", marginBottom: 24,
            display: "flex", alignItems: "center", gap: 10,
            animation: "slideDown 0.3s ease",
          }}>
            <span style={{ fontSize: 16 }}>⚠️</span>
            <span style={{ fontSize: 14, color: "#ef4444" }}>{error}</span>
          </div>
        )}

        {/* All connected banner */}
        {allConnected && !loading && (
          <div style={{
            background: "#34d39915", border: "1px solid #34d39930",
            borderRadius: 12, padding: "14px 18px", marginBottom: 28,
            display: "flex", alignItems: "center", gap: 12,
            animation: "slideDown 0.4s ease",
          }}>
            <span style={{ fontSize: 22 }}>🎉</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#34d399" }}>
                All platforms connected!
              </div>
              <div style={{ fontSize: 13, color: "#555", marginTop: 2 }}>
                You're ready to publish everywhere with one upload.
              </div>
            </div>
            <a href="/upload" style={{
              marginLeft: "auto", padding: "8px 18px",
              background: "#34d399", borderRadius: 10, color: "#0a0a0f",
              fontSize: 13, fontWeight: 600, textDecoration: "none",
              whiteSpace: "nowrap",
            }}>
              Upload video →
            </a>
          </div>
        )}

        {/* Platform cards grid */}
        <div className="platform-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: 16,
          marginBottom: 40,
        }}>
          {loading
            ? PLATFORM_ORDER.map((id) => <SkeletonCard key={id} />)
            : PLATFORM_ORDER.map((id) => (
              <PlatformCard
                key={id}
                platformId={id}
                isConnected={isConnected(id)}
                isConnecting={isConnecting(id)}
                isDisconnecting={isDisconnecting(id)}
                username={getUsername(id)}
                tokenExpires={platforms[id]?.tokenExpires}
                justConnected={lastConnected === id}
                onConnect={connect}
                onDisconnect={disconnect}
              />
            ))
          }
        </div>

        {/* How it works */}
        <div style={{
          background: "#0d0d18", border: "1px solid #1e1e30",
          borderRadius: 16, padding: "24px 28px",
        }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: "#aaa", margin: "0 0 16px", letterSpacing: "0.05em" }}>
            HOW CONNECTING WORKS
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              { icon: "🔑", title: "Secure OAuth", body: "You log in directly on each platform. ClipDrop never sees your password." },
              { icon: "🔒", title: "Limited scope", body: "We only request upload permissions — we can't read your DMs or followers." },
              { icon: "🗑️", title: "Revoke anytime", body: "Disconnect here, or revoke access directly from each platform's app settings." },
            ].map(({ icon, title, body }) => (
              <div key={title}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#e8e8f0", marginBottom: 4 }}>{title}</div>
                <div style={{ fontSize: 12, color: "#555", lineHeight: 1.6 }}>{body}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
