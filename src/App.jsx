import { useState, useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import { LoginPage } from "./pages/LoginPage";
import { ConnectionsPage } from "./pages/ConnectionsPage";
import { OAuthCallback } from "./pages/OAuthCallback";
import { PrivacyPage } from "./pages/PrivacyPage";
import { TermsPage } from "./pages/TermsPage";
import { DataDeletionPage } from "./pages/DataDeletionPage";

function getRoute() {
  const hash = window.location.hash;
  const path = window.location.pathname;
  if (path.includes("/oauth/callback")) return "oauth";
  if (hash.startsWith("#/privacy") || path.includes("/privacy")) return "privacy";
  if (hash.startsWith("#/terms") || path.includes("/terms")) return "terms";
  return "connections";
  if (hash.startsWith("#/data-deletion") || path.includes("/data-deletion")) return "data-deletion";
}

export default function App() {
  const { user, loading, logout } = useAuth();
  const [route, setRoute] = useState(getRoute());

  useEffect(() => {
    const handler = () => setRoute(getRoute());
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#080810", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#444", fontSize: 13 }}>Loading...</div>
      </div>
    );
  }

  if (route === "oauth") return <OAuthCallback />;
  if (route === "privacy") return <PrivacyPage />;
  if (route === "terms") return <TermsPage />;
  if (route === "data-deletion") return <DataDeletionPage />;

  if (!user) {
    return <LoginPage onLogin={() => window.location.reload()} />;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#080810" }}>
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        borderBottom: "1px solid #141424",
        background: "rgba(8,8,16,0.95)",
        backdropFilter: "blur(12px)",
        height: 52,
        display: "flex", alignItems: "center",
        padding: "0 24px", gap: 12,
      }}>
        <div style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 17,
          background: "linear-gradient(135deg, #a78bfa, #f472b6)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          cursor: "pointer",
        }}
          onClick={() => { window.location.hash = "#/connections"; }}
        >
          ClipDrop
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 13, color: "#555" }}>{user.email}</div>
        <button
          onClick={() => { logout(); window.location.reload(); }}
          style={{
            background: "transparent", border: "1px solid #2a2a3a",
            borderRadius: 8, color: "#666", fontSize: 12,
            padding: "6px 14px", cursor: "pointer", fontFamily: "inherit",
          }}
          onMouseOver={e => { e.target.style.borderColor = "#f472b6"; e.target.style.color = "#f472b6"; }}
          onMouseOut={e => { e.target.style.borderColor = "#2a2a3a"; e.target.style.color = "#666"; }}
        >
          Sign out
        </button>
      </div>

      <div style={{ paddingTop: 52 }}>
        <ConnectionsPage />
      </div>

      <div style={{
        borderTop: "1px solid #0d0d18", padding: "20px 24px",
        display: "flex", justifyContent: "center", gap: 24,
      }}>
        <a href="/#/privacy" style={{ fontSize: 12, color: "#333", textDecoration: "none" }}
          onMouseOver={e => e.target.style.color = "#a78bfa"}
          onMouseOut={e => e.target.style.color = "#333"}
        >Privacy Policy</a>
        <a href="/#/terms" style={{ fontSize: 12, color: "#333", textDecoration: "none" }}
          onMouseOver={e => e.target.style.color = "#a78bfa"}
          onMouseOut={e => e.target.style.color = "#333"}
        >Terms of Service</a>
        <span style={{ fontSize: 12, color: "#222" }}>© 2026 ClipDrop</span>
      </div>
    </div>
  );
}