// platforms.js — All API calls for platform OAuth and publishing

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:3001";

const authFetch = async (path, options = {}) => {
  const token = localStorage.getItem("clipdrop_token");
  if (!token) throw new Error("Not authenticated");
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `Request failed: ${res.status}`);
  return data;
};

export const getConnectedPlatforms = () => authFetch("/api/platforms");

export const getOAuthUrl = (platform) => {
  const endpoint = ["instagram", "facebook"].includes(platform)
    ? "/api/platforms/meta/connect"
    : `/api/platforms/${platform}/connect`;
  return authFetch(endpoint);
};

export const disconnectPlatform = (platform) =>
  authFetch(`/api/platforms/${platform}`, { method: "DELETE" });

export const publishUpload = (uploadId, platforms) =>
  authFetch("/api/platforms/publish", {
    method: "POST",
    body: JSON.stringify({ uploadId, platforms }),
  });

export const pollJobStatus = (jobId, onProgress, intervalMs = 1500) => {
  const token = localStorage.getItem("clipdrop_token");
  let active = true;
  const poll = async () => {
    if (!active) return;
    try {
      const res = await fetch(`${API_BASE}/api/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      onProgress(data);
      if (data.state !== "completed" && data.state !== "failed") {
        setTimeout(poll, intervalMs);
      }
    } catch (err) {
      setTimeout(poll, intervalMs * 2);
    }
  };
  poll();
  return () => { active = false; };
};
