import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export function LoginPage({ onLogin }) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
  if (!email || !password) return;
  setLoading(true);
  setError(null);
  try {
    const user = mode === "login"
      ? await login(email, password)
      : await register(email, password, name);
    onLogin(user);
    // Force a full page reload to trigger the redirect
    window.location.href = "/#/connections";
    window.location.reload();
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%", background: "#0d0d18", border: "1.5px solid #1e1e30",
    borderRadius: 10, padding: "11px 14px", fontSize: 14, color: "#e8e8f0",
    outline: "none", transition: "border-color 0.2s",
    fontFamily: "inherit",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080810", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Syne:wght@700;800&display=swap');`}</style>
      <div style={{ width: "100%", maxWidth: 380, padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 26, background: "linear-gradient(135deg, #a78bfa, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 6 }}>
            ClipDrop
          </div>
          <div style={{ fontSize: 13, color: "#444" }}>
            {mode === "login" ? "Sign in to your account" : "Create your account"}
          </div>
        </div>

        <div style={{ background: "#0d0d18", border: "1.5px solid #1e1e30", borderRadius: 20, padding: 28, display: "flex", flexDirection: "column", gap: 14 }}>
          {mode === "register" && (
            <div>
              <label style={{ fontSize: 12, color: "#555", fontWeight: 500, display: "block", marginBottom: 6 }}>NAME</label>
              <input style={inputStyle} value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
            </div>
          )}
          <div>
            <label style={{ fontSize: 12, color: "#555", fontWeight: 500, display: "block", marginBottom: 6 }}>EMAIL</label>
            <input style={inputStyle} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" onKeyDown={e => e.key === "Enter" && handleSubmit()} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: "#555", fontWeight: 500, display: "block", marginBottom: 6 }}>PASSWORD</label>
            <input style={inputStyle} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" onKeyDown={e => e.key === "Enter" && handleSubmit()} />
          </div>

          {error && <div style={{ fontSize: 12, color: "#f87171", background: "rgba(239,68,68,0.08)", borderRadius: 8, padding: "8px 12px" }}>{error}</div>}

          <button
            onClick={handleSubmit}
            disabled={loading || !email || !password}
            style={{
              width: "100%", padding: "12px", borderRadius: 10, border: "none",
              background: loading ? "#1a1a2e" : "linear-gradient(135deg, #a78bfa, #f472b6)",
              color: loading ? "#444" : "#fff", fontSize: 14, fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer", marginTop: 4,
            }}
          >
            {loading ? "..." : mode === "login" ? "Sign in" : "Create account"}
          </button>

          <div style={{ textAlign: "center", fontSize: 13, color: "#444" }}>
            {mode === "login" ? "Don't have an account? " : "Already have one? "}
            <button onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(null); }}
              style={{ background: "none", border: "none", color: "#a78bfa", cursor: "pointer", fontSize: 13, fontWeight: 500, padding: 0 }}>
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
