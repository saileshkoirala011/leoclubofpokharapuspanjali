"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link               from "next/link";
import { api }            from "@/lib/api";

type Status = "loading" | "success" | "error";

function VerifyContent() {
  const params = useSearchParams();
  const token  = params.get("token");
  const [status,  setStatus]  = useState<Status>("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("No verification token found in the URL.");
      return;
    }
    api.post("/auth/verify-email", { token })
      .then(() => {
        setStatus("success");
        setMessage("Email verified successfully! You can now log in.");
      })
      .catch((err: unknown) => {
        const msg =
          (err as { response?: { data?: { message?: string } } })?.response?.data?.message
          ?? "Invalid or expired verification link.";
        setStatus("error");
        setMessage(msg);
      });
  }, [token]);

  return (
    <div className="text-center">
      {status === "loading" && (
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
          <p className="text-white/50 text-sm">Verifying your email…</p>
        </div>
      )}

      {status === "success" && (
        <>
          <div className="w-16 h-16 rounded-full bg-green-900/30 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-display text-2xl font-black text-white mb-3">Email Verified!</h1>
          <p className="text-white/45 text-sm mb-8">{message}</p>
          <Link href="/" className="btn-gold">Go to Home</Link>
        </>
      )}

      {status === "error" && (
        <>
          <div className="w-16 h-16 rounded-full bg-red-900/30 border border-red-500/30 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="font-display text-2xl font-black text-white mb-3">Verification Failed</h1>
          <p className="text-white/45 text-sm mb-8">{message}</p>
          <Link href="/" className="btn-outline-white">Back to Home</Link>
        </>
      )}
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-[#0a1628] flex items-center justify-center px-5">
      <div className="max-w-md w-full">
        <Suspense fallback={
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
            <p className="text-white/50 text-sm">Loading…</p>
          </div>
        }>
          <VerifyContent />
        </Suspense>
      </div>
    </div>
  );
}
