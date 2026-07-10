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
      <div className="min-h-screen flex items-center justify-center bg-[#0a1628]">
        <div
          className="w-10 h-10 border-4 border-[#c9a84c] border-t-transparent rounded-full animate-spin"
          aria-label="Loading session…"
        />
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    // Render nothing while redirect fires
    return null;
  }

  return <>{children}</>;
}
