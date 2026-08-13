import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero       from "@/components/ui/PageHero";
import TeamMemberCard from "@/components/ui/TeamMemberCard";

export const metadata: Metadata = {
  title:       "Our Team | Leo Club of Pokhara Puspanjali",
  description: "Meet the passionate young leaders driving positive change in Pokhara.",
};

const TEAM = [
  { name: "LEO Dayasagar Parajuli",  role: "Charter President",       image: "/images/dayasagarparajuli.jpg", badge: "Founder",    accent: "#1B3A6B" },
  { name: "LEO Sadhana Poudel",      role: "Immediate Past President", image: "/images/sandhya.jpg",          badge: "Leadership", accent: "#2D5FAA" },
  { name: "LEO Smriti Karki",        role: "President",                image: "/images/Smitri-Karki.jpg",     badge: "President",  accent: "#C8102E" },
  { name: "LEO Pratik Dhakal",       role: "Vice-President",           image: "/images/pratikdhakal.jpg",                          accent: "#1B3A6B" },
  { name: "LEO Sailesh Koirala",     role: "Secretary",                image: "/images/Sailesh.jpg",                               accent: "#D4A017" },
  { name: "LEO Prasis Adhikari",     role: "Joint Secretary",          image: "/images/prasis.jpg",                                accent: "#D4A017" },
  { name: "LEO Rajani Sharma",       role: "Treasurer",                image: "/images/rajani-sharma.jpg",                         accent: "#C8102E" },
  { name: "LEO Shreeya Acharya",     role: "Member",                   image: "/images/shreeya.jpg",                               accent: "#1B3A6B" },
  { name: "LEO Shrijan Acharya",     role: "Member",                   image: "/images/shrijan.png",                               accent: "#2D5FAA" },
  { name: "LEO Shristi Ranabhat",    role: "Member",                   image: "/images/shristi.jpeg",                              accent: "#D4A017" },
];

const leadership = TEAM.filter(m => m.role !== "Member");
const members    = TEAM.filter(m => m.role === "Member");

interface SectionHeadingProps {
  eyebrow:  string;
  title:    React.ReactNode;
  subtitle: string;
}
function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="text-center mb-10">
      <span className="chip chip-blue mb-4">{eyebrow}</span>
      <h2 className="font-display text-3xl sm:text-4xl font-black text-[#1E293B] mt-3 leading-[1.1]">
        {title}
      </h2>
      <p className="text-[#64748B] text-sm mt-3 max-w-md mx-auto leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
}

export default function TeamPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <PageHero
        label="Leo Club of Pokhara Puspanjali"
        title="Meet Our Team"
        subtitle="A passionate group of young leaders dedicated to community service and lasting positive change."
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24">

        {/* ── Leadership Board ── */}
        <SectionHeading
          eyebrow="Leadership Board"
          title={
            <>
              The{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#1B3A6B,#4A7FD4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Leadership
              </span>{" "}
              Board
            </>
          }
          subtitle="Experienced leaders guiding our club towards its mission and goals."
        />

        {/* ── Leadership grid ──
            xl → 4 cols | lg → 3 cols | sm → 2 cols | mobile → 1 col
            No justify-items-center — cards fill their column fully      ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
          {leadership.map(m => (
            <TeamMemberCard key={m.name} {...m} />
          ))}
        </div>

        {/* ── Divider ── */}
        <div className="divider-ornament mb-14">
          <span className="chip chip-blue whitespace-nowrap">Active Members</span>
        </div>

        {/* ── Active Members ── */}
        <SectionHeading
          eyebrow="Active Members"
          title={
            <>
              Active{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#1B3A6B,#4A7FD4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Members
              </span>
            </>
          }
          subtitle="The heart of our club — committed volunteers making a real difference every day."
        />

        {/* md → 3 cols | sm → 2 cols | mobile → 1 col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-20">
          {members.map(m => (
            <TeamMemberCard key={m.name} {...m} />
          ))}
        </div>

        {/* ── Join CTA ── */}
        <div
          className="bg-hero-gradient rounded-3xl px-8 py-16 text-center relative overflow-hidden"
          style={{ boxShadow: "0 8px 40px rgba(27,58,107,0.35)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(135,206,235,0.12) 0%, transparent 70%)" }}
          />
          <div className="relative z-10">
            <span
              className="chip mb-5"
              style={{
                background: "rgba(135,206,235,0.15)",
                border:     "1px solid rgba(135,206,235,0.30)",
                color:      "#87CEEB",
              }}
            >
              Join Us
            </span>
            <h3 className="font-display text-3xl font-bold text-white mb-3 mt-4">
              Want to Join Our Team?
            </h3>
            <p className="text-white/55 text-sm mb-8 max-w-md mx-auto leading-relaxed">
              We&apos;re always looking for passionate young leaders. Come be a part of something meaningful.
            </p>
            <Link href="/contact" className="btn btn-white">
              Get in Touch
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
