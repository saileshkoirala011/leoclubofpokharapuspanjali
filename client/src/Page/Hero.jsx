import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { GALLERY_IMAGES } from "../utils/constants";

const SLIDES = GALLERY_IMAGES.map((img, i) => ({
  img,
  tag:  ["Leadership", "Experience", "Opportunity", "Community", "Service", "Impact"][i % 6],
}));

export default function Hero() {
  const [curr, setCurr]     = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const timerRef            = useRef(null);

  const goTo = (i) => {
    setCurr(i);
    setAnimKey((k) => k + 1);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(advance, 5500);
  };

  const advance = () => {
    setCurr((c) => (c + 1) % SLIDES.length);
    setAnimKey((k) => k + 1);
  };

  useEffect(() => {
    timerRef.current = setInterval(advance, 5500);
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden -mt-[72px]">

      {/* ── Slides ── */}
      {SLIDES.map(({ img }, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === curr ? 1 : 0 }}
        >
          <img
            src={img}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover scale-105"
            style={{
              transform: i === curr ? "scale(1.08)" : "scale(1.0)",
              transition: "transform 6s ease-out",
            }}
          />
        </div>
      ))}

      {/* ── Overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 flex flex-col items-start">

        {/* Badge */}
        <div
          key={`badge-${animKey}`}
          className="flex items-center gap-2.5 mb-7"
          style={{ animation: "heroFadeUp 0.7s 0.1s cubic-bezier(0.22,1,0.36,1) both" }}
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
          </span>
          <span className="text-white/80 text-xs font-semibold tracking-[0.18em] uppercase">
            Leo Club of Pokhara Puspanjali
          </span>
        </div>

        {/* Heading */}
        <h1
          key={`h1-${animKey}`}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.0] tracking-tight mb-6 max-w-3xl"
          style={{ animation: "heroFadeUp 0.7s 0.2s cubic-bezier(0.22,1,0.36,1) both" }}
        >
          Lead.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            Serve.
          </span>
          <br />Inspire.
        </h1>

        {/* Sub */}
        <p
          key={`p-${animKey}`}
          className="text-white/65 text-base sm:text-lg font-light leading-relaxed max-w-lg mb-10"
          style={{ animation: "heroFadeUp 0.7s 0.35s cubic-bezier(0.22,1,0.36,1) both" }}
        >
          Join a community of passionate young leaders making a real difference in Pokhara and beyond.
        </p>

        {/* CTAs */}
        <div
          key={`cta-${animKey}`}
          className="flex flex-wrap gap-3"
          style={{ animation: "heroFadeUp 0.7s 0.45s cubic-bezier(0.22,1,0.36,1) both" }}
        >
          <Link
            to="/contact"
            className="group flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-2xl shadow-lg shadow-blue-900/40 hover:shadow-blue-500/50 transition-all duration-300 active:scale-95 text-sm"
          >
            Join Now
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            to="/about"
            className="px-7 py-3.5 bg-white/10 hover:bg-white/18 border border-white/20 text-white font-semibold rounded-2xl backdrop-blur-sm transition-all duration-300 active:scale-95 text-sm"
          >
            Learn More
          </Link>
        </div>

        {/* Stats row */}
        <div
          key={`stats-${animKey}`}
          className="flex gap-8 mt-14 pt-8 border-t border-white/10"
          style={{ animation: "heroFadeUp 0.7s 0.55s cubic-bezier(0.22,1,0.36,1) both" }}
        >
          {[["50+", "Members"], ["30+", "Projects"], ["5+", "Years"]].map(([val, label]) => (
            <div key={label}>
              <p className="text-2xl font-black text-white leading-none">{val}</p>
              <p className="text-white/45 text-xs font-medium mt-1 tracking-wide">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Slide dots ── */}
      <div className="absolute bottom-8 right-8 z-10 flex flex-col gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className={`rounded-full transition-all duration-400 ${
              i === curr ? "h-7 w-1.5 bg-white" : "h-1.5 w-1.5 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* ── Scroll hint ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/30">
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
          <div className="w-0.5 h-2 bg-white/50 rounded-full animate-bounce" />
        </div>
      </div>

      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
