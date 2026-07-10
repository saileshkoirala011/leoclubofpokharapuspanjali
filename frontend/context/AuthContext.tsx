"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { API_BASE_URL } from "@/lib/constants";
import type { User } from "@/types";

// ── Types ─────────────────────────────────────────────────────────────────────

interface AuthContextValue {
  user:            User | null;
  loading:         boolean;
  isAuthenticated: boolean;
  isAdmin:         boolean;
  login:           (email: string, password: string) => Promise<User | null>;
  logout:          () => Promise<void>;
  refresh:         () => Promise<boolean>;
  fetchProfile:    () => Promise<User | null>;
}

// ── Context ───────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ── Provider ──────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser]       = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const refreshingRef         = useRef(false);

  const fetchProfile = useCallback(async (): Promise<User | null> => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/profile`, { credentials: "include" });
      if (res.ok) {
        const json = await res.json();
        const u = (json.data ?? null) as User | null;
        setUser(u);
        return u;
      }
      setUser(null);
      return null;
    } catch {
      setUser(null);
      return null;
    }
  }, []);

  const refresh = useCallback(async (): Promise<boolean> => {
    if (refreshingRef.current) return false;
    refreshingRef.current = true;
    try {
      const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        await fetchProfile();
        return true;
      }
      setUser(null);
      return false;
    } catch {
      setUser(null);
      return false;
    } finally {
      refreshingRef.current = false;
    }
  }, [fetchProfile]);

  const login = useCallback(async (email: string, password: string): Promise<User | null> => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json?.message ?? "Login failed. Please check your credentials.");
    const u = (json.data?.user ?? null) as User | null;
    setUser(u);
    return u;
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, { method: "POST", credentials: "include" });
    } finally {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, [refresh]);

  const value: AuthContextValue = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin:         user?.role === "admin" || user?.role === "super_admin",
    login,
    logout,
    refresh,
    fetchProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth() must be called inside <AuthProvider>.");
  return ctx;
}

export default AuthContext;
