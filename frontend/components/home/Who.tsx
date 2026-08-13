"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Users, Leaf, Star, Heart, Handshake, TrendingUp, Lightbulb, Globe } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";

const STATS = [
  { value: "50+",  label: "Members",        bg: "bg-[#EBF3FF]", color: "#1B3A6B", Icon: Users },
  { value: "30+",  label: "Projects",       bg: "bg-[#EBF5FB]", color: "#5BB8E8", Icon: Leaf },
  { value: "5+",   label: "Years Active",   bg: "bg-[#FEF9EC]", color: "#D4A017", Icon: Star },
  { value: "100+", label: "Lives Impacted", bg: "bg-[#FEF2F4]", color: "#C8102E", Icon: Heart },
];

const PILLARS = [
  { Icon: Handshake,  label: "Service"    },
  { Icon: TrendingUp, label: "Growth"     },
  { Icon: Lightbulb,  label: "Innovation" },
  { Icon: Globe,      label: "Impact"     },
];

export default function Who() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>(".reveal");
    if (!els) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="overflow-hidden" style={{ background: "var(--bg)" }}>

      {/* Stats bar */}
      <div className="bg-white border-b border-[#D6EAF8]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map(({ value, label, bg, color, Icon }) => (
            <div key={label} className={`reveal ${bg} rounded-2xl px-6 py-5 flex items-center gap-3`}>
              <div className="w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center flex-shrink-0">
                <Icon size={20} style={{ color }} strokeWidth={2} />
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl font-black leading-none" style={{ color }}>{value}</div>
                <div className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider mt-1">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two-column */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-20 lg:py-28 grid md:grid-cols-2 gap-14 lg:gap-24 items-center">

        {/* Image */}
        <div className="reveal order-2 md:order-1 relative">
          <div className="absolute -top-6 -left-6 w-28 h-28 rounded-3xl bg-[#EBF3FF] -z-10" />
          <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-2xl bg-[#EBF5FB] -z-10" />

          <div className="relative rounded-3xl overflow-hidden" style={{ boxShadow: "0 16px 64px rgba(27,58,107,0.18)" }}>
            <Image
              src="/images/image.jpeg"
              alt="Leo Club Members"
              width={620}
              height={480}
              className="w-full h-[440px] sm:h-[500px] object-cover"
            />
            {/* Bottom glass strip */}
            <div className="absolute bottom-0 left-0 right-0 glass px-6 py-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#1B3A6B]/60 mb-3">Our Pillars</p>
              <div className="grid grid-cols-4 gap-3">
                {PILLARS.map(({ Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1.5">
                    <div className="w-8 h-8 rounded-lg bg-white/70 flex items-center justify-center">
                      <Icon size={16} className="text-[#1B3A6B]" strokeWidth={1.8} />
                    </div>
                    <span className="text-[9px] font-bold text-[#1B3A6B]/70 uppercase tracking-wider">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="reveal order-1 md:order-2" style={{ transitionDelay: "0.1s" }}>
          <span className="chip chip-blue mb-5">Who We Are</span>

          <h2 className="font-display text-4xl sm:text-5xl font-black text-[#1E293B] leading-[1.1] tracking-tight mb-6">
            Youth-Driven{" "}
            <span style={{ background: "linear-gradient(135deg,#1B3A6B 0%,#4A7FD4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Community Service
            </span>
          </h2>

          <p className="text-[#64748B] leading-relaxed text-[15.5px] mb-4">
            The Leo Club of Pokhara Puspanjali is a dedicated youth organization operating under the International Lions Club. Located in the beautiful city of Pokhara, Nepal, we nurture young leaders and foster community service.
          </p>
          <p className="text-[#64748B] leading-relaxed text-[15.5px] mb-8">
            As a non-profit, we empower youth to develop leadership skills, engage in meaningful community projects, and make a lasting positive impact across Nepal.
          </p>

          {[
            "Leadership development programs",
            "Health camps & blood donation drives",
            "Environmental campaigns & tree plantation",
          ].map(item => (
            <div key={item} className="flex items-center gap-3 mb-3">
              <div className="w-5 h-5 rounded-full bg-[#EBF3FF] flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-[#1B3A6B]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-[14.5px] text-[#1E293B] font-medium">{item}</span>
            </div>
          ))}

          <div className="h-px bg-[#D6EAF8] my-8" />

          <div className="flex items-center gap-3">
            <span className="text-[12px] font-semibold text-[#64748B] uppercase tracking-wider">Follow us:</span>
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank" rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full bg-[#EBF3FF] text-[#1B3A6B] flex items-center justify-center transition-all hover:bg-[#1B3A6B] hover:text-white hover:scale-105"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank" rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-[#EBF3FF] text-[#1B3A6B] flex items-center justify-center transition-all hover:bg-gradient-to-br hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] hover:text-white hover:scale-105"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
