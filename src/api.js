// ─── ClipDrop API Client ──────────────────────────────────────────────────────
// All calls to the backend go through here.
// Token is read from localStorage and attached automatically.

const BASE_URL = "https://clipdrop-backend-production.up.railway.app";

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const getToken = () => localStorage.getItem("clipdrop_token");

const request = async (path, options = {}) => {
  const token = getToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(body.error || `Request failed (${res.status})`, res.status);
  }

  return res.json();
};

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const authApi = {
  register: (email, password, name) =>
    request("/api/auth/register", { method: "POST", body: JSON.stringify({ email, password, name }) }),

  login: (email, password) =>
    request("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),

  me: () => request("/api/auth/me"),
};

// ─── Platforms ────────────────────────────────────────────────────────────────
export const platformsApi = {
  // Get all connected platforms for current user
  list: () => request("/api/platforms"),

  // Get the OAuth redirect URL from backend, then redirect user
  getConnectUrl: (platform) => request(`/api/platforms/${platform}/connect`),

  // Disconnect a platform
  disconnect: (platform) =>
    request(`/api/platforms/${platform}`, { method: "DELETE" }),

  // Manually trigger publishing
  publish: (uploadId, platforms) =>
    request("/api/platforms/publish", {
      method: "POST",
      body: JSON.stringify({ uploadId, platforms }),
    }),
};

// ─── Uploads ──────────────────────────────────────────────────────────────────
export const uploadsApi = {
  list: (page = 1) => request(`/api/upload?page=${page}`),
  get: (id) => request(`/api/upload/${id}`),
  delete: (id) => request(`/api/upload/${id}`, { method: "DELETE" }),

  upload: (formData, onProgress) => {
    const token = getToken();
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${BASE_URL}/api/upload`);
      if (token) xhr.setRequestHeader("Authorization", `Bearer ${token}`);

      xhr.upload.onprogress = (e) => {
        if (onProgress && e.lengthComputable) {
          onProgress(Math.round((e.loaded / e.total) * 100));
        }
      };

      xhr.onload = () => {
        const data = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) resolve(data);
        else reject(new ApiError(data.error, xhr.status));
      };

      xhr.onerror = () => reject(new ApiError("Network error"));
      xhr.send(formData);
    });
  },
};

// ─── Jobs ─────────────────────────────────────────────────────────────────────
export const jobsApi = {
  status: (jobId) => request(`/api/jobs/${jobId}`),
  uploadStatus: (uploadId) => request(`/api/jobs/upload/${uploadId}`),
};

export { ApiError };
