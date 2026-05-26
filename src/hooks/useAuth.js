import { useState, useEffect, useCallback } from "react";
import { authApi } from "../api";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("clipdrop_token");
    if (!token) { setLoading(false); return; }
    authApi.me()
      .then(data => setUser(data.user))
      .catch(() => localStorage.removeItem("clipdrop_token"))
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await authApi.login(email, password);
    localStorage.setItem("clipdrop_token", data.token);
    setUser(data.user);
    // Force redirect immediately
    window.location.replace("/#/connections");
    return data.user;
  }, []);

  const register = useCallback(async (email, password, name) => {
    const data = await authApi.register(email, password, name);
    localStorage.setItem("clipdrop_token", data.token);
    setUser(data.user);
    // Force redirect immediately
    window.location.replace("/#/connections");
    return data.user;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("clipdrop_token");
    setUser(null);
    window.location.replace("/");
  }, []);

  return { user, loading, login, register, logout };
}