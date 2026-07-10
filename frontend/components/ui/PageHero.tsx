import React from "react";

interface PageHeroProps {
  label:    string;
  title:    string;
  subtitle: string;
}

export default function PageHero({ label, title, subtitle }: PageHeroProps) {
  return (
    <div className="relative py-28 px-5 text-center overflow-hidden" style={{
      background: "linear-gradient(160deg, #5BB8E8 0%, #87CEEB 20%, #B8E4F7 55%, #DCF0FB 85%, #ffffff 100%)"
    }}>

      {/* Mountain silhouette bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none" style={{
        background: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 65'%3E%3Cpath d='M0,65 L0,40 L120,15 L240,32 L360,8 L480,25 L600,3 L720,20 L840,5 L960,22 L1080,10 L1200,28 L1320,12 L1440,30 L1440,65 Z' fill='white'/%3E%3C/svg%3E\")",
        backgroundSize: "100% 100%",
      }} />

      {/* Soft glow orbs */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-white/40 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-[#C8102E]/8 rounded-full blur-[60px] pointer-events-none" />

      {/* Nepal flag accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-crimson via-crimson-light to-crimson" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <span className="section-pill mb-5">{label}</span>
        <h1 className="font-display text-5xl sm:text-6xl font-black mb-5 mt-4 leading-[1.05]"
          style={{ color: "#0d2657" }}>
          {title}
        </h1>
        <p className="text-royal/60 text-lg max-w-xl mx-auto font-light leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
