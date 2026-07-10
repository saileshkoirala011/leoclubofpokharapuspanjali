"use client";

import React, { useEffect, useRef } from "react";

const ITEMS = [
  { num:"01", title:"Community Service",  desc:"Blood donation drives, health camps, and social awareness programs that directly uplift the community.", emoji:"🤝", accent:"#C8102E", tag:"Health & Welfare",  span:"lg:col-span-2" },
  { num:"02", title:"Environment",        desc:"Tree plantation, clean-up campaigns, and sustainability awareness for a greener Pokhara.",             emoji:"🌿", accent:"#1a3a6b", tag:"Green Initiatives", span:"" },
  { num:"03", title:"Education",          desc:"Supporting schools, distributing learning materials, and conducting workshops for students.",          emoji:"📚", accent:"#E8A000", tag:"Knowledge",         span:"" },
  { num:"04", title:"Youth Empowerment",  desc:"Leadership training, skill development workshops, and programs inspiring a brighter future.",          emoji:"🚀", accent:"#D4447A", tag:"Leadership",        span:"lg:col-span-2" },
] as const;

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>(".work-card");
    if (!cards) return;
    const obs = new IntersectionObserver((entries) =>
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.08 });
    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 overflow-hidden" style={{
      background: "linear-gradient(180deg, #EEF8FD 0%, #DCF0FB 50%, #B8E4F7 100%)"
    }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <span className="line-accent" />
            <span className="section-pill">What We Do</span>
            <h2 className="font-display text-4xl sm:text-5xl font-black leading-[1.1] mt-4" style={{ color: "#0d2657" }}>
              Creating Impact<br />
              <span className="crimson-text">Every Day</span>
            </h2>
          </div>
          <p className="text-royal/55 text-[15px] leading-relaxed max-w-xs">
            From health camps to tree plantations — our work spans every corner of community development.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ITEMS.map(({ num, title, desc, emoji, accent, tag, span }, i) => (
            <div
              key={title}
              className={`work-card fade-up rounded-3xl p-7 overflow-hidden relative group cursor-default ${span}`}
              style={{
                transitionDelay: `${i * 0.09}s`,
                background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,1) 100%)",
                border: `1.5px solid ${accent}25`,
                boxShadow: "0 4px 24px rgba(135,206,235,0.15)",
                transition: "border-color 0.25s, box-shadow 0.25s, transform 0.25s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = accent;
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 40px ${accent}25`;
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}25`;
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(135,206,235,0.15)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              {/* Top color bar */}
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{ background: accent }} />

              {/* Watermark number */}
              <span className="absolute -top-2 -right-1 text-[7rem] font-black leading-none select-none pointer-events-none"
                style={{ color: accent, opacity: 0.06 }}>{num}</span>

              {/* Tag */}
              <span className="inline-block text-[10px] font-bold uppercase tracking-[0.12em] mt-2 mb-3 px-2.5 py-1 rounded-full"
                style={{ background: `${accent}12`, color: accent }}>{tag}</span>

              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 w-fit">{emoji}</div>

              <h3 className="font-display text-base font-bold mb-2.5 leading-snug" style={{ color: "#0d2657" }}>{title}</h3>
              <p className="text-royal/55 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
