"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";

const today = new Date();
const deriveStatus = (d: string) => new Date(d) >= today ? "upcoming" : "past";

const RAW = [
  { id:1,  title:"Blood Donation Drive",         date:"2024-03-15", category:"Health",      description:"Organized a community blood donation camp collecting over 50 units of blood.", location:"Pokhara, Nepal",          color:"red"   },
  { id:2,  title:"Tree Plantation Campaign",      date:"2024-06-05", category:"Environment", description:"Planted 200+ trees across Pokhara as part of World Environment Day celebrations.", location:"Phewa Lake, Pokhara", color:"green" },
  { id:3,  title:"Youth Leadership Workshop",     date:"2024-08-20", category:"Education",   description:"A two-day workshop on leadership and community service for 60+ youth participants.", location:"Pokhara City Hall", color:"blue"  },
  { id:4,  title:"Health Awareness Camp",         date:"2025-02-10", category:"Health",      description:"Free health checkup and awareness program on diabetes and hypertension prevention.", location:"Pokhara, Nepal",     color:"red"   },
  { id:5,  title:"Annual Leo Day Celebration",    date:"2025-10-02", category:"Club",        description:"Celebrating Leo Day with community service activities, cultural programs, and award ceremonies.", location:"Pokhara, Nepal", color:"blue" },
  { id:6,  title:"Street Clean-Up Drive",         date:"2025-11-22", category:"Environment", description:"Citywide clean-up initiative engaging 100+ volunteers.", location:"Lakeside, Pokhara",          color:"green" },
  { id:7,  title:"Scholarship Distribution",      date:"2025-12-10", category:"Education",   description:"Awarded merit-based scholarships to 15 underprivileged students.", location:"Pokhara, Nepal",                color:"blue"  },
  { id:8,  title:"Winter Blanket Distribution",   date:"2026-01-18", category:"Club",        description:"Distributed blankets and warm clothing to 200+ families in need.", location:"Pokhara Metropolitan Area",      color:"blue"  },
  { id:9,  title:"Eye Care Camp",                 date:"2026-03-08", category:"Health",      description:"Free eye check-up and eyeglass distribution serving 300+ patients.", location:"Pokhara, Nepal",               color:"red"   },
  { id:10, title:"Environmental Awareness Walk",  date:"2026-06-05", category:"Environment", description:"Public awareness march on World Environment Day promoting sustainable living.", location:"Phewa Lake, Pokhara",   color:"green" },
  { id:11, title:"Digital Literacy Workshop",     date:"2026-08-15", category:"Education",   description:"Hands-on training on computing and internet safety for rural youth.", location:"Pokhara, Nepal",              color:"blue"  },
  { id:12, title:"Annual Leo Convention 2026",    date:"2026-10-01", category:"Club",        description:"Our flagship annual convention for networking, awards, and service planning.", location:"Hotel Barahi, Pokhara", color:"blue"  },
];

const EVENTS = RAW.map((e) => ({ ...e, status: deriveStatus(e.date) }));
const CATEGORIES = ["All", "Health", "Environment", "Education", "Club"] as const;
const ACCENT: Record<string,{bg:string;text:string;dot:string}> = {
  red:  { bg:"bg-red-50",   text:"text-red-600",   dot:"bg-red-400"   },
  green:{ bg:"bg-green-50", text:"text-green-600", dot:"bg-green-400" },
  blue: { bg:"bg-blue-50",  text:"text-blue-600",  dot:"bg-blue-400"  },
};
const fmt = (d: string) => new Date(d).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"});

export default function EventsPage() {
  const [filter, setFilter] = useState<string>("All");

  const upcoming = useMemo(() =>
    EVENTS.filter((e) => e.status === "upcoming" && (filter === "All" || e.category === filter)), [filter]);
  const past = useMemo(() =>
    EVENTS.filter((e) => e.status === "past" && (filter === "All" || e.category === filter))
      .sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()), [filter]);

  return (
    <div className="w-full min-h-screen" style={{ background: "#faf7f0" }}>
      <PageHero label="Leo Club of Pokhara Puspanjali" title="Our Events"
        subtitle="Explore our past achievements and upcoming initiatives making a difference in the community." />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-12 justify-center">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-200 ${
                filter === cat ? "bg-[#0a1628] text-[#c9a84c] border-[#c9a84c]/40 shadow-md"
                               : "bg-white text-gray-500 border-gray-200 hover:border-[#c9a84c]/40 hover:text-[#c9a84c]"}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Upcoming cards */}
        {upcoming.length > 0 && (
          <div className="mb-16">
            <div className="divider-ornament mb-8">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#c9a84c] whitespace-nowrap px-4">Upcoming Events</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {upcoming.map((e) => {
                const c = ACCENT[e.color] ?? ACCENT.blue;
                return (
                  <div key={e.id} className="card-gold rounded-2xl overflow-hidden bg-white flex flex-col">
                    <div className={`h-1 w-full ${c.dot}`} />
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${c.bg} ${c.text}`}>{e.category}</span>
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-600">Upcoming</span>
                      </div>
                      <h3 className="font-display text-base font-bold text-[#0a1628] mb-2 leading-snug">{e.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">{e.description}</p>
                      <div className="space-y-1.5 text-xs text-gray-400 border-t border-gray-100 pt-3">
                        <div className="flex items-center gap-2">
                          <svg className="w-3.5 h-3.5 text-[#c9a84c]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/></svg>
                          {fmt(e.date)}
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-3.5 h-3.5 text-[#c9a84c]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
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
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400 whitespace-nowrap px-4">Past Events</span>
            </div>
            <div className="max-w-3xl mx-auto">
              {past.map((e, i) => {
                const c = ACCENT[e.color] ?? ACCENT.blue;
                return (
                  <div key={e.id} className="flex gap-5 sm:gap-8">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className={`w-3 h-3 rounded-full mt-1 ring-4 ring-white ring-offset-1 ${c.dot}`} />
                      {i < past.length - 1 && <div className="w-px flex-1 bg-gray-200 mt-1" />}
                    </div>
                    <div className={`pb-10 flex-1 ${i === past.length - 1 ? "pb-0" : ""}`}>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{fmt(e.date)}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.bg} ${c.text}`}>{e.category}</span>
                      </div>
                      <h3 className="font-display text-base font-bold text-[#0a1628] mb-1 leading-snug">{e.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-1.5">{e.description}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1.5">
                        <svg className="w-3 h-3 text-[#c9a84c]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
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
          <div className="text-center py-20 text-gray-400"><div className="text-5xl mb-4">📅</div><p className="text-sm">No events found for this category.</p></div>
        )}

        {/* CTA */}
        <div className="bg-[#0a1628] rounded-3xl px-8 py-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.07)_0%,transparent_70%)]" />
          <div className="relative z-10">
            <h3 className="font-display text-2xl font-bold text-white mb-3">Want to Participate?</h3>
            <p className="text-white/45 text-sm mb-7 max-w-sm mx-auto">Join us for our upcoming events and be part of the change.</p>
            <Link href="/contact" className="btn-gold">Get Involved
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
