import React, { useEffect, useRef } from "react";
import leader from "../assets/dayasagarparajuli.jpg";

export default function Leader({
  title       = "Helping Today's Young Minds Become Tomorrow's Leaders.",
  description = "Welcome to the Leo Club of Pokhara Puspanjali. Our goal is to help young people grow into strong leaders by serving our community and learning together. Every member plays a vital role in making a positive difference.",
  name        = "Dayasagar Parajuli",
  subtitle    = "Charter President, Leo Club of Pokhara Puspanjali",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative py-28 overflow-hidden bg-[#050d1a]">
      {/* Background gradient blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-400/8 rounded-full blur-[80px] pointer-events-none" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div ref={ref} className="fade-up relative z-10 max-w-4xl mx-auto px-6 sm:px-10 text-center">

        {/* Quote icon */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600/15 border border-blue-500/20 mb-10">
          <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-[1.15] tracking-tight mb-8 max-w-3xl mx-auto">
          {title}
        </h2>

        <p className="text-white/50 text-base sm:text-lg leading-relaxed font-light mb-14 max-w-2xl mx-auto">
          {description}
        </p>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/20" />
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="absolute -inset-[3px] rounded-full bg-gradient-to-br from-blue-500 to-blue-700 opacity-60 blur-sm" />
            <img
              src={leader}
              alt={name}
              className="relative w-16 h-16 rounded-full object-cover ring-2 ring-blue-500/40 shadow-2xl"
            />
          </div>
          <div>
            <p className="text-white font-bold text-base">{name}</p>
            <p className="text-blue-400/80 text-xs uppercase tracking-[0.15em] font-semibold mt-1">{subtitle}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
