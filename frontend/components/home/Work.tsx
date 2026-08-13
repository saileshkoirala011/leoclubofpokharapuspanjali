"use client";

import React, { useEffect, useRef } from "react";
import { HeartHandshake, TreePine, BookOpen, Rocket } from "lucide-react";

const ITEMS = [
  {
    title:  "Community Service",
    desc:   "Blood donation drives, health camps, and social awareness programs that directly uplift the community.",
    Icon:   HeartHandshake,
    accent: "#1B3A6B",
    bg:     "bg-[#EBF3FF]",
    tag:    "Health & Welfare",
    wide:   true,
  },
  {
    title:  "Environment",
    desc:   "Tree plantation, clean-up campaigns, and sustainability awareness for a greener Pokhara.",
    Icon:   TreePine,
    accent: "#2D9348",
    bg:     "bg-[#ECFDF5]",
    tag:    "Green Initiatives",
    wide:   false,
  },
  {
    title:  "Education",
    desc:   "Supporting schools, distributing learning materials, and workshops for students.",
    Icon:   BookOpen,
    accent: "#D4A017",
    bg:     "bg-[#FEF9EC]",
    tag:    "Knowledge",
    wide:   false,
  },
  {
    title:  "Youth Empowerment",
    desc:   "Leadership training, skill-development workshops, and programs inspiring a brighter future.",
    Icon:   Rocket,
    accent: "#5BB8E8",
    bg:     "bg-[#EBF5FB]",
    tag:    "Leadership",
    wide:   true,
  },
] as const;

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>(".wcard");
    if (!cards) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
      }),
      { threshold: 0.08 }
    );
    cards.forEach(c => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 overflow-hidden bg-mesh-blue">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">

        {/* Header */}
        <div className="text-center mb-14 wcard reveal">
          <span className="chip chip-blue mb-5">What We Do</span>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-[#1E293B] leading-[1.1] tracking-tight">
            Creating Impact{" "}
            <span style={{ background: "linear-gradient(135deg,#1B3A6B 0%,#4A7FD4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Every Day
            </span>
          </h2>
          <p className="text-[#64748B] text-base sm:text-lg mt-4 max-w-xl mx-auto leading-relaxed">
            From health camps to tree plantations — our work spans every corner of community development.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ITEMS.map(({ title, desc, Icon, accent, bg, tag, wide }, i) => (
            <div
              key={title}
              className={`wcard reveal card card-hover group ${wide ? "lg:col-span-2" : ""} p-7 flex flex-col gap-5 cursor-default`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full"
                  style={{ background: `${accent}14`, color: accent }}
                >
                  {tag}
                </span>
                <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  <Icon size={22} style={{ color: accent }} strokeWidth={1.8} />
                </div>
              </div>

              <div>
                <h3 className="font-display text-lg font-bold text-[#1E293B] mb-2">{title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{desc}</p>
              </div>

              <div
                className="mt-auto h-0.5 w-10 rounded-full group-hover:w-full transition-all duration-500"
                style={{ background: accent }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
