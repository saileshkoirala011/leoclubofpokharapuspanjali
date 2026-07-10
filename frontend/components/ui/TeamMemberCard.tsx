import React from "react";
import Image from "next/image";

interface TeamMemberCardProps {
  name:    string;
  role:    string;
  image:   string;
  badge?:  string;
  accent?: string;
}

export default function TeamMemberCard({ name, role, image, badge, accent = "#1a3a6b" }: TeamMemberCardProps) {
  return (
    <div
      className="group relative overflow-hidden rounded-3xl bg-white transition-all duration-300 hover:-translate-y-1.5"
      style={{
        borderBottom: `3px solid ${accent}`,
        border: `1.5px solid rgba(135,206,235,0.3)`,
        borderBottomColor: accent,
        boxShadow: "0 4px 20px rgba(135,206,235,0.12)",
      }}
    >
      {/* Top accent */}
      <div className="h-1 w-full" style={{ background: accent }} />

      <div className="relative overflow-hidden h-72">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-royal/60 via-royal/10 to-transparent" />

        {badge && (
          <span
            className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full text-white"
            style={{ background: accent }}
          >
            {badge}
          </span>
        )}

        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
          <h3 className="font-display text-sm font-bold text-white leading-snug">{name}</h3>
          <span
            className="inline-block mt-1 text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-0.5 rounded-full text-white"
            style={{ background: `${accent}cc` }}
          >
            {role}
          </span>
        </div>
      </div>
    </div>
  );
}
