import React, { useState } from "react";
import { Link } from "react-router-dom";

const EVENTS = [
  {
    id: 1,
    title: "Blood Donation Drive",
    date: "2024-03-15",
    category: "Health",
    status: "past",
    description: "Organized a community blood donation camp in collaboration with local hospitals, collecting over 50 units of blood.",
    location: "Pokhara, Nepal",
    color: "red",
  },
  {
    id: 2,
    title: "Tree Plantation Campaign",
    date: "2024-06-05",
    category: "Environment",
    status: "past",
    description: "Planted 200+ trees across Pokhara as part of World Environment Day celebrations.",
    location: "Phewa Lake Area, Pokhara",
    color: "green",
  },
  {
    id: 3,
    title: "Youth Leadership Workshop",
    date: "2024-08-20",
    category: "Education",
    status: "past",
    description: "A two-day workshop on leadership, communication, and community service for 60+ youth participants.",
    location: "Pokhara Metropolitan City Hall",
    color: "blue",
  },
  {
    id: 4,
    title: "Health Awareness Camp",
    date: "2025-02-10",
    category: "Health",
    status: "upcoming",
    description: "Free health checkup and awareness program focusing on diabetes and hypertension prevention.",
    location: "Pokhara, Nepal",
    color: "red",
  },
  {
    id: 5,
    title: "Annual Leo Day Celebration",
    date: "2025-10-02",
    category: "Club",
    status: "upcoming",
    description: "Celebrating Leo Day with community service activities, cultural programs, and award ceremonies.",
    location: "Pokhara, Nepal",
    color: "blue",
  },
];

const COLOR_MAP = {
  red:   { bg: "bg-red-50",   text: "text-red-600",   dot: "bg-red-500"   },
  green: { bg: "bg-green-50", text: "text-green-600", dot: "bg-green-500" },
  blue:  { bg: "bg-blue-50",  text: "text-blue-600",  dot: "bg-blue-500"  },
};

const CATEGORIES = ["All", "Health", "Environment", "Education", "Club"];

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

const EventCard = ({ event }) => {
  const c = COLOR_MAP[event.color] ?? COLOR_MAP.blue;
  const isUpcoming = event.status === "upcoming";
  return (
    <div className="bg-white rounded-2xl border border-gray-100 hover:border-blue-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col">
      <div className={`h-1.5 w-full ${c.dot}`} />
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.bg} ${c.text}`}>
            {event.category}
          </span>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
            isUpcoming ? "bg-amber-50 text-amber-600" : "bg-gray-100 text-gray-500"
          }`}>
            {isUpcoming ? "Upcoming" : "Completed"}
          </span>
        </div>
        <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug">{event.title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">{event.description}</p>
        <div className="space-y-1.5 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            {formatDate(event.date)}
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {event.location}
          </div>
        </div>
      </div>
    </div>
  );
};

const Events = () => {
  const [filter, setFilter] = useState("All");
  const [tab, setTab]       = useState("all");

  const visible = EVENTS.filter((e) => {
    const catMatch = filter === "All" || e.category === filter;
    const tabMatch = tab === "all" || e.status === tab;
    return catMatch && tabMatch;
  });

  return (
    <div className="w-full min-h-screen bg-gray-50/50">

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 py-24 px-5 text-center overflow-hidden">
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-56 h-56 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <span className="inline-block bg-white/10 text-white/90 text-xs font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full mb-5 border border-white/15">
            Leo Club of Pokhara Puspanjali
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Our Events</h1>
          <p className="text-blue-100/80 text-lg max-w-xl mx-auto font-light">
            Explore our past achievements and upcoming initiatives making a difference in the community.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">

        {/* Tabs + Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          {/* Status tabs */}
          <div className="flex bg-white border border-gray-200 rounded-xl p-1 gap-1 shadow-sm">
            {[["all", "All Events"], ["upcoming", "Upcoming"], ["past", "Past"]].map(([val, label]) => (
              <button
                key={val}
                onClick={() => setTab(val)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  tab === val ? "bg-blue-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  filter === cat
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-500 border-gray-200 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {visible.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map((e) => <EventCard key={e.id} event={e} />)}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">No events found for this filter.</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center bg-white rounded-3xl border border-gray-100 shadow-sm p-10">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Want to Participate?</h3>
          <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
            Join us for our upcoming events and be part of the change.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3 rounded-xl transition-all active:scale-95 shadow-md text-sm"
          >
            Get Involved →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Events;
