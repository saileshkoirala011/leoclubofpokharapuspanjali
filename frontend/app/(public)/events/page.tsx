"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { Calendar, MapPin } from "lucide-react";

const today = new Date();
const deriveStatus = (d: string) => new Date(d) >= today ? "upcoming" : "past";

const RAW = [
  { id:1,  title:"Blood Donation Drive",        date:"2024-03-15", category:"Health",      description:"Organized a community blood donation camp collecting over 50 units of blood.",                      location:"Pokhara, Nepal",          color:"crimson" },
  { id:2,  title:"Tree Plantation Campaign",     date:"2024-06-05", category:"Environment", description:"Planted 200+ trees across Pokhara as part of World Environment Day celebrations.",                  location:"Phewa Lake, Pokhara",     color:"green"   },
  { id:3,  title:"Youth Leadership Workshop",    date:"2024-08-20", category:"Education",   description:"A two-day workshop on leadership and community service for 60+ youth participants.",                location:"Pokhara City Hall",        color:"royal"   },
  { id:4,  title:"Health Awareness Camp",        date:"2025-02-10", category:"Health",      description:"Free health checkup and awareness program on diabetes and hypertension prevention.",                 location:"Pokhara, Nepal",          color:"crimson" },
  { id:5,  title:"Annual Leo Day Celebration",   date:"2025-10-02", category:"Club",        description:"Celebrating Leo Day with community service activities, cultural programs, and award ceremonies.",   location:"Pokhara, Nepal",          color:"gold"    },
  { id:6,  title:"Street Clean-Up Drive",        date:"2025-11-22", category:"Environment", description:"Citywide clean-up initiative engaging 100+ volunteers.",                                            location:"Lakeside, Pokhara",       color:"green"   },
  { id:7,  title:"Scholarship Distribution",     date:"2025-12-10", category:"Education",   description:"Awarded merit-based scholarships to 15 underprivileged students.",                                 location:"Pokhara, Nepal",          color:"royal"   },
  { id:8,  title:"Winter Blanket Distribution",  date:"2026-01-18", category:"Club",        description:"Distributed blankets and warm clothing to 200+ families in need.",                                  location:"Pokhara Metropolitan",    color:"gold"    },
  { id:9,  title:"Eye Care Camp",                date:"2026-03-08", category:"Health",      description:"Free eye check-up and eyeglass distribution serving 300+ patients.",                                location:"Pokhara, Nepal",          color:"crimson" },
  { id:10, title:"Environmental Awareness Walk", date:"2026-06-05", category:"Environment", description:"Public awareness march on World Environment Day promoting sustainable living.",                     location:"Phewa Lake, Pokhara",     color:"green"   },
  { id:11, title:"Digital Literacy Workshop",    date:"2026-08-15", category:"Education",   description:"Hands-on training on computing and internet safety for rural youth.",                               location:"Pokhara, Nepal",          color:"royal"   },
  { id:12, title:"Annual Leo Convention 2026",   date:"2026-10-01", category:"Club",        description:"Our flagship annual convention for networking, awards, and service planning.",                      location:"Hotel Barahi, Pokhara",   color:"gold"    },
];

const EVENTS = RAW.map((e) => ({ ...e, status: deriveStatus(e.date) }));
const CATEGORIES = ["All", "Health", "Environment", "Education", "Club"] as const;

const ACCENT: Record<string, { bg: string; text: string; dot: string }> = {
  crimson: { bg: "bg-red-50",        text: "text-red-600",    dot: "bg-red-400"    },
  green:   { bg: "bg-emerald-50",    text: "text-emerald-600",dot: "bg-emerald-400"},
  royal:   { bg: "bg-[#EBF3FF]",     text: "text-[#1B3A6B]",  dot: "bg-[#4A7FD4]" },
  gold:    { bg: "bg-[#FEF9EC]",     text: "text-[#92680A]",  dot: "bg-[#D4A017]" },
};

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

