"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { GALLERY_IMAGES } from "@/lib/constants";

const TAGS = ["Leadership", "Service", "Community", "Growth", "Nepal", "Impact"];
const MOSAIC = GALLERY_IMAGES.slice(0, 4);

export default function Hero() {
  const [curr, setCurr]       = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const timerRef              = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = () => {
    setCurr((c) => (c + 1) % GALLERY_IMAGES.length);
    setAnimKey((k) => k + 1);
  };

  useEffect(() => {
    timerRef.current = setInterval(advance, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden -mt-[72px]" style={{
      background: "linear-gradient(160deg, #5BB8E8 0%, #87CEEB 20%, #B8E4F7 50%, #DCF0FB 80%, #EEF8FD 100%)"
    }}>

      {/* ── Mountain silhouette at bottom ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{
        background: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 130'%3E%3Cpath d='M0,130 L0,80 L120,30 L240,65 L360,15 L480,50 L600,5 L720,40 L840,10 L960,45 L1080,20 L1200,55 L1320,25 L1440,60 L1440,130 Z' fill='rgba(255,255,255,0.8)'/%3E%3Cpath d='M0,130 L0,95 L180,55 L360,80 L540,35 L720,65 L900,25 L1080,60 L1260,30 L1440,70 L1440,130 Z' fill='rgba(255,255,255,0.95)'/%3E%3C/svg%3E\")",
        backgroundSize: "100% 100%",
      }} />

      {/* ── Soft radial glows ── */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-white/30 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#C8102E]/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-[#E8A000]/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pt-28 pb-24 grid lg:grid-cols-2 gap-16 items-center">

        {/* ── LEFT: Text ── */}
        <div>
          {/* Badge */}
          <div className="section-pill mb-8" style={{ animation: "heroIn 0.6s 0.05s both" }}>
            <span className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
            Leo Club of Pokhara Puspanjali
          </div>

          {/* Headline */}
          <h1
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] mb-6"
            style={{ animation: "heroIn 0.6s 0.15s both", color: "#0d2657" }}
          >
            Lead.{" "}
            <em className="not-italic crimson-text">Serve.</em>
            <br />
            <span className="royal-text">Inspire.</span>
          </h1>

          {/* Sub */}
          <p
            className="text-royal/65 text-base sm:text-lg leading-relaxed max-w-md mb-10"
            style={{ animation: "heroIn 0.6s 0.28s both" }}
          >
            A community of passionate young leaders making a real difference in Pokhara and across Nepal.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-14" style={{ animation: "heroIn 0.6s 0.38s both" }}>
            <Link href="/contact" className="btn-primary">
              Join Now
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/about" className="btn-sky">Learn More</Link>
          </div>

          {/* Stats */}
          <div
            className="flex gap-8 pt-8"
            style={{
              animation: "heroIn 0.6s 0.48s both",
              borderTop: "1px solid rgba(135,206,235,0.5)",
            }}
          >
            {[["50+", "Members", "#C8102E"], ["30+", "Projects", "#E8A000"], ["5+", "Years", "#1a3a6b"]].map(([val, label, color]) => (
              <div key={label}>
                <p className="font-display text-3xl font-black leading-none" style={{ color }}>{val}</p>
                <p className="text-royal/50 text-xs font-semibold mt-1.5 tracking-wider uppercase">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Mosaic ── */}
        <div
          className="hidden lg:grid grid-cols-2 gap-3 relative"
          style={{ animation: "heroIn 0.8s 0.2s both" }}
        >
          {MOSAIC.map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl shadow-sky ${i === 0 ? "row-span-2 min-h-[480px]" : "h-[230px]"}`}
              style={{ transform: i % 2 === 1 ? "translateY(16px)" : "none", border: "2px solid rgba(135,206,235,0.4)" }}
            >
              <Image src={img} alt="" fill
                className="object-cover scale-105 hover:scale-110 transition-transform duration-[8s]"
                sizes="25vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-royal/30 to-transparent" />
            </div>
          ))}

          {/* Floating tags */}
          {TAGS.map((tag, i) => (
            <span
              key={tag}
              className="absolute glass text-royal text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
              style={{
                top:   `${[10,38,62,82,18,55][i] ?? 30}%`,
                left:  `${[5,-8,5,-6,72,76][i] ?? 50}%`,
                animation: `float ${2.5 + i * 0.4}s ease-in-out infinite alternate`,
                animationDelay: `${i * 0.3}s`,
                border: "1.5px solid rgba(135,206,235,0.5)",
              }}
            >
              {tag}
            </span>
          ))}

          {/* Photo counter */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl glass flex flex-col items-center justify-center shadow-sky"
            style={{ border: "2px solid rgba(135,206,235,0.5)" }}>
            <span className="font-display text-2xl font-black royal-text leading-none">{GALLERY_IMAGES.length}</span>
            <span className="text-royal/50 text-[9px] uppercase tracking-wider mt-1">Photos</span>
          </div>
        </div>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {GALLERY_IMAGES.map((_, i) => (
          <button key={i} onClick={() => { setCurr(i); setAnimKey((k) => k + 1); }}
            aria-label={`Slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === curr ? "w-6 h-1.5 bg-royal" : "w-1.5 h-1.5 bg-royal/25 hover:bg-royal/50"
            }`} />
        ))}
      </div>

      <style>{`
        @keyframes heroIn { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float  { from{transform:translateY(0px)} to{transform:translateY(-8px)} }
      `}</style>
    </section>
  );
}
