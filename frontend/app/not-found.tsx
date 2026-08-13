import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MessageCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5 overflow-hidden relative bg-mesh">

      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(74,127,212,0.12) 0%, transparent 70%)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(135,206,235,0.15) 0%, transparent 70%)" }} />

      <div className="relative z-10 text-center max-w-md">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-[#EBF3FF] flex items-center justify-center shadow-card">
            <Image src="/images/logo.png" alt="Leo Club" width={52} height={52} className="rounded-xl" />
          </div>
        </div>

        {/* 404 */}
        <div
          className="font-display font-black leading-none select-none mb-4"
          style={{
            fontSize: "clamp(5rem, 20vw, 10rem)",
            background: "linear-gradient(135deg, #1B3A6B 0%, #4A7FD4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            opacity: 0.18,
          }}
        >
          404
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 mb-8 -mt-6">
          <div className="h-px w-12 bg-[#D6EAF8]" />
          <div className="w-2 h-2 rounded-full bg-[#4A7FD4]" />
          <div className="h-px w-12 bg-[#D6EAF8]" />
        </div>

        {/* Text */}
        <span className="chip chip-blue mb-5">Page Not Found</span>
        <h1 className="font-display text-2xl sm:text-3xl font-black text-[#1E293B] mt-4 mb-3">
          Oops! We lost this page.
        </h1>
        <p className="text-[#64748B] text-base leading-relaxed mb-10">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved. Let&apos;s get you back on track.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            <ArrowLeft size={16} strokeWidth={2.5} />
            Back to Home
          </Link>
          <Link href="/contact" className="btn btn-ghost">
            <MessageCircle size={16} strokeWidth={2} />
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
