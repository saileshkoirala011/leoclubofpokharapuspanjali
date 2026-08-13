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
    const el = rightRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-20 lg:py-0 overflow-hidden bg-hero-gradient">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 items-stretch">

        {/* Left — portrait */}
        <div className="relative min-h-[380px] lg:min-h-[580px]">
          <Image
            src="/images/dayasagarparajuli.jpg"
            alt={name} fill
            className="object-cover object-top"
            sizes="50vw"
          />
          <div className="absolute inset-0 hidden lg:block"
            style={{ background: "linear-gradient(to right, transparent 60%, rgba(13,33,70,0.95))" }} />
          <div className="absolute inset-0 lg:hidden"
            style={{ background: "linear-gradient(to top, rgba(13,33,70,0.9), transparent 60%)" }} />

          {/* Est badge */}
          <div
            className="absolute bottom-6 left-6 rounded-2xl px-4 py-3 text-center"
            style={{ background: "linear-gradient(135deg,#1B3A6B,#2D5FAA)", boxShadow: "0 8px 24px rgba(27,58,107,0.5)" }}
          >
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-sky-200/70 mb-0.5">Est.</p>
            <p className="font-display text-xl font-black text-white leading-none">2022</p>
          </div>
        </div>

        {/* Right — quote */}
        <div
          ref={rightRef}
          className="reveal flex flex-col justify-center px-8 sm:px-12 lg:px-14 py-14 lg:py-20 bg-hero-gradient"
        >
          <span className="chip mb-6" style={{ background: "rgba(135,206,235,0.15)", border: "1px solid rgba(135,206,235,0.3)", color: "#87CEEB" }}>
            From Our Founder
          </span>

          {/* Quote mark */}
          <div className="font-display text-8xl font-black leading-none mb-3 select-none"
            style={{ background: "linear-gradient(135deg,#87CEEB,#4A7FD4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", opacity: 0.4 }}>
            &ldquo;
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-black text-white leading-[1.2] mb-6">{title}</h2>
          <p className="text-white/50 text-[15px] leading-relaxed mb-10 max-w-md">{description}</p>

          <div className="h-px bg-white/10 mb-8" />

          {/* Attribution */}
          <div className="flex items-center gap-4">
            <div
              className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0"
              style={{ border: "2px solid rgba(135,206,235,0.4)", boxShadow: "0 4px 16px rgba(135,206,235,0.3)" }}
            >
              <Image src="/images/dayasagarparajuli.jpg" alt={name} fill className="object-cover object-top" />
            </div>
            <div>
              <p className="font-display font-bold text-white text-sm">{name}</p>
              <p className="text-[11px] font-semibold text-sky-300 mt-0.5">{subtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
