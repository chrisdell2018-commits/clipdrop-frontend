import { useState, useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import { LoginPage } from "./pages/LoginPage";
import { ConnectionsPage } from "./pages/ConnectionsPage";
import { OAuthCallback } from "./pages/OAuthCallback";

function useRoute() {
  const [route, setRoute] = useState(window.location.hash || "#/connections");
  useEffect(() => {
    const handler = () => setRoute(window.location.hash || "#/connections");
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  return route;
}

export default function App() {
  const { user, loading, logout } = useAuth();
  const route = useRoute();

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#080810", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#444", fontSize: 13, fontFamily: "monospace" }}>Loading...</div>
      </div>
    );
  }

  if (route.startsWith("#/oauth/callback") || window.location.pathname.includes("/oauth/callback")) {
    return <OAuthCallback />;
  }

  if (!user) {
    return <LoginPage onLogin={() => { window.location.hash = "#/connections"; }} />;
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
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800, fontSize: 17,
          background: "linear-gradient(135deg, #a78bfa, #f472b6)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          ClipDrop
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 13, color: "#555" }}>{user.email}</div>
        <button
          onClick={() => { logout(); window.location.hash = "#/"; }}
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
        {(route.startsWith("#/connections") || route === "#/") && <ConnectionsPage />}
      </div>
    </div>
  );
}
