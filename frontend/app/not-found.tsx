import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a1628] flex items-center justify-center px-5 overflow-hidden relative">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(201,168,76,1) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,1) 1px,transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#c9a84c]/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-lg">
        <div
          className="font-display font-black leading-none select-none mb-6"
          style={{
            fontSize: "clamp(7rem, 25vw, 14rem)",
            background: "linear-gradient(135deg, rgba(201,168,76,0.15) 0%, rgba(201,168,76,0.05) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          404
        </div>

        <div className="flex items-center justify-center gap-3 mb-8 -mt-4">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c9a84c]/40" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c9a84c]/40" />
        </div>

        <h1 className="font-display text-2xl sm:text-3xl font-black text-white mb-3">Page Not Found</h1>
        <p className="text-white/40 text-sm sm:text-base leading-relaxed mb-10">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn-gold">← Back to Home</Link>
          <Link href="/contact" className="btn-outline-white">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
