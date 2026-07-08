import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import President     from "../assets/Smitri-Karki.jpg";
import VicePresident from "../assets/pratikdhakal.jpg";
import Secretary     from "../assets/Sailesh.jpg";

const team = [
  { name: "LEO Smriti Karki",    role: "President",      image: President,     color: "from-blue-400 to-blue-600"    },
  { name: "LEO Pratik Dhakal",   role: "Vice-President", image: VicePresident, color: "from-violet-400 to-violet-600" },
  { name: "LEO Sailesh Koirala", role: "Secretary",      image: Secretary,     color: "from-emerald-400 to-emerald-600" },
];

export default function TeamSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(".team-card");
    if (!cards) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.15 }
    );
    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Our People
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-[1.1] tracking-tight mb-4">
            Meet the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              Leadership
            </span>
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-[15px] leading-relaxed">
            Dedicated young leaders committed to community service and personal growth.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-14">
          {team.map(({ name, role, image, color }, i) => (
            <div
              key={name}
              className="team-card fade-up group relative flex flex-col items-center text-center"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Image wrapper */}
              <div className="relative mb-5">
                {/* Gradient ring */}
                <div className={`absolute -inset-[3px] rounded-full bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="absolute -inset-[3px] rounded-full bg-gray-100" />
                <img
                  src={image}
                  alt={name}
                  className="relative w-32 h-32 rounded-full object-cover object-top ring-4 ring-white shadow-xl group-hover:scale-105 transition-transform duration-500"
                />
                {/* Online dot */}
                <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-400 rounded-full ring-2 ring-white" />
              </div>

              <h3 className="font-bold text-gray-900 text-[15px] leading-snug">{name}</h3>
              <span className={`inline-block mt-2 text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${color} text-white`}>
                {role}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/team"
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 text-sm"
          >
            View Full Team
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
