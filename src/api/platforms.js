// ─── ClipDrop Platform API ────────────────────────────────────────────────────
// All calls that talk to the Express backend for OAuth & platform management.

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

// ─── Auth helper ──────────────────────────────────────────────────────────────
const getHeaders = () => {
  const token = localStorage.getItem("clipdrop_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
};

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const authAPI = {
  register: (email, password, name) =>
    fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    }).then(handleResponse),

  login: (email, password) =>
    fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then(handleResponse),

  me: () =>
    fetch(`${BASE_URL}/api/auth/me`, { headers: getHeaders() }).then(handleResponse),
};

// ─── Platforms ────────────────────────────────────────────────────────────────
export const platformsAPI = {
  // Get all connected platform statuses for the logged-in user
  getAll: () =>
    fetch(`${BASE_URL}/api/platforms`, { headers: getHeaders() }).then(handleResponse),

  // Get the OAuth redirect URL from the backend, then open it
  getConnectUrl: (platform) =>
    fetch(`${BASE_URL}/api/platforms/${platform}/connect`, {
      headers: getHeaders(),
    }).then(handleResponse),

  // Disconnect a platform (delete stored token)
  disconnect: (platform) =>
    fetch(`${BASE_URL}/api/platforms/${platform}`, {
      method: "DELETE",
      headers: getHeaders(),
    }).then(handleResponse),

  // Trigger publish for an upload across selected platforms
  publish: (uploadId, platforms) =>
    fetch(`${BASE_URL}/api/platforms/publish`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ uploadId, platforms }),
    }).then(handleResponse),
};
