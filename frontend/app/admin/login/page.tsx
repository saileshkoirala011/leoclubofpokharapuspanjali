"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image        from "next/image";
import { useAuth }  from "@/context/AuthContext";

/* ── Icon helpers ── */
const Eye = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);
const EyeOff = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);

export default function AdminLoginPage() {
  const { login, isAuthenticated, isAdmin, loading } = useAuth();
  const router = useRouter();

  const [email,      setEmail]      = useState("");
  const [password,   setPassword]   = useState("");
  const [showPass,   setShowPass]   = useState(false);
  const [error,      setError]      = useState("");
  const [submitting, setSubmitting] = useState(false);

  /* Redirect if already logged in as admin */
  useEffect(() => {
    if (!loading && isAuthenticated && isAdmin) router.replace("/admin");
  }, [loading, isAuthenticated, isAdmin, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const user = await login(email, password);
      if (!user || (user.role !== "admin" && user.role !== "super_admin")) {
        await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
        setError("Access denied — admin accounts only.");
        return;
      }
      router.replace("/admin");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a1628]">
        <div className="w-8 h-8 border-4 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#0a1628]">
      {/* Left hero panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <Image src="/images/bg.jpg" alt="" fill className="object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/70 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(201,168,76,1) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,1) 1px,transparent 1px)", backgroundSize: "80px 80px" }}
        />
        <div className="relative z-10 flex flex-col justify-between p-14 w-full">
          <div className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="Leo Club" width={40} height={40} className="brightness-0 invert opacity-80" />
            <div>
              <div className="text-white/50 text-[11px] uppercase tracking-[0.18em] font-semibold">Leo Club</div>
              <div className="text-[#c9a84c] font-bold text-sm">Puspanjali</div>
            </div>
          </div>
          <div className="max-w-sm">
            <svg className="w-10 h-10 text-[#c9a84c] opacity-40 mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="font-display text-2xl font-bold text-white leading-snug mb-4">
              Empowering youth through leadership, service, and opportunity.
            </p>
            <p className="text-white/40 text-sm">Leo Club of Pokhara Puspanjali — Admin Portal</p>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <Image src="/images/logo.png" alt="Leo Club" width={36} height={36} className="brightness-0 invert opacity-80" />
            <div>
              <div className="text-white/50 text-[10px] uppercase tracking-[0.18em] font-semibold">Leo Club</div>
              <div className="text-[#c9a84c] font-bold text-sm">Puspanjali</div>
            </div>
          </div>

          <div className="mb-8">
            <span className="section-pill mb-4">Admin Portal</span>
            <h1 className="font-display text-3xl font-black text-white mt-4 leading-tight">Welcome Back</h1>
            <p className="text-white/35 text-sm mt-2">Sign in to access the dashboard</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-[0.18em] text-white/40 mb-2">
                Email Address
              </label>
              <input
                id="email" type="email" value={email} autoComplete="email" required
                placeholder="admin@example.com"
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                className="w-full px-4 py-3 rounded-xl border-2 border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-[#c9a84c] focus:outline-none text-sm transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-[10px] font-bold uppercase tracking-[0.18em] text-white/40 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password" type={showPass ? "text" : "password"} value={password}
                  autoComplete="current-password" required placeholder="Your password"
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-white/10 bg-white/5 text-white placeholder-white/20 focus:border-[#c9a84c] focus:outline-none text-sm transition-all"
                />
                <button
                  type="button" onClick={() => setShowPass((v) => !v)}
                  aria-label={showPass ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors p-1"
                >
                  {showPass ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div role="alert" className="flex items-start gap-2.5 p-3.5 bg-red-900/30 border border-red-500/30 text-red-300 rounded-xl text-sm">
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit" disabled={submitting || !email || !password}
              className="btn-gold w-full justify-center py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Signing in…
                </>
              ) : "Sign In"}
            </button>
          </form>

          <p className="text-center text-xs text-white/20 mt-8">Admin access only — Leo Club of Pokhara Puspanjali</p>
        </div>
      </div>
    </div>
  );
}
