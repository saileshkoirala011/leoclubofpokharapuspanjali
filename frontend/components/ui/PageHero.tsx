import React from "react";

interface PageHeroProps {
  label:    string;
  title:    string;
  subtitle: string;
}

export default function PageHero({ label, title, subtitle }: PageHeroProps) {
  return (
    <div className="relative pt-36 pb-24 px-6 text-center overflow-hidden bg-hero-gradient">

      {/* Decorative orbs */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(74,127,212,0.35) 0%, transparent 70%)" }}
      />
      <div
        className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(135,206,235,0.25) 0%, transparent 70%)" }}
      />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize:  "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto animate-fadeUp">
        {/* Chip */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-[11px] font-bold uppercase tracking-[0.12em]"
          style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", color: "#87CEEB" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-sky-300 animate-pulse" />
          {label}
        </div>

        {/* Title */}
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-5">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-white/55 text-lg sm:text-xl max-w-xl mx-auto font-light leading-relaxed">
          {subtitle}
        </p>

        {/* Bottom decorative line */}
        <div className="flex items-center justify-center gap-3 mt-10">
          <div className="h-px w-12 bg-white/20" />
          <div className="flex gap-1">
            {[0,1,2].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/30" />
            ))}
          </div>
          <div className="h-px w-12 bg-white/20" />
        </div>
      </div>
    </div>
  );
}
