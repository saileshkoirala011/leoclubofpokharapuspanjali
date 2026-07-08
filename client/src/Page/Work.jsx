import React, { useEffect, useRef } from "react";

const items = [
  {
    num: "01",
    title: "Community Service",
    desc: "Organizing blood donation drives, health camps, and social awareness programs to uplift the community.",
    emoji: "🤝",
    bg: "bg-gradient-to-br from-rose-50 to-red-50",
    border: "hover:border-rose-200",
    accent: "text-rose-500",
    tag: "Health & Welfare",
  },
  {
    num: "02",
    title: "Environment",
    desc: "Tree plantation, clean-up campaigns, and spreading awareness about sustainability and eco-friendly practices.",
    emoji: "🌿",
    bg: "bg-gradient-to-br from-emerald-50 to-green-50",
    border: "hover:border-emerald-200",
    accent: "text-emerald-600",
    tag: "Green Initiatives",
  },
  {
    num: "03",
    title: "Education",
    desc: "Supporting schools, distributing learning materials, and conducting workshops for students across Nepal.",
    emoji: "📚",
    bg: "bg-gradient-to-br from-blue-50 to-sky-50",
    border: "hover:border-blue-200",
    accent: "text-blue-600",
    tag: "Knowledge",
  },
  {
    num: "04",
    title: "Youth Empowerment",
    desc: "Leadership training, skill development workshops, and programs to inspire young people for a brighter future.",
    emoji: "🚀",
    bg: "bg-gradient-to-br from-violet-50 to-purple-50",
    border: "hover:border-violet-200",
    accent: "text-violet-600",
    tag: "Leadership",
  },
];

export default function Work() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(".work-card");
    if (!cards) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="py-28 bg-gray-50/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">

        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            What We Do
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-[1.1] tracking-tight mb-4">
            Creating Impact{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              Every Day
            </span>
          </h2>
          <p className="text-gray-500 text-[15px] leading-relaxed">
            From health camps to tree plantations — our work spans every corner of community development.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ num, title, desc, emoji, bg, border, accent, tag }, i) => (
            <div
              key={title}
              className={`work-card fade-up group relative rounded-3xl p-7 border border-gray-100 ${border} ${bg} hover:shadow-2xl hover:shadow-gray-200/60 hover:-translate-y-2 transition-all duration-400 cursor-default overflow-hidden`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              {/* Number watermark */}
              <span className="absolute top-4 right-5 text-5xl font-black text-black/5 select-none leading-none">
                {num}
              </span>

              {/* Emoji */}
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 w-fit">
                {emoji}
              </div>

              {/* Tag */}
              <span className={`text-[10px] font-bold uppercase tracking-[0.12em] ${accent} mb-3 block`}>
                {tag}
              </span>

              <h3 className="text-base font-bold text-gray-900 mb-2.5 leading-snug">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
