# ClipDrop — OAuth Frontend Setup

## Files in this package

```
api/
  platforms.js          All API calls (getOAuthUrl, disconnect, pollJob, etc.)

hooks/
  usePlatforms.js       React hook — manages connection state for all platforms

components/
  ConnectPlatforms.jsx  Full "Connect your accounts" page
  PlatformCard.jsx      Individual platform card (connect / disconnect / status)
  ConnectButton.jsx     Compact inline button for use in upload flow
  OAuthCallback.jsx     Page shown after OAuth redirect returns
```

---

## Quick integration (React Router v6)

### 1. Add routes in App.jsx

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConnectPlatforms } from "./components/ConnectPlatforms";
import { OAuthCallback }    from "./components/OAuthCallback";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/connections"    element={<ConnectPlatforms />} />
        <Route path="/auth/callback"  element={<OAuthCallback />} />
        {/* your other routes */}
      </Routes>
    </BrowserRouter>
  );
}
```

### 2. Set your API URL in .env

```
REACT_APP_API_URL=http://localhost:3001
```

### 3. Store the JWT after login

```js
// After calling POST /api/auth/login:
localStorage.setItem("clipdrop_token", data.token);
```

The hook reads this token automatically.

---

## How the OAuth popup flow works

```
User clicks "Connect YouTube"
        │
        ▼
Frontend calls GET /api/platforms/youtube/connect
        │
        ▼
Backend returns { redirectUrl: "https://accounts.google.com/o/oauth2/..." }
        │
        ▼
Frontend opens redirectUrl in a popup window
        │
        ▼
User approves access on Google / TikTok / Meta
        │
        ▼
Platform redirects to your backend callback URL:
  GET /api/platforms/youtube/callback?code=XXX
        │
        ▼
Backend exchanges code for access token, saves to DB,
redirects to: FRONTEND_URL?platform=youtube&connected=true
        │
        ▼
OAuthCallback page detects it's in a popup → closes window
        │
        ▼
usePlatforms hook sees popup closed → calls refresh()
→ UI updates to show "CONNECTED" ✓
```

---

## Backend callback URLs to configure in each developer portal

| Platform | Callback URL |
|---|---|
| YouTube (Google) | `http://localhost:3001/api/platforms/youtube/callback` |
| TikTok | `http://localhost:3001/api/platforms/tiktok/callback` |
| Instagram + Facebook | `http://localhost:3001/api/platforms/meta/callback` |

In production, replace `localhost:3001` with your live backend domain.

---

## Using ConnectButton inline (in upload flow)

```jsx
import { ConnectButton } from "./components/ConnectButton";

// Full row style:
<ConnectButton platformId="youtube" />
<ConnectButton platformId="tiktok" />

// Compact badge style (for tight spaces):
<ConnectButton platformId="instagram" compact />

// With callback when connection succeeds:
<ConnectButton platformId="facebook" onConnected={(id) => console.log(`${id} connected!`)} />
```

---

## Developer portals — where to get API keys

| Platform | Portal | What to create |
|---|---|---|
| YouTube | console.cloud.google.com | OAuth 2.0 credentials, enable YouTube Data API v3 |
| TikTok | developers.tiktok.com | App with "Video Upload" product |
| Instagram | developers.facebook.com | App with Instagram Graph API + Content Publishing |
| Facebook | developers.facebook.com | Same Meta app as Instagram |
