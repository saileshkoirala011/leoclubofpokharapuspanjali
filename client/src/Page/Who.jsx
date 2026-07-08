import React, { useEffect, useRef } from "react";
import about from "../assets/image.jpeg";
import { SOCIAL_LINKS } from "../utils/constants";

const stats = [
  { value: "50+", label: "Members",      color: "text-blue-600"   },
  { value: "30+", label: "Projects",     color: "text-emerald-600" },
  { value: "5+",  label: "Years Active", color: "text-violet-600"  },
];

const pillars = [
  { icon: "🤝", label: "Service"    },
  { icon: "🌱", label: "Growth"     },
  { icon: "💡", label: "Innovation" },
  { icon: "🌍", label: "Impact"     },
];

function useFadeUp(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
}

export default function Who() {
  const leftRef  = useRef(null);
  const rightRef = useRef(null);
  useFadeUp(leftRef);
  useFadeUp(rightRef);

  return (
    <section id="about" className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 grid md:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* ── Image column ── */}
        <div ref={leftRef} className="fade-up relative">
          {/* Background shapes */}
          <div className="absolute -top-8 -left-8 w-72 h-72 bg-blue-50 rounded-[2rem] -z-10" />
          <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-[2rem] -z-10" />

          {/* Main image */}
          <div className="relative rounded-[1.5rem] overflow-hidden shadow-2xl shadow-blue-900/10">
            <img
              src={about}
              alt="Leo Club Members"
              className="w-full h-[420px] object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent" />
          </div>

          {/* Floating pillars card */}
          <div className="absolute -bottom-6 left-6 right-6 glass rounded-2xl px-5 py-4 shadow-xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-3">Our Pillars</p>
            <div className="grid grid-cols-4 gap-2">
              {pillars.map(({ icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <span className="text-xl">{icon}</span>
                  <span className="text-[10px] font-semibold text-gray-600">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Text column ── */}
        <div ref={rightRef} className="fade-up pt-10 md:pt-0" style={{ transitionDelay: "0.15s" }}>
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Who We Are
          </span>

          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-[1.1] tracking-tight mb-5">
            Youth-Driven{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              Community
            </span>{" "}
            Service
          </h2>

          <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mb-7" />

          <p className="text-gray-500 leading-relaxed mb-4 text-[15px]">
            The Leo Club of Pokhara Puspanjali is a dedicated youth organization operating under the International Lions Club. Located in the beautiful city of Pokhara, Nepal, we nurture young leaders and foster community service.
          </p>
          <p className="text-gray-500 leading-relaxed mb-10 text-[15px]">
            As a non-profit, we empower youth to develop leadership skills, engage in meaningful community projects, and make a lasting positive impact across Nepal.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {stats.map(({ value, label, color }) => (
              <div key={label} className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
                <p className={`text-3xl font-black ${color} leading-none`}>{value}</p>
                <p className="text-xs text-gray-500 font-medium mt-1.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
              className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.29 20v-7.752h-2.603V9.349h2.603V7.124c0-2.577 1.574-3.974 3.864-3.974 1.099 0 2.042.082 2.313.118v2.685h-1.588c-1.246 0-1.487.592-1.487 1.46v1.912h2.973l-.386 2.899h-2.587V20" />
              </svg>
            </a>
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-orange-400 hover:opacity-90 text-white flex items-center justify-center transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 1.802c2.67 0 2.987.01 4.042.059 2.71.123 3.851 1.244 3.974 3.974.049 1.054.059 1.37.059 4.041 0 2.67-.01 2.987-.059 4.041-.123 2.729-1.268 3.859-3.977 3.977-1.053.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-2.717-.119-3.851-1.244-3.977-3.942-.059-1.069-.069-1.386-.069-4.041 0-2.67.01-2.986.069-4.04.129-2.729 1.261-3.864 3.975-3.977 1.052-.048 1.368-.058 4.041-.058zm0 1.822c-2.629 0-2.927.01-3.96.058-1.482.069-2.633 1.182-2.702 2.702-.048 1.032-.058 1.331-.058 3.96 0 2.629.01 2.927.058 3.96.069 1.528 1.228 2.653 2.702 2.702 1.033.048 1.331.058 3.96.058 2.629 0 2.927-.01 3.96-.058 1.488-.049 2.646-1.156 2.724-2.702.048-1.033.058-1.331.058-3.96 0-2.629-.01-2.927-.058-3.96-.079-1.528-1.235-2.633-2.703-2.702-1.034-.048-1.332-.058-3.96-.058z" />
                <path d="M10 4.865a5.135 5.135 0 1 0 0 10.27 5.135 5.135 0 0 0 0-10.27zm0 8.468a3.333 3.333 0 1 1 0-6.666 3.333 3.333 0 0 1 0 6.666z" />
              </svg>
            </a>
            <span className="text-xs text-gray-400 ml-1">Follow us</span>
          </div>
        </div>
      </div>
    </section>
  );
}
