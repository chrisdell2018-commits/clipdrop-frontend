Files to build:
1. OAuthCallback.jsx         - handles redirect back from platform with ?code=
2. PlatformsPage.jsx         - full connections management page
3. ConnectButton.jsx         - reusable connect/disconnect button
4. useOAuth.js               - hook: initiates OAuth popup/redirect, polls status
5. usePlatforms.js           - hook: fetches connected platforms, disconnect
6. api.js                    - API client with JWT auth header
7. App.jsx                   - router wiring it all together
