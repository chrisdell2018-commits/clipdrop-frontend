// OAuthCallback.jsx
// Mount this at whatever route your backend redirects to after OAuth.
// e.g. /auth/callback or /platforms/callback
//
// If OAuth happened in a popup window, this page just closes itself.
// If it happened in the same tab (popup blocked), it redirects back to /connections.
//
// Router example (React Router v6):
//   <Route path="/auth/callback" element={<OAuthCallback />} />

import { useEffect, useState } from "react";

export const OAuthCallback = () => {
  const [status, setStatus] = useState("processing"); // processing | success | error
  const [platform, setPlatform] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const platformParam = params.get("platform");
    const connected = params.get("connected") === "true";
    const error = params.get("error");

    setPlatform(platformParam || "");

    if (error) {
      setStatus("error");
      setErrorMsg(decodeURIComponent(error));
      return;
    }

    if (connected || platformParam) {
      setStatus("success");
    }

    // If we're in a popup, close it — the opener will refresh its state
    if (window.opener && !window.opener.closed) {
      // Give the opener a moment to see what happened, then close
      setTimeout(() => window.close(), 1200);
      return;
    }

    // If we're in the same tab, redirect back to the connections page
    setTimeout(() => {
      window.location.href = `/connections?platform=${platformParam}&connected=${connected}`;
    }, 2000);
  }, []);

  const platformColors = {
    youtube: "#FF0000", tiktok: "#00f2ea",
    instagram: "#E1306C", facebook: "#1877F2", meta: "#1877F2",
  };
  const color = platformColors[platform] || "#7c6ef5";

  return (
    <div style={{
      minHeight: "100vh", background: "#0a0a0f",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'DM Sans', sans-serif", flexDirection: "column", gap: 20,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div style={{
        background: "#0d0d18", border: "1px solid #1e1e30",
        borderRadius: 20, padding: "40px 48px", textAlign: "center",
        animation: "fadeIn 0.3s ease", maxWidth: 380,
      }}>
        {status === "processing" && (
          <>
            <div style={{ fontSize: 40, marginBottom: 16, display: "inline-block", animation: "spin 1.2s linear infinite" }}>⟳</div>
            <p style={{ color: "#aaa", fontSize: 16 }}>Finishing connection...</p>
          </>
        )}

        {status === "success" && (
          <>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: color + "20", display: "flex",
              alignItems: "center", justifyContent: "center",
              fontSize: 28, margin: "0 auto 16px",
            }}>✓</div>
            <h2 style={{ color: "#e8e8f0", fontSize: 20, fontWeight: 600, marginBottom: 8 }}>
              {platform ? `${platform.charAt(0).toUpperCase() + platform.slice(1)} connected!` : "Connected!"}
            </h2>
            <p style={{ color: "#555", fontSize: 14 }}>
              {window.opener ? "Closing this window..." : "Redirecting you back..."}
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>
            <h2 style={{ color: "#e8e8f0", fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Connection failed</h2>
            <p style={{ color: "#ef4444", fontSize: 13, marginBottom: 16 }}>{errorMsg || "Something went wrong. Please try again."}</p>
            <button
              onClick={() => window.opener ? window.close() : window.history.back()}
              style={{
                padding: "10px 24px", background: "#1e1e30",
                border: "1px solid #2a2a3a", borderRadius: 10,
                color: "#aaa", fontSize: 13, cursor: "pointer",
              }}
            >
              {window.opener ? "Close window" : "Go back"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};