export default function EventsPage() {
  const [filter, setFilter] = useState<string>("All");

  const upcoming = useMemo(() =>
    EVENTS.filter((e) => e.status === "upcoming" && (filter === "All" || e.category === filter)), [filter]);
  const past = useMemo(() =>
    EVENTS.filter((e) => e.status === "past" && (filter === "All" || e.category === filter))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), [filter]);

  return (
    <div className="w-full min-h-screen" style={{ background: "var(--bg)" }}>
      <PageHero
        label="Leo Club of Pokhara Puspanjali"
        title="Our Events"
        subtitle="Explore our past achievements and upcoming initiatives making a difference in the community."
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-12 justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-200 ${
                filter === cat
                  ? "bg-[#1B3A6B] text-white border-[#1B3A6B] shadow-royal"
                  : "bg-white text-[#64748B] border-[#D6EAF8] hover:border-[#4A7FD4] hover:text-[#1B3A6B]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Upcoming cards */}
        {upcoming.length > 0 && (
          <div className="mb-16">
            <div className="divider-ornament mb-8">
              <span className="chip chip-blue whitespace-nowrap">Upcoming Events</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {upcoming.map((e) => {
                const c = ACCENT[e.color] ?? ACCENT.royal;
                return (
                  <div key={e.id} className="card card-hover p-0 flex flex-col">
                    <div className={`h-1.5 w-full ${c.dot} rounded-t-xl`} />
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider ${c.bg} ${c.text}`}>
                          {e.category}
                        </span>
                        <span className="text-[10px] font-bold px-3 py-1.5 rounded-full bg-amber-50 text-amber-600 uppercase tracking-wider">
                          Upcoming
                        </span>
                      </div>
                      <h3 className="font-display text-base font-bold text-[#1E293B] mb-2 leading-snug">{e.title}</h3>
                      <p className="text-[#64748B] text-sm leading-relaxed flex-1 mb-4">{e.description}</p>
                      <div className="space-y-2 text-xs text-[#64748B] border-t border-[#D6EAF8] pt-3">
                        <div className="flex items-center gap-2">
                          <Calendar size={13} className="text-[#4A7FD4] flex-shrink-0" />
                          {fmt(e.date)}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={13} className="text-[#4A7FD4] flex-shrink-0" />
                          {e.location}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Past timeline */}
        {past.length > 0 && (
          <div className="mb-16">
            <div className="divider-ornament mb-10">
              <span className="chip chip-sky whitespace-nowrap">Past Events</span>
            </div>
            <div className="max-w-3xl mx-auto">
              {past.map((e, i) => {
                const c = ACCENT[e.color] ?? ACCENT.royal;
                return (
                  <div key={e.id} className="flex gap-5 sm:gap-8">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className={`w-3 h-3 rounded-full mt-1 ring-4 ring-white ring-offset-1 ${c.dot}`} />
                      {i < past.length - 1 && <div className="w-px flex-1 bg-[#D6EAF8] mt-1" />}
                    </div>
                    <div className={`pb-10 flex-1 ${i === past.length - 1 ? "pb-0" : ""}`}>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#64748B]">{fmt(e.date)}</span>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${c.bg} ${c.text}`}>{e.category}</span>
                      </div>
                      <h3 className="font-display text-base font-bold text-[#1E293B] mb-1.5 leading-snug">{e.title}</h3>
                      <p className="text-[#64748B] text-sm leading-relaxed mb-2">{e.description}</p>
                      <p className="text-xs text-[#94A3B8] flex items-center gap-1.5">
                        <MapPin size={11} className="text-[#4A7FD4]" />
                        {e.location}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {upcoming.length === 0 && past.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-[#EBF3FF] flex items-center justify-center mx-auto mb-4">
              <Calendar size={28} className="text-[#1B3A6B]" strokeWidth={1.5} />
            </div>
            <h3 className="font-display font-bold text-[#1E293B] mb-2">No events found</h3>
            <p className="text-[#64748B] text-sm">No events found for this category.</p>
          </div>
        )}

        {/* CTA */}
        <div className="bg-hero-gradient rounded-3xl px-8 py-14 text-center relative overflow-hidden mt-8"
          style={{ boxShadow: "0 8px 40px rgba(27,58,107,0.35)" }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(135,206,235,0.15) 0%, transparent 70%)" }} />
          <div className="relative z-10">
            <span className="chip mb-5" style={{ background: "rgba(135,206,235,0.15)", border: "1px solid rgba(135,206,235,0.3)", color: "#87CEEB" }}>
              Get Involved
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3 mt-4">Want to Participate?</h3>
            <p className="text-white/55 text-sm mb-8 max-w-sm mx-auto leading-relaxed">
              Join us for our upcoming events and be part of the change.
            </p>
            <Link href="/contact" className="btn btn-white">
              Contact Us
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
