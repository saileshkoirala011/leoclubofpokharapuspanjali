"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const TEAM = [
  { name: "LEO Smriti Karki",    role: "President",      image: "/images/Smitri-Karki.jpg",   color: "#C8102E" },
  { name: "LEO Pratik Dhakal",   role: "Vice-President", image: "/images/pratikdhakal.jpg",   color: "#1a3a6b" },
  { name: "LEO Sailesh Koirala", role: "Secretary",      image: "/images/Sailesh.jpg",        color: "#E8A000" },
];

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>(".team-card");
    if (!cards) return;
    const obs = new IntersectionObserver((entries) =>
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.12 });
    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 overflow-hidden" style={{
      background: "linear-gradient(180deg, #EEF8FD 0%, #DCF0FB 100%)"
    }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <span className="line-accent" />
            <span className="section-pill">Our People</span>
            <h2 className="font-display text-4xl sm:text-5xl font-black leading-[1.1] mt-4" style={{ color: "#0d2657" }}>
              Meet the<br />
              <span className="royal-text">Leadership</span>
            </h2>
          </div>
          <Link href="/team" className="btn-sky self-start sm:self-end">
            View Full Team
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {TEAM.map(({ name, role, image, color }, i) => (
            <div key={name}
              className="team-card fade-up group relative overflow-hidden rounded-3xl bg-white transition-all duration-300 hover:-translate-y-1.5"
              style={{
                transitionDelay: `${i * 0.1}s`,
                border: `2px solid rgba(135,206,235,0.3)`,
                boxShadow: "0 4px 24px rgba(135,206,235,0.15)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = color;
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 48px ${color}30`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(135,206,235,0.3)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(135,206,235,0.15)";
              }}
            >
              {/* Color top bar */}
              <div className="h-1.5 w-full" style={{ background: color }} />

              {/* Image */}
              <div className="relative overflow-hidden h-72">
                <Image src={image} alt={name} fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width:640px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-royal/50 via-transparent to-transparent" />

                {/* Role badge */}
                <span className="absolute bottom-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full text-white"
                  style={{ background: color }}>
                  {role}
                </span>
              </div>

              {/* Name */}
              <div className="px-5 py-4" style={{ background: "linear-gradient(180deg, #ffffff 0%, #F0F9FF 100%)" }}>
                <h3 className="font-display text-[15px] font-bold leading-snug" style={{ color: "#0d2657" }}>{name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
