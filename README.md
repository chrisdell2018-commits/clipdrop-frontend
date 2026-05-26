# ClipDrop — OAuth Frontend

React app for connecting YouTube, TikTok, Instagram, and Facebook accounts.

## What's in here

```
src/
├── api.js                    ← All API calls (auth, platforms, uploads, jobs)
├── App.jsx                   ← Router + auth wall
├── main.jsx                  ← Entry point
├── hooks/
│   ├── useAuth.js            ← Login, register, logout, JWT storage
│   ├── usePlatforms.js       ← Fetch/disconnect connected platforms
│   └── useOAuth.js           ← Opens OAuth popup, polls for close, verifies success
├── components/
│   └── PlatformCard.jsx      ← Connect/disconnect card for each platform
└── pages/
    ├── LoginPage.jsx         ← Sign in / create account
    ├── ConnectionsPage.jsx   ← Main connections dashboard
    └── OAuthCallback.jsx     ← Handles redirect back from platforms
```

## Quick start

```bash
npm install
cp .env.example .env        # Set VITE_API_URL=http://localhost:3001
npm run dev                 # Runs on http://localhost:3000
```

Your backend server must be running at the same time (`npm run dev` in clipdrop-backend/).

## OAuth flow step by step

1. User clicks "Connect YouTube" on `ConnectionsPage`
2. `useOAuth.openOAuth("youtube")` calls `GET /api/platforms/youtube/connect`
3. Backend returns the Google OAuth URL (with client_id, scopes, state=userId)
4. Frontend opens that URL in a **popup window** (500×700px)
5. User approves in the popup → Google redirects to `GET /api/platforms/youtube/callback`
6. Backend exchanges code for tokens, saves to DB, redirects popup to frontend `/oauth/callback?connected=true`
7. `OAuthCallback` page detects it's in a popup → calls `window.close()`
8. `useOAuth` is polling every 500ms — detects popup closed → calls `GET /api/platforms`
9. If YouTube now appears in the response → calls `onSuccess("youtube", info)`
10. `ConnectionsPage` shows the connected state + username

## Adding to your existing React app

Just import and drop in `ConnectionsPage` anywhere in your router:

```jsx
import { ConnectionsPage } from "./pages/ConnectionsPage";

// In your router:
<Route path="/connections" element={<ConnectionsPage />} />
```

Add the callback route too:

```jsx
<Route path="/oauth/callback" element={<OAuthCallback />} />
```

And in your backend `.env`, set each redirect URI to point to your frontend:

```
YOUTUBE_REDIRECT_URI=https://yourapp.com/oauth/callback?platform=youtube
TIKTOK_REDIRECT_URI=https://yourapp.com/oauth/callback?platform=tiktok
META_REDIRECT_URI=https://yourapp.com/oauth/callback?platform=meta
```
