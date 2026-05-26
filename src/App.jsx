import { useState, useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import { LoginPage } from "./pages/LoginPage";
import { ConnectionsPage } from "./pages/ConnectionsPage";
import { OAuthCallback } from "./pages/OAuthCallback";

// Simple hash-based router (no react-router needed for MVP)
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
        <div style={{ color: "#333", fontSize: 13 }}>Loading...</div>
      </div>
    );
  }

  // OAuth callback page — works whether logged in or not
  if (route.startsWith("#/oauth/callback") || window.location.pathname.includes("/oauth/callback")) {
    return <OAuthCallback />;
  }

  // Auth wall
  if (!user) {
    return <LoginPage onLogin={() => { window.location.hash = "#/connections"; }} />;
  }

  // Main app routes
  return (
    <div>
      {/* Minimal top-level nav would go here for multi-page app */}
      {route.startsWith("#/connections") && <ConnectionsPage />}
      {route === "#/" && <ConnectionsPage />}
    </div>
  );
}
