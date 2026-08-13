"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

const Eye = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
  </svg>
);
const EyeOff = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
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

  useEffect(() => {
    if (!loading && isAuthenticated && isAdmin) router.replace("/admin");
  }, [loading, isAuthenticated, isAdmin, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setSubmitting(true);
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
      <div className="min-h-screen flex items-center justify-center bg-hero-gradient">
        <div className="w-10 h-10 rounded-full border-4 border-sky-300/30 border-t-sky-300 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-hero-gradient">

      {/* Left — brand panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-14">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div className="absolute top-1/3 right-0 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(135,206,235,0.2) 0%, transparent 70%)" }} />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <Image src="/images/logo.png" alt="Leo Club" width={44} height={44} className="rounded-xl"
            style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.3)" }} />
          <div>
            <div className="text-sky-200/60 text-[10px] uppercase tracking-[0.2em] font-bold">Leo Club</div>
            <div className="font-display font-black text-white text-[15px]">Puspanjali</div>
          </div>
        </div>

        {/* Quote */}
        <div className="relative z-10 max-w-xs">
          <div className="font-display text-6xl font-black text-sky-200/20 leading-none mb-4">&ldquo;</div>
          <p className="font-display text-2xl font-bold text-white leading-snug mb-4">
            Empowering youth through leadership, service, and opportunity.
          </p>
          <p className="text-white/40 text-sm">Leo Club of Pokhara Puspanjali — Admin Portal</p>
          <div className="flex gap-1 mt-6">
            {[0,1,2].map(i => <div key={i} className="w-8 h-1 rounded-full bg-white/15" />)}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10">
          <p className="text-white/25 text-xs">Lead. Serve. Inspire. &mdash; Since 2022</p>
        </div>
      </div>

      {/* Right — form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16 bg-[var(--bg)]">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <Image src="/images/logo.png" alt="Leo Club" width={40} height={40} className="rounded-xl" />
            <div>
              <div className="text-[#64748B] text-[10px] uppercase tracking-[0.18em] font-bold">Leo Club</div>
              <div className="font-display font-black text-[#1B3A6B] text-[14px]">Puspanjali</div>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <span className="chip chip-blue mb-4">Admin Portal</span>
            <h1 className="font-display text-3xl font-black text-[#1E293B] mt-4">Welcome Back</h1>
            <p className="text-[#64748B] text-sm mt-2">Sign in to access the dashboard</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[#64748B] mb-2">
                Email Address
              </label>
              <input
                id="email" type="email" value={email} autoComplete="email" required
                placeholder="admin@example.com"
                onChange={e => { setEmail(e.target.value); setError(""); }}
                className="input"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[#64748B] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password" type={showPass ? "text" : "password"} value={password}
                  autoComplete="current-password" required placeholder="Your password"
                  onChange={e => { setPassword(e.target.value); setError(""); }}
                  className="input pr-12"
                />
                <button
                  type="button" onClick={() => setShowPass(v => !v)}
                  aria-label={showPass ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#1B3A6B] transition-colors p-1 rounded"
                >
                  {showPass ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {error && (
              <div role="alert" className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                <svg className="w-5 h-5 flex-shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit" disabled={submitting || !email || !password}
              className="btn btn-primary w-full justify-center"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  Signing in…
                </>
              ) : "Sign In"}
            </button>
          </form>

          <p className="text-center text-xs text-[#94A3B8] mt-8">
            Admin access only — Leo Club of Pokhara Puspanjali
          </p>
        </div>
      </div>
    </div>
  );
}
