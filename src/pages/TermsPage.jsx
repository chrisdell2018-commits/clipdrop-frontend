export function TermsPage() {
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
    caps: { fontSize: 13, color: "#666", lineHeight: 1.7, marginBottom: 14 },
  };

  return (
    <div style={{ background: "#080810", minHeight: "100vh" }}>
      <div style={s.wrap}>
        <a href="/#/connections" style={{ ...s.a, fontSize: 13, textDecoration: "none", display: "inline-block", marginBottom: 32 }}>
          ← Back to ClipDrop
        </a>
        <h1 style={s.h1}>Terms of Service</h1>
        <p style={s.date}>Effective date: 26 May 2026</p>
        <p style={s.p}>Please read these Terms carefully before using ClipDrop. By creating an account or using the Service, you agree to be bound by these Terms.</p>
        <hr style={s.rule} />
        <h2 style={s.h2}>1. The Service</h2>
        <p style={s.p}>ClipDrop provides a platform to upload video content and automatically publish it across YouTube, TikTok, Instagram, and Facebook. Available at clipdrop.org.uk.</p>
        <h2 style={s.h2}>2. Eligibility</h2>
        <p style={s.p}>You must be at least 18 years of age to use the Service.</p>
        <h2 style={s.h2}>3. Accounts</h2>
        <p style={s.p}>You are responsible for maintaining the confidentiality of your account credentials and all activity under your account. Notify us immediately at <a href="mailto:legal@clipdrop.org.uk" style={s.a}>legal@clipdrop.org.uk</a> if you suspect unauthorised access.</p>
        <h2 style={s.h2}>4. Connected Platform Accounts</h2>
        <p style={s.p}>By connecting a platform account you:</p>
        <ul style={s.ul}>
          <li style={s.li}>Authorise us to upload content to that platform on your behalf</li>
          <li style={s.li}>Confirm you own or have rights to publish the content</li>
          <li style={s.li}>Agree to comply with that platform's own terms of service</li>
        </ul>
        <h2 style={s.h2}>5. Your Content</h2>
        <p style={s.p}>You retain full ownership of all video content you upload. You must not upload content that infringes intellectual property rights, contains hate speech or violence, sexualises minors, or violates any law or platform policy.</p>
        <h2 style={s.h2}>6. Acceptable Use</h2>
        <ul style={s.ul}>
          <li style={s.li}>Do not use the Service for any unlawful purpose</li>
          <li style={s.li}>Do not attempt to gain unauthorised access to any part of the Service</li>
          <li style={s.li}>Do not reverse-engineer the Service</li>
          <li style={s.li}>Do not resell or sublicence the Service without written permission</li>
        </ul>
        <h2 style={s.h2}>7. Intellectual Property</h2>
        <p style={s.p}>The Service, including its software, design, and trademarks, is owned by ClipDrop and protected by intellectual property law.</p>
        <h2 style={s.h2}>8. Third-Party Services</h2>
        <p style={s.p}>We are not responsible for failures of third-party platform APIs (YouTube, TikTok, Meta) to accept or publish your content. Platform changes and rate limits are outside our control.</p>
        <h2 style={s.h2}>9. Termination</h2>
        <p style={s.p}>You may delete your account at any time. We may suspend or terminate your account if you violate these Terms. Upon termination your right to use the Service ceases immediately.</p>
        <h2 style={s.h2}>10. Disclaimer of Warranties</h2>
        <p style={s.caps}>THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE.</p>
        <h2 style={s.h2}>11. Limitation of Liability</h2>
        <p style={s.caps}>OUR TOTAL LIABILITY SHALL NOT EXCEED THE GREATER OF THE AMOUNT YOU PAID US IN THE 12 MONTHS BEFORE THE CLAIM OR £100.</p>
        <h2 style={s.h2}>12. Governing Law</h2>
        <p style={s.p}>These Terms are governed by the laws of England and Wales.</p>
        <h2 style={s.h2}>13. Contact</h2>
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