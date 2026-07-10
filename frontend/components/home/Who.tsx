"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { SOCIAL_LINKS } from "@/lib/constants";

const STATS = [
  { value: "50+",  label: "Members",       color: "#C8102E", icon: "👥" },
  { value: "30+",  label: "Projects",      color: "#E8A000", icon: "🎯" },
  { value: "5+",   label: "Years Active",  color: "#1a3a6b", icon: "📅" },
  { value: "100+", label: "Lives Impacted",color: "#D4447A", icon: "❤️" },
];
const PILLARS = [
  { icon: "🤝", label: "Service"     },
  { icon: "🌱", label: "Growth"      },
  { icon: "💡", label: "Innovation"  },
  { icon: "🌍", label: "Impact"      },
];

function useFade(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
}

export default function Who() {
  const statRef  = useRef<HTMLDivElement>(null);
  const leftRef  = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  useFade(statRef); useFade(leftRef); useFade(rightRef);

  return (
    <section id="about" className="overflow-hidden" style={{ background: "linear-gradient(180deg, #ffffff 0%, #EEF8FD 100%)" }}>

      {/* ── Stats bar — sky gradient ── */}
      <div ref={statRef} className="fade-up py-10 px-6" style={{
        background: "linear-gradient(135deg, #0d2657 0%, #1a3a6b 60%, #1e4587 100%)",
        borderBottom: "3px solid #87CEEB",
      }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 sm:divide-x sm:divide-sky/15">
          {STATS.map(({ value, label, color, icon }) => (
            <div key={label} className="flex flex-col items-center text-center sm:px-8">
              <span className="text-2xl mb-2">{icon}</span>
              <span className="font-display text-4xl font-black leading-none" style={{ color }}>{value}</span>
              <span className="text-white/45 text-xs uppercase tracking-widest mt-1.5 font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Two-column ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-24 grid md:grid-cols-2 gap-16 lg:gap-28 items-center">

        {/* Image */}
        <div ref={leftRef} className="fade-up relative order-2 md:order-1">
          {/* Decorative offset frame — sky color */}
          <div className="absolute -top-5 -left-5 w-full h-full rounded-3xl pointer-events-none"
            style={{ border: "2px solid rgba(135,206,235,0.5)" }} />

          <div className="relative rounded-3xl overflow-hidden shadow-sky">
            <Image src="/images/image.jpeg" alt="Leo Club Members" width={600} height={440}
              className="w-full h-[440px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-royal/40 via-transparent to-transparent" />

            {/* Floating pillars card */}
            <div className="absolute bottom-5 left-5 right-5 glass rounded-2xl px-5 py-4 shadow-sky">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-royal/50 mb-3">Our Pillars</p>
              <div className="grid grid-cols-4 gap-2">
                {PILLARS.map(({ icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1">
                    <span className="text-xl">{icon}</span>
                    <span className="text-[10px] font-semibold text-royal/70">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Text */}
        <div ref={rightRef} className="fade-up order-1 md:order-2" style={{ transitionDelay: "0.15s" }}>
          <span className="line-accent" />
          <span className="section-pill mb-6">Who We Are</span>

          <h2 className="font-display text-4xl sm:text-5xl font-black leading-[1.1] tracking-tight mt-5 mb-6" style={{ color: "#0d2657" }}>
            Youth-Driven<br />
            <span className="crimson-text">Community</span> Service
          </h2>

          <p className="text-royal/65 leading-relaxed mb-5 text-[15px]">
            The Leo Club of Pokhara Puspanjali is a dedicated youth organization operating under the International Lions Club. Located in the beautiful city of Pokhara, Nepal, we nurture young leaders and foster community service.
          </p>
          <p className="text-royal/65 leading-relaxed mb-10 text-[15px]">
            As a non-profit, we empower youth to develop leadership skills, engage in meaningful community projects, and make a lasting positive impact across Nepal.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-3">
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
              className="w-10 h-10 rounded-full text-white flex items-center justify-center transition-all hover:-translate-y-0.5 shadow-royal"
              style={{ background: "linear-gradient(135deg, #1a3a6b, #1877F2)" }}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.29 20v-7.752h-2.603V9.349h2.603V7.124c0-2.577 1.574-3.974 3.864-3.974 1.099 0 2.042.082 2.313.118v2.685h-1.588c-1.246 0-1.487.592-1.487 1.46v1.912h2.973l-.386 2.899h-2.587V20" />
              </svg>
            </a>
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 text-white flex items-center justify-center transition-all hover:-translate-y-0.5 shadow-crimson">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 1.802c2.67 0 2.987.01 4.042.059 2.71.123 3.851 1.244 3.974 3.974.049 1.054.059 1.37.059 4.041 0 2.67-.01 2.987-.059 4.041-.123 2.729-1.268 3.859-3.977 3.977-1.053.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-2.717-.119-3.851-1.244-3.977-3.942-.059-1.069-.069-1.386-.069-4.041 0-2.67.01-2.986.069-4.04.129-2.729 1.261-3.864 3.975-3.977 1.052-.048 1.368-.058 4.041-.058zm0 1.822c-2.629 0-2.927.01-3.96.058-1.482.069-2.633 1.182-2.702 2.702-.048 1.032-.058 1.331-.058 3.96 0 2.629.01 2.927.058 3.96.069 1.528 1.228 2.653 2.702 2.702 1.033.048 1.331.058 3.96.058 2.629 0 2.927-.01 3.96-.058 1.488-.049 2.646-1.156 2.724-2.702.048-1.033.058-1.331.058-3.96 0-2.629-.01-2.927-.058-3.96-.079-1.528-1.235-2.633-2.703-2.702-1.034-.048-1.332-.058-3.96-.058z"/>
                <path d="M10 4.865a5.135 5.135 0 1 0 0 10.27 5.135 5.135 0 0 0 0-10.27zm0 8.468a3.333 3.333 0 1 1 0-6.666 3.333 3.333 0 0 1 0 6.666z"/>
              </svg>
            </a>
            <span className="text-xs text-royal/45 ml-1 font-medium">Follow us</span>
          </div>
        </div>
      </div>
    </section>
  );
}
