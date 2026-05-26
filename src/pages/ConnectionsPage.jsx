import { useState } from "react";
import { usePlatforms } from "../hooks/usePlatforms";
import { useOAuth } from "../hooks/useOAuth";
import { PlatformCard } from "../components/PlatformCard";

const PLATFORM_ORDER = ["youtube", "tiktok", "instagram", "facebook"];

export function ConnectionsPage() {
  const { platforms, loading, error, disconnecting, refetch, disconnect } = usePlatforms();
  const [successMsg, setSuccessMsg] = useState(null);

  const { connecting, error: oauthError, openOAuth } = useOAuth((platform, info) => {
    refetch();
    setSuccessMsg(`${platform.charAt(0).toUpperCase() + platform.slice(1)} connected successfully!`);
    setTimeout(() => setSuccessMsg(null), 4000);
  });

  const connectedCount = Object.keys(platforms).length;

  return (
    <div style={{ minHeight: "100vh", background: "#080810", color: "#e8e8f0", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Syne:wght@600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .card-hover { transition: transform 0.2s, box-shadow 0.2s; }
        .card-hover:hover { transform: translateY(-2px); }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes shimmer { 0%,100% { opacity:0.4; } 50% { opacity:1; } }
        @keyframes slideIn { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:translateX(0); } }
      `}</style>

      {/* Top nav */}
      <div style={{ borderBottom: "1px solid #141424", padding: "0 32px", height: 56, display: "flex", alignItems: "center", gap: 16, background: "#080810" }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, background: "linear-gradient(135deg, #a78bfa, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          ClipDrop
        </div>
        <div style={{ width: 1, height: 20, background: "#1e1e30" }} />
        <div style={{ fontSize: 14, color: "#555" }}>Connected Accounts</div>
        <div style={{ flex: 1 }} />
        <div style={{
          fontSize: 12, fontWeight: 600,
          color: connectedCount === 4 ? "#22c55e" : "#a78bfa",
          background: connectedCount === 4 ? "rgba(34,197,94,0.1)" : "rgba(167,139,250,0.1)",
          padding: "4px 12px", borderRadius: 20,
        }}>
          {connectedCount}/4 connected
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: 40, animation: "fadeInUp 0.4s ease both" }}>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, marginBottom: 10 }}>
            Connect your<br />
            <span style={{ background: "linear-gradient(135deg, #a78bfa, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              publishing channels
            </span>
          </h1>
          <p style={{ fontSize: 15, color: "#555", maxWidth: 440, lineHeight: 1.6 }}>
            Connect once. Every time you upload a video, ClipDrop posts it everywhere automatically.
          </p>
        </div>

        {/* Status banner */}
        {(error || oauthError || successMsg) && (
          <div style={{
            marginBottom: 24,
            padding: "12px 16px", borderRadius: 12,
            background: successMsg ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
            border: `1px solid ${successMsg ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"}`,
            color: successMsg ? "#22c55e" : "#f87171",
            fontSize: 13, display: "flex", alignItems: "center", gap: 10,
            animation: "slideIn 0.3s ease",
          }}>
            <span>{successMsg ? "✓" : "!"}</span>
            {successMsg || error || oauthError}
          </div>
        )}

        {/* Loading skeleton */}
        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{
                height: 200, borderRadius: 18, background: "#0d0d18",
                border: "1.5px solid #1e1e30", animation: "shimmer 1.4s ease infinite",
                animationDelay: `${i * 0.1}s`,
              }} />
            ))}
          </div>
        ) : (
          <>
            {/* Platform grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 32 }}>
              {PLATFORM_ORDER.map((platformId, i) => (
                <div key={platformId} className="card-hover" style={{ animation: `fadeInUp 0.4s ease ${i * 0.07}s both` }}>
                  <PlatformCard
                    platformId={platformId}
                    connectionInfo={platforms[platformId]}
                    connecting={connecting}
                    disconnecting={disconnecting}
                    onConnect={openOAuth}
                    onDisconnect={disconnect}
                  />
                </div>
              ))}
            </div>

            {/* Connect all button */}
            {connectedCount < 4 && (
              <div style={{
                background: "#0d0d18", border: "1.5px dashed #1e1e30", borderRadius: 18,
                padding: "20px 24px", display: "flex", alignItems: "center", gap: 16,
                animation: "fadeInUp 0.4s ease 0.3s both",
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#e8e8f0", marginBottom: 3 }}>
                    Connect all platforms at once
                  </div>
                  <div style={{ fontSize: 12, color: "#444" }}>
                    {4 - connectedCount} platform{4 - connectedCount !== 1 ? "s" : ""} remaining · each opens a quick auth window
                  </div>
                </div>
                <button
                  onClick={async () => {
                    for (const p of PLATFORM_ORDER) {
                      if (!platforms[p] && connecting !== p) {
                        await openOAuth(p);
                        await new Promise(r => setTimeout(r, 800));
                      }
                    }
                  }}
                  style={{
                    padding: "10px 20px", borderRadius: 10,
                    background: "linear-gradient(135deg, #a78bfa, #f472b6)",
                    border: "none", color: "#fff", fontSize: 13, fontWeight: 600,
                    cursor: "pointer", whiteSpace: "nowrap",
                  }}
                >
                  Connect all →
                </button>
              </div>
            )}

            {/* All connected state */}
            {connectedCount === 4 && (
              <div style={{
                background: "rgba(34,197,94,0.06)", border: "1.5px solid rgba(34,197,94,0.2)",
                borderRadius: 18, padding: "20px 24px", display: "flex", alignItems: "center", gap: 16,
                animation: "fadeInUp 0.5s ease both",
              }}>
                <div style={{ fontSize: 28 }}>🎉</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#22c55e", marginBottom: 2 }}>All platforms connected!</div>
                  <div style={{ fontSize: 12, color: "#555" }}>Upload one video and it'll publish everywhere automatically.</div>
                </div>
                <button
                  onClick={() => window.location.hash = "/upload"}
                  style={{
                    marginLeft: "auto", padding: "10px 20px", borderRadius: 10,
                    background: "linear-gradient(135deg, #22c55e, #16a34a)",
                    border: "none", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer",
                  }}
                >
                  Upload a video →
                </button>
              </div>
            )}

            {/* How it works */}
            <div style={{ marginTop: 40, paddingTop: 32, borderTop: "1px solid #111120" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#333", textTransform: "uppercase", letterSpacing: 1, marginBottom: 20 }}>
                How it works
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                {[
                  { step: "01", title: "Connect", desc: "Authorize ClipDrop to post on your behalf. We only request publish permissions." },
                  { step: "02", title: "Upload once", desc: "Drop your 30-min video. ClipDrop splits and reformats it for each platform." },
                  { step: "03", title: "Auto-publish", desc: "Clips upload simultaneously to every connected platform. Done." },
                ].map(({ step, title, desc }) => (
                  <div key={step} style={{ padding: "16px 0" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#a78bfa", letterSpacing: 1, marginBottom: 6 }}>{step}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#ccc", marginBottom: 6 }}>{title}</div>
                    <div style={{ fontSize: 12, color: "#444", lineHeight: 1.6 }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security note */}
            <div style={{ marginTop: 24, padding: "14px 16px", background: "#0a0a14", borderRadius: 12, border: "1px solid #111120", display: "flex", gap: 10 }}>
              <span style={{ fontSize: 14, flexShrink: 0 }}>🔒</span>
              <div style={{ fontSize: 12, color: "#444", lineHeight: 1.6 }}>
                <strong style={{ color: "#555" }}>Your credentials are never stored.</strong>{" "}
                ClipDrop uses OAuth — you authenticate directly with each platform, and we only receive a limited-scope access token. You can revoke access at any time from your platform settings.
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
