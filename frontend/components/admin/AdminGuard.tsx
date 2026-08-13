"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth }   from "@/context/AuthContext";

/**
 * Wraps any admin page.
 * While the initial session check is running, shows a full-screen spinner.
 * Redirects to /admin/login if the user is not authenticated as admin.
 */
export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!isAuthenticated || !isAdmin)) {
      router.replace("/admin/login");
    }
  }, [loading, isAuthenticated, isAdmin, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: "var(--bg)" }}>
        <div
          className="w-10 h-10 rounded-full border-4 animate-spin"
          style={{ borderColor: "#D6EAF8", borderTopColor: "#1B3A6B" }}
          aria-label="Loading session…"
        />
        <p className="text-sm font-semibold" style={{ color: "#64748B" }}>Verifying access…</p>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    // Render nothing while redirect fires
    return null;
  }

  return <>{children}</>;
}
