"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TeamMemberCard from "@/components/ui/TeamMemberCard";

const TEAM = [
  { name: "LEO Smriti Karki",    role: "President",      image: "/images/Smitri-Karki.jpg", accent: "#C8102E" },
  { name: "LEO Pratik Dhakal",   role: "Vice-President", image: "/images/pratikdhakal.jpg", accent: "#1B3A6B" },
  { name: "LEO Sailesh Koirala", role: "Secretary",      image: "/images/Sailesh.jpg",      accent: "#D4A017" },
];

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>(".tcard");
    if (!cards) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    cards.forEach(c => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 reveal">
          <div>
            <span className="chip chip-blue mb-4">Our People</span>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-[#1E293B] leading-[1.1]">
              Meet the{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#1B3A6B,#4A7FD4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Leadership
              </span>
            </h2>
          </div>
          <Link href="/team" className="btn btn-ghost btn-sm self-start sm:self-end">
            View Full Team
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </div>

        {/* ── Cards — 3 equal columns, no max-width cap ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {TEAM.map(({ name, role, image, accent }, i) => (
            <div
              key={name}
              className="tcard reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <TeamMemberCard
                name={name}
                role={role}
                image={image}
                accent={accent}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
