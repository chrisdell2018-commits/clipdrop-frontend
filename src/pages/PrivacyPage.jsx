export function PrivacyPage() {
  const s = {
    wrap: { maxWidth: 720, margin: "0 auto", padding: "60px 24px 80px", fontFamily: "'DM Sans', sans-serif", color: "#c8c8d8", lineHeight: 1.8 },
    h1: { fontFamily: "'Syne', sans-serif", fontSize: 36, fontWeight: 800, color: "#e8e8f0", marginBottom: 6, letterSpacing: -1 },
    date: { fontSize: 13, color: "#555", marginBottom: 48 },
    h2: { fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700, color: "#e8e8f0", margin: "36px 0 10px" },
    p: { fontSize: 15, marginBottom: 14, color: "#888" },
    ul: { paddingLeft: 20, marginBottom: 14 },
    li: { fontSize: 15, color: "#888", marginBottom: 6 },
    rule: { border: "none", borderTop: "1px solid #1a1a2e", margin: "40px 0" },
    a: { color: "#a78bfa" },
  };

  return (
    <div style={{ background: "#080810", minHeight: "100vh" }}>
      <div style={s.wrap}>
        <a href="/#/connections" style={{ ...s.a, fontSize: 13, textDecoration: "none", display: "inline-block", marginBottom: 32 }}>
          ← Back to ClipDrop
        </a>
        <h1 style={s.h1}>Privacy Policy</h1>
        <p style={s.date}>Effective date: 26 May 2026</p>
        <p style={s.p}>ClipDrop ("we", "us", or "our") operates clipdrop.org.uk and provides the ClipDrop video publishing service (the "Service"). This Privacy Policy explains what information we collect, how we use it, and what rights you have in relation to it.</p>
        <p style={s.p}>By using the Service, you agree to the collection and use of information as described in this policy.</p>
        <hr style={s.rule} />
        <h2 style={s.h2}>1. Information We Collect</h2>
        <p style={s.p}><strong style={{ color: "#ccc" }}>Information you provide:</strong></p>
        <ul style={s.ul}>
          <li style={s.li}>Name and email address when you create an account</li>
          <li style={s.li}>Password (stored as a one-way cryptographic hash — never stored as plain text)</li>
          <li style={s.li}>Video files you upload for processing</li>
          <li style={s.li}>Titles, descriptions, and tags you enter for your videos</li>
          <li style={s.li}>Platform account information when you connect third-party accounts</li>
        </ul>
        <p style={s.p}><strong style={{ color: "#ccc" }}>OAuth tokens from third-party platforms:</strong></p>
        <p style={s.p}>When you connect your YouTube, TikTok, Instagram, or Facebook account, we receive OAuth access tokens from those platforms. We use these tokens solely to upload your video content on your behalf. We do not receive your password for any third-party platform.</p>
        <p style={s.p}><strong style={{ color: "#ccc" }}>Information collected automatically:</strong></p>
        <ul style={s.ul}>
          <li style={s.li}>IP address and approximate location</li>
          <li style={s.li}>Browser type, operating system, and device type</li>
          <li style={s.li}>Pages visited and features used</li>
          <li style={s.li}>Error logs and performance data</li>
        </ul>
        <h2 style={s.h2}>2. How We Use Your Information</h2>
        <ul style={s.ul}>
          <li style={s.li}>Create and manage your account</li>
          <li style={s.li}>Process and split your uploaded videos into clips</li>
          <li style={s.li}>Publish your content to the platforms you have connected</li>
          <li style={s.li}>Send you transactional emails</li>
          <li style={s.li}>Improve and develop the Service</li>
          <li style={s.li}>Monitor for abuse and comply with legal obligations</li>
        </ul>
        <p style={s.p}>We do not sell your personal data to third parties. We do not use your data for advertising purposes.</p>
        <h2 style={s.h2}>3. Video Content and File Storage</h2>
        <p style={s.p}>Videos you upload are stored temporarily while being processed. Processed clips are deleted within 24 hours of publishing. Original files are retained for up to 7 days then permanently deleted. You retain full ownership of all content you upload.</p>
        <h2 style={s.h2}>4. Third-Party Platforms</h2>
        <ul style={s.ul}>
          <li style={s.li}>YouTube / Google — <a href="https://policies.google.com/privacy" style={s.a} target="_blank" rel="noreferrer">policies.google.com/privacy</a></li>
          <li style={s.li}>TikTok — <a href="https://www.tiktok.com/legal/privacy-policy" style={s.a} target="_blank" rel="noreferrer">tiktok.com/legal/privacy-policy</a></li>
          <li style={s.li}>Meta (Instagram + Facebook) — <a href="https://www.facebook.com/privacy/policy" style={s.a} target="_blank" rel="noreferrer">facebook.com/privacy/policy</a></li>
        </ul>
        <h2 style={s.h2}>5. Data Sharing</h2>
        <p style={s.p}>We do not sell, rent, or trade your personal information. We may share data with service providers who help us operate the Service, bound by confidentiality agreements.</p>
        <h2 style={s.h2}>6. Data Retention</h2>
        <p style={s.p}>We retain your account data while your account is active. If you delete your account, we delete your personal data within 30 days.</p>
        <h2 style={s.h2}>7. Security</h2>
        <ul style={s.ul}>
          <li style={s.li}>Encryption of data in transit (TLS 1.2+)</li>
          <li style={s.li}>Encrypted storage of sensitive credentials</li>
          <li style={s.li}>Access controls on production systems</li>
        </ul>
        <h2 style={s.h2}>8. Your Rights</h2>
        <ul style={s.ul}>
          <li style={s.li}>Access, correct, or delete your personal data</li>
          <li style={s.li}>Receive your data in a portable format</li>
          <li style={s.li}>Object to certain processing</li>
        </ul>
        <p style={s.p}>Email <a href="mailto:legal@clipdrop.org.uk" style={s.a}>legal@clipdrop.org.uk</a> to exercise any of these rights.</p>
        <h2 style={s.h2}>9. Cookies</h2>
        <p style={s.p}>We use essential local storage to keep you logged in. We do not use tracking or advertising cookies.</p>
        <h2 style={s.h2}>10. Children's Privacy</h2>
        <p style={s.p}>The Service is not directed at children under 13. Contact us if you believe a child has provided personal data.</p>
        <h2 style={s.h2}>11. Contact Us</h2>
        <ul style={s.ul}>
          <li style={s.li}>Email: <a href="mailto:legal@clipdrop.org.uk" style={s.a}>legal@clipdrop.org.uk</a></li>
          <li style={s.li}>Website: <a href="https://www.clipdrop.org.uk" style={s.a}>www.clipdrop.org.uk</a></li>
        </ul>
        <hr style={s.rule} />
        <p style={{ ...s.p, textAlign: "center", fontSize: 13 }}>© 2026 ClipDrop. All rights reserved.</p>
      </div>
    </div>
  );
}