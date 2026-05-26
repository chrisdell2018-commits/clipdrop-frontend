import { useEffect, useState } from "react";

/**
 * OAuthCallback
 *
 * Mount this component at the route your OAuth redirect URIs point to.
 * e.g. /oauth/callback  (set this in your .env as VITE_OAUTH_CALLBACK_PATH)
 *
 * This page:
 * 1. Reads ?platform=youtube&connected=true (or ?error=...) from the URL
 * 2. If in a popup — sends a postMessage to the opener and closes itself
 * 3. If in the main window (redirect flow) — shows success/error and redirects
 *
 * The backend redirects here after saving the token:
 *   http://localhost:3000/oauth/callback?platform=youtube&connected=true
 */
export function OAuthCallback() {
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [platform, setPlatform] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get("platform") || "unknown";
    const connected = params.get("connected");
    const error = params.get("error");

    setPlatform(p);

    if (connected === "true") {
      setStatus("success");

      // If we're in a popup, message the parent and close
      if (window.opener && !window.opener.closed) {
        window.opener.postMessage({ type: "OAUTH_SUCCESS", platform: p }, window.location.origin);
        setTimeout(() => window.close(), 800);
      } else {
        // Redirect flow — go back to the connections page
        setTimeout(() => {
          window.location.href = "/connections?platform=" + p + "&connected=true";
        }, 1500);
      }
    } else {
      setStatus("error");
      setErrorMsg(error || "Connection was cancelled or failed.");

      if (window.opener && !window.opener.closed) {
        window.opener.postMessage({ type: "OAUTH_ERROR", platform: p, error: errorMsg }, window.location.origin);
        setTimeout(() => window.close(), 1500);
      } else {
        setTimeout(() => {
          window.location.href = "/connections?error=" + encodeURIComponent(errorMsg);
        }, 2000);
      }
    }
  }, []);

  const PLATFORM_COLORS = {
    youtube: "#FF0000", tiktok: "#010101", instagram: "#E1306C", facebook: "#1877F2", meta: "#1877F2",
  };
  const color = PLATFORM_COLORS[platform] || "#7c6ef5";
  const name = platform.charAt(0).toUpperCase() + platform.slice(1);

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "#0a0a0f", fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');`}</style>

      <div style={{ textAlign: "center", padding: 40 }}>
        {status === "loading" && (
          <>
            <div style={{ width: 48, height: 48, border: `3px solid ${color}40`, borderTopColor: color, borderRadius: "50%", margin: "0 auto 20px", animation: "spin 0.8s linear infinite" }} />
            <p style={{ color: "#888", fontSize: 15 }}>Completing connection...</p>
          </>
        )}

        {status === "success" && (
          <>
            <div style={{ width: 64, height: 64, background: color + "20", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 28 }}>✓</div>
            <h2 style={{ color: "#e8e8f0", fontSize: 20, fontWeight: 600, marginBottom: 8 }}>{name} connected!</h2>
            <p style={{ color: "#555", fontSize: 14 }}>Returning to ClipDrop...</p>
          </>
        )}

        {status === "error" && (
          <>
            <div style={{ width: 64, height: 64, background: "#ff444420", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 28 }}>✕</div>
            <h2 style={{ color: "#e8e8f0", fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Connection failed</h2>
            <p style={{ color: "#555", fontSize: 14 }}>{errorMsg}</p>
          </>
        )}

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}
