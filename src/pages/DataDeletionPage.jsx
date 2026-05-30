export function DataDeletionPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#080810", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 600, padding: "40px 24px", textAlign: "center" }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 24, background: "linear-gradient(135deg, #a78bfa, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 24 }}>
          ClipDrop
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#e8e8f0", marginBottom: 16 }}>Data Deletion Request</h1>
        <p style={{ fontSize: 15, color: "#888", lineHeight: 1.7, marginBottom: 16 }}>
          To request deletion of your data from ClipDrop, please email us at:
        </p>
        <a href="mailto:legal@clipdrop.org.uk" style={{ fontSize: 16, color: "#a78bfa", fontWeight: 600 }}>
          legal@clipdrop.org.uk
        </a>
        <p style={{ fontSize: 14, color: "#555", marginTop: 16, lineHeight: 1.7 }}>
          We will delete all your personal data including your account, connected platform tokens, upload history, and any stored video files within 30 days of your request.
        </p>
        <div style={{ marginTop: 32 }}>
          <a href="/#/privacy" style={{ fontSize: 13, color: "#555", textDecoration: "none" }}>Privacy Policy</a>
          <span style={{ color: "#333", margin: "0 12px" }}>·</span>
          <a href="/#/terms" style={{ fontSize: 13, color: "#555", textDecoration: "none" }}>Terms of Service</a>
        </div>
      </div>
    </div>
  );
}