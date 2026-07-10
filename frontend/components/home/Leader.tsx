"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

interface LeaderProps {
  title?:       string;
  description?: string;
  name?:        string;
  subtitle?:    string;
}

export default function Leader({
  title       = "Helping Today's Young Minds Become Tomorrow's Leaders.",
  description = "Welcome to the Leo Club of Pokhara Puspanjali. Our goal is to help young people grow into strong leaders by serving our community and learning together.",
  name        = "Dayasagar Parajuli",
  subtitle    = "Charter President, Leo Club of Pokhara Puspanjali",
}: LeaderProps) {
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rightRef.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="overflow-hidden" style={{
      background: "linear-gradient(135deg, #0d2657 0%, #1a3a6b 60%, #1e4587 100%)"
    }}>
      {/* Sky accent line at top */}
      <div className="h-1" style={{ background: "linear-gradient(90deg, #87CEEB, #B8E4F7, #87CEEB)" }} />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2">

        {/* Left: full-bleed image */}
        <div className="relative min-h-[440px] lg:min-h-[580px]">
          <Image src="/images/dayasagarparajuli.jpg" alt={name} fill
            className="object-cover object-top" sizes="50vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-royal-deep/70 hidden lg:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-royal-deep/70 to-transparent lg:hidden" />

          {/* Floating badge — Nepal flag inspired */}
          <div className="absolute bottom-6 left-6 glass rounded-2xl px-4 py-3 shadow-sky"
            style={{ border: "1.5px solid rgba(135,206,235,0.3)" }}>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-royal/50 mb-0.5">Est.</p>
            <p className="font-display text-xl font-black leading-none" style={{ color: "#E8A000" }}>2022</p>
          </div>
        </div>

        {/* Right: quote + attribution */}
        <div ref={rightRef} className="fade-up flex flex-col justify-center px-8 sm:px-14 py-16 lg:py-24">

          {/* Lotus icon — from logo */}
          <div className="text-4xl mb-6 opacity-50">🪷</div>

          <span className="section-pill-light mb-6">From Our Founder</span>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.15] tracking-tight mb-8 mt-4">
            {title}
          </h2>

          <p className="text-white/50 text-base leading-relaxed mb-12 max-w-lg">{description}</p>

          {/* Sky divider */}
          <div className="flex items-center gap-3 mb-10 max-w-xs">
            <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, #87CEEB, transparent)" }} />
            <span className="w-2 h-2 rounded-full" style={{ background: "#87CEEB" }} />
            <div className="h-px flex-1" style={{ background: "linear-gradient(270deg, #87CEEB, transparent)" }} />
          </div>

          {/* Attribution */}
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0"
              style={{ boxShadow: "0 0 0 2px rgba(135,206,235,0.5), 0 4px 16px rgba(0,0,0,0.3)" }}>
              <Image src="/images/dayasagarparajuli.jpg" alt={name} fill className="object-cover object-top" />
            </div>
            <div>
              <p className="text-white font-bold text-sm font-display">{name}</p>
              <p className="text-[10px] uppercase tracking-[0.15em] font-semibold mt-0.5" style={{ color: "#87CEEB" }}>
                {subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sky accent line at bottom */}
      <div className="h-1" style={{ background: "linear-gradient(90deg, #87CEEB, #B8E4F7, #87CEEB)" }} />
    </section>
  );
}
