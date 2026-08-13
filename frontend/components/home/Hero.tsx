"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Users, Rocket, CalendarDays, Heart, ArrowRight } from "lucide-react";
import { GALLERY_IMAGES, JOIN_FORM_URL } from "@/lib/constants";

const STATS = [
  { value: "50+",  label: "Members",       Icon: Users        },
  { value: "30+",  label: "Projects Done", Icon: Rocket       },
  { value: "5+",   label: "Years Active",  Icon: CalendarDays },
  { value: "100+", label: "Lives Touched", Icon: Heart        },
];

const LABELS = ["Community", "Environment", "Education", "Leadership"];

export default function Hero() {
  const [curr,    setCurr]    = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = () => {
    setCurr(c => (c + 1) % GALLERY_IMAGES.length);
    setAnimKey(k => k + 1);
  };

  useEffect(() => {
    timer.current = setInterval(advance, 5500);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, []);

  return (
    <section className="relative flex flex-col overflow-hidden" style={{ minHeight: "100svh", marginTop: "-72px" }}>

      {/* ── Background ── */}
      <div className="absolute inset-0">
        <Image
          key={animKey}
          src={GALLERY_IMAGES[curr]}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg,rgba(13,33,70,0.94) 0%,rgba(27,58,107,0.87) 45%,rgba(30,69,135,0.72) 75%,rgba(45,95,170,0.52) 100%)" }}
        />
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: "200px", background: "linear-gradient(to top,rgba(13,33,70,0.7),transparent)" }}
        />
      </div>

      {/* ── Decorative glows ── */}
      <div
        className="absolute right-[6%] pointer-events-none opacity-20"
        style={{ top: "20%", width: "320px", height: "320px", borderRadius: "50%", background: "radial-gradient(circle,#87CEEB,transparent 70%)" }}
      />
      <div
        className="absolute left-[4%] pointer-events-none opacity-10"
        style={{ bottom: "28%", width: "240px", height: "240px", borderRadius: "50%", background: "radial-gradient(circle,#4A7FD4,transparent 70%)" }}
      />

      {/* ── Dot pattern ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.85) 1px,transparent 1px)", backgroundSize: "28px 28px", opacity: 0.055 }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex items-center w-full">
        <div
          className="max-w-7xl mx-auto w-full px-6 sm:px-10 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
          style={{ paddingTop: "112px", paddingBottom: "80px" }}
        >

          {/* LEFT — Text */}
          <div style={{ animation: "heroIn 0.8s cubic-bezier(0.16,1,0.3,1) both" }}>

            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full"
              style={{ background: "rgba(255,255,255,0.11)", border: "1px solid rgba(255,255,255,0.20)" }}
            >
              <Image src="/images/logo.png" alt="" width={18} height={18} className="rounded-full flex-shrink-0" />
              <span className="text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: "#B8E4F7" }}>
                Leo Club of Pokhara Puspanjali
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-black tracking-tight mb-5" style={{ lineHeight: "1.02" }}>
              <span className="block text-white" style={{ fontSize: "clamp(3rem,8vw,5.5rem)" }}>Lead.</span>
              <span
                className="block"
                style={{
                  fontSize: "clamp(3rem,8vw,5.5rem)",
                  background: "linear-gradient(135deg,#87CEEB 0%,#4A7FD4 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Serve.
              </span>
              <span className="block text-white" style={{ fontSize: "clamp(3rem,8vw,5.5rem)" }}>Inspire.</span>
            </h1>

            <p className="font-light leading-relaxed mb-8 max-w-md" style={{ color: "rgba(255,255,255,0.58)", fontSize: "1rem" }}>
              A community of passionate young leaders making a real difference in Pokhara and across Nepal.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                href={JOIN_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-white"
                style={{ fontSize: "0.9375rem", padding: "13px 28px" }}
              >
                Join Our Club
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>
              <Link
                href="/about"
                className="btn btn-outline-white"
                style={{ fontSize: "0.9375rem", padding: "13px 28px" }}
              >
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3">
              {STATS.map(({ value, label, Icon }) => (
                <div
                  key={label}
                  className="rounded-2xl px-3 py-4 text-center"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.13)" }}
                >
                  <div className="flex justify-center mb-1.5">
                    <Icon size={18} strokeWidth={1.8} style={{ color: "#93C5FD" }} />
                  </div>
                  <div className="font-display font-black text-white leading-none" style={{ fontSize: "1.35rem" }}>
                    {value}
                  </div>
                  <div
                    className="font-semibold uppercase tracking-wider mt-1"
                    style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.42)" }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Mosaic */}
          <div
            className="hidden lg:block relative"
            style={{ animation: "heroIn 0.9s 0.15s cubic-bezier(0.16,1,0.3,1) both" }}
          >
            <div className="grid grid-cols-2 gap-3" style={{ height: "480px" }}>

              {/* Tall left cell */}
              <div className="relative overflow-hidden rounded-2xl row-span-2">
                <Image
                  src={GALLERY_IMAGES[0]} alt={LABELS[0]} fill
                  className="object-cover hover:scale-105 transition-transform duration-[6s]"
                  sizes="20vw"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(13,33,70,0.65) 0%,transparent 55%)" }} />
                <div className="absolute bottom-3 left-3 right-3 glass rounded-xl px-3 py-2">
                  <p className="font-bold uppercase tracking-wider text-[#1B3A6B]" style={{ fontSize: "0.625rem" }}>{LABELS[0]}</p>
                </div>
              </div>

              {/* Right column — two stacked cells */}
              <div className="flex flex-col gap-3">
                {[1, 2].map(i => (
                  <div key={i} className="relative overflow-hidden rounded-2xl flex-1">
                    <Image
                      src={GALLERY_IMAGES[i]} alt={LABELS[i]} fill
                      className="object-cover hover:scale-105 transition-transform duration-[6s]"
                      sizes="10vw"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(13,33,70,0.6) 0%,transparent 55%)" }} />
                    <div className="absolute bottom-2 left-2 right-2 glass rounded-lg px-2.5 py-1.5">
                      <p className="font-bold uppercase tracking-wider text-[#1B3A6B]" style={{ fontSize: "0.6rem" }}>{LABELS[i]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo badge */}
            <div
              className="absolute rounded-2xl flex flex-col items-center justify-center z-10"
              style={{
                width: "72px", height: "72px",
                bottom: "-12px", right: "-12px",
                background: "linear-gradient(135deg,#1B3A6B,#2D5FAA)",
                boxShadow: "0 8px 28px rgba(27,58,107,0.50)",
              }}
            >
              <span className="font-display font-black text-white leading-none" style={{ fontSize: "1.5rem" }}>
                {GALLERY_IMAGES.length}
              </span>
              <span
                className="text-sky-200 uppercase tracking-wider mt-0.5"
                style={{ fontSize: "0.5rem" }}
              >
                Photos
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Slide progress bar ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20" style={{ height: "3px", background: "rgba(255,255,255,0.08)" }}>
        <div
          className="h-full transition-all duration-500"
          style={{
            width: `${((curr + 1) / GALLERY_IMAGES.length) * 100}%`,
            background: "linear-gradient(90deg,#87CEEB,#4A7FD4)",
          }}
        />
      </div>

      {/* ── Slide dots ── */}
      <div className="absolute z-20 flex gap-2" style={{ bottom: "16px", left: "50%", transform: "translateX(-50%)" }}>
        {GALLERY_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurr(i); setAnimKey(k => k + 1); }}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              height: "4px",
              borderRadius: "9999px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s",
              width: i === curr ? "2rem" : "0.5rem",
              background: i === curr ? "#87CEEB" : "rgba(255,255,255,0.28)",
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes heroIn {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </section>
  );
}
