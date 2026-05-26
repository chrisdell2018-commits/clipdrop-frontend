import { useEffect, useState } from "react";

// This page handles the redirect back from YouTube/TikTok/Meta after the user approves
// Route: /oauth/callback?platform=youtube&connected=true  OR  ?error=access_denied
//
// If opened in a popup: just close itself (the opener polls for closure)
// If opened as full redirect: redirect back to /connections

export function OAuthCallback() {
  const [status, setStatus] = useState("processing");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const platform = params.get("platform");
    const connected = params.get("connected");
    const error = params.get("error");

    if (error) {
      setStatus("error");
      // If in popup, close after a moment
      if (window.opener) {
        setTimeout(() => window.close(), 2000);
      } else {
        setTimeout(() => { window.location.hash = "/connections"; }, 2500);
      }
      return;
    }

    if (connected === "true") {
      setStatus("success");
      // If opened in a popup — just close, the parent is polling
      if (window.opener) {
        window.close();
      } else {
        // Full redirect mode — go back to connections page
        setTimeout(() => {
          window.location.href = `${window.location.origin}/#/connections?platform=${platform}&connected=true`;
        }, 1500);
      }
    }
  }, []);

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "#080810", fontFamily: "'DM Sans', sans-serif", color: "#e8e8f0",
    }}>
      <div style={{ textAlign: "center", padding: 32 }}>
        {status === "processing" && (
          <>
            <div style={{ fontSize: 40, marginBottom: 16 }}>⏳</div>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>Completing connection...</div>
            <div style={{ fontSize: 13, color: "#555" }}>This window will close automatically.</div>
          </>
        )}
        {status === "success" && (
          <>
            <div style={{ fontSize: 48, marginBottom: 16, animation: "pop 0.4s ease" }}>✅</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#22c55e", marginBottom: 6 }}>Connected!</div>
            <div style={{ fontSize: 13, color: "#555" }}>Closing this window...</div>
            <style>{`@keyframes pop { 0% { transform: scale(0.5); opacity:0; } 70% { transform: scale(1.15); } 100% { transform: scale(1); opacity:1; } }`}</style>
          </>
        )}
        {status === "error" && (
          <>
            <div style={{ fontSize: 40, marginBottom: 16 }}>❌</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#f87171", marginBottom: 6 }}>Connection cancelled</div>
            <div style={{ fontSize: 13, color: "#555" }}>You can close this window and try again.</div>
          </>
        )}
      </div>
    </div>
  );
}
