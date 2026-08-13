"use client";

import React from "react";
import Image from "next/image";

interface TeamMemberCardProps {
  name:    string;
  role:    string;
  image:   string;
  badge?:  string;
  accent?: string;
}

export default function TeamMemberCard({
  name,
  role,
  image,
  badge,
  accent = "#1B3A6B",
}: TeamMemberCardProps) {
  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden
                 transition-all duration-300 cursor-default w-full"
      style={{
        border:    "1px solid #E8F4FD",
        boxShadow: "0 2px 16px rgba(30,64,175,0.07), 0 1px 4px rgba(30,64,175,0.04)",
      }}
      onMouseEnter={e =>
        Object.assign((e.currentTarget as HTMLDivElement).style, {
          transform:  "translateY(-6px)",
          boxShadow:  "0 20px 48px rgba(30,64,175,0.16), 0 6px 16px rgba(30,64,175,0.08)",
          borderColor:"#D6EAF8",
        })
      }
      onMouseLeave={e =>
        Object.assign((e.currentTarget as HTMLDivElement).style, {
          transform:  "translateY(0)",
          boxShadow:  "0 2px 16px rgba(30,64,175,0.07), 0 1px 4px rgba(30,64,175,0.04)",
          borderColor:"#E8F4FD",
        })
      }
    >
      {/* ── Top accent bar — fixed height, no reflow ── */}
      <div
        style={{
          height:     "4px",
          flexShrink: 0,
          background: `linear-gradient(90deg, ${accent} 0%, ${accent}70 100%)`,
        }}
      />

      {/* ── Photo area ── */}
      <div className="relative overflow-hidden" style={{ height: "260px" }}>
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.06]"
          sizes="(max-width:640px) 100vw, (max-width:1280px) 50vw, 320px"
        />

        {/* Subtle always-on bottom fade so info strip isn't jarring */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: "80px", background: "linear-gradient(to top, rgba(15,25,50,0.45), transparent)" }}
        />

        {/* Stronger overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "linear-gradient(to top, rgba(15,25,50,0.65) 0%, transparent 60%)" }}
        />

        {/* Badge — top-left, always visible */}
        {badge && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className="text-[10px] font-bold uppercase tracking-wider
                         px-3 py-1.5 rounded-full text-white"
              style={{
                background: "rgba(15,25,50,0.55)",
                border:     "1px solid rgba(255,255,255,0.25)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
              }}
            >
              {badge}
            </span>
          </div>
        )}

        {/* Role pill — slides up on hover */}
        <div
          className="absolute left-4 z-10 flex
                     translate-y-3 opacity-0
                     group-hover:translate-y-0 group-hover:opacity-100
                     transition-all duration-300"
          style={{ bottom: "14px" }}
        >
          <span
            className="inline-flex items-center gap-1.5 text-[10px] font-bold
                       uppercase tracking-wider text-white px-3 py-1.5 rounded-full"
            style={{
              background: accent,
              boxShadow:  `0 4px 14px rgba(0,0,0,0.28)`,
            }}
          >
            <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            {role}
          </span>
        </div>
      </div>

      {/* ── Info strip ── */}
      <div
        className="flex items-center justify-between gap-3 px-5 py-4"
        style={{ borderTop: "1px solid #EFF6FF" }}
      >
        <div className="min-w-0 flex-1">
          {/* Name */}
          <p
            className="font-display font-bold text-[#1E293B] leading-tight truncate"
            style={{ fontSize: "14.5px" }}
          >
            {name}
          </p>
          {/* Role */}
          <p
            className="font-semibold leading-tight mt-1 truncate"
            style={{ fontSize: "12px", color: accent }}
          >
            {role}
          </p>
        </div>

        {/* Arrow button — appears on hover */}
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                     opacity-0 group-hover:opacity-100 transition-all duration-300
                     group-hover:scale-110"
          style={{
            background: `${accent}15`,
            border:     `1.5px solid ${accent}30`,
          }}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24"
            stroke={accent} strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </div>
    </div>
  );
}
