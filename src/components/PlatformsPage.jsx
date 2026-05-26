import { usePlatforms, PLATFORM_META } from "../hooks/usePlatforms";
import { PlatformCard } from "./PlatformCard";

/**
 * PlatformsPage
 * The /connections route. Shows all 4 platforms with connect/disconnect.
 * Drop this into your React Router as:
 *   <Route path="/connections" element={<PlatformsPage />} />
 */
export function PlatformsPage() {
  const {
    platforms, loading, error, connecting,
    connect, disconnect, connectedCount, clearError,
  } = usePlatforms();

  const allPlatforms = Object.keys(PLATFORM_META);
  const totalPlatforms = allPlatforms.length;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      color: "#e8e8f0",
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
        .platform-grid > * {
          animation: fadeUp 0.4s ease both;
        }
        .platform-grid > *:nth-child(1) { animation-delay: 0.05s; }
        .platform-grid > *:nth-child(2) { animation-delay: 0.1s; }
        .platform-grid > *:nth-child(3) { animation-delay: 0.15s; }
        .platform-grid > *:nth-child(4) { animation-delay: 0.2s; }
      `}</style>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: 40, animation: "fadeUp 0.35s ease" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <a href="/" style={{ fontSize: 13, color: "#444", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
              ← Back
            </a>
          </div>

          <h1 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 34, fontWeight: 800, letterSpacing: -1,
            lineHeight: 1.1, marginBottom: 10,
          }}>
            Connected Accounts
          </h1>
          <p style={{ color: "#555", fontSize: 15, maxWidth: 480 }}>
            Connect your accounts once. ClipDrop posts on your behalf every time you publish — no copy-pasting, no manual uploads.
          </p>
        </div>

        {/* Progress bar */}
        <div style={{
          background: "#0d0d18", border: "1px solid #1e1e2e",
          borderRadius: 14, padding: "16px 20px", marginBottom: 32,
          display: "flex", alignItems: "center", gap: 16,
          animation: "fadeUp 0.4s ease",
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#ccc" }}>
                {connectedCount} of {totalPlatforms} platforms connected
              </span>
              {connectedCount === totalPlatforms && (
                <span style={{ fontSize: 12, color: "#34d399", fontWeight: 500 }}>🎉 All set!</span>
              )}
            </div>
            <div style={{ height: 6, background: "#1a1a2e", borderRadius: 3, overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: `${(connectedCount / totalPlatforms) * 100}%`,
                background: connectedCount === totalPlatforms
                  ? "linear-gradient(90deg, #34d399, #059669)"
                  : "linear-gradient(90deg, #7c6ef5, #e96dbd)",
                borderRadius: 3,
                transition: "width 0.5s ease",
              }} />
            </div>
          </div>
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            background: connectedCount === totalPlatforms ? "#34d39920" : "#7c6ef520",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, flexShrink: 0,
          }}>
            {connectedCount === totalPlatforms ? "✓" : `${connectedCount}/${totalPlatforms}`}
          </div>
        </div>

        {/* Error banner */}
        {error && (
          <div style={{
            background: "#1a0808", border: "1px solid #ff444440",
            borderRadius: 12, padding: "12px 16px", marginBottom: 24,
            display: "flex", alignItems: "center", gap: 12,
            animation: "fadeUp 0.2s ease",
          }}>
            <span style={{ fontSize: 16 }}>⚠</span>
            <span style={{ fontSize: 13, color: "#ff8888", flex: 1 }}>{error}</span>
            <button onClick={clearError} style={{ background: "none", border: "none", color: "#ff4444", cursor: "pointer", fontSize: 16 }}>✕</button>
          </div>
        )}

        {/* Loading skeleton */}
        {loading ? (
          <div className="platform-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{
                height: 200, borderRadius: 18,
                background: "linear-gradient(90deg, #0d0d18 25%, #13131f 50%, #0d0d18 75%)",
                backgroundSize: "200% 100%",
                animation: "pulse 1.5s ease infinite",
                border: "1px solid #1e1e2e",
              }} />
            ))}
          </div>
        ) : (
          /* Platform cards grid */
          <div className="platform-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {allPlatforms.map((platformId) => (
              <PlatformCard
                key={platformId}
                platformId={platformId}
                connectionData={platforms[platformId]}
                onConnect={connect}
                onDisconnect={disconnect}
                isConnecting={connecting}
              />
            ))}
          </div>
        )}

        {/* Info section */}
        <div style={{
          marginTop: 40, padding: "24px", background: "#0d0d18",
          border: "1px solid #1e1e2e", borderRadius: 16,
          animation: "fadeUp 0.5s ease 0.3s both",
        }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: "#888", marginBottom: 16, letterSpacing: "0.05em", textTransform: "uppercase" }}>
            How it works
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              { icon: "🔐", title: "OAuth only", body: "We use each platform's official OAuth — your password never touches ClipDrop servers." },
              { icon: "🔄", title: "Auto-refresh", body: "Tokens are refreshed automatically. You only need to connect once." },
              { icon: "🗑", title: "Revoke anytime", body: "Disconnect here, or revoke directly in YouTube / TikTok / Meta settings." },
            ].map(({ icon, title, body }) => (
              <div key={title}>
                <div style={{ fontSize: 20, marginBottom: 8 }}>{icon}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#ccc", marginBottom: 4 }}>{title}</div>
                <div style={{ fontSize: 12, color: "#444", lineHeight: 1.6 }}>{body}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA when all connected */}
        {!loading && connectedCount === totalPlatforms && (
          <div style={{
            marginTop: 24, textAlign: "center",
            animation: "fadeUp 0.4s ease",
          }}>
            <a href="/" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "14px 32px",
              background: "linear-gradient(135deg, #7c6ef5, #e96dbd)",
              borderRadius: 14, border: "none",
              color: "#fff", fontSize: 15, fontWeight: 600,
              textDecoration: "none",
            }}>
              🚀 Upload and publish your first video →
            </a>
          </div>
        )}

      </div>
    </div>
  );
}
