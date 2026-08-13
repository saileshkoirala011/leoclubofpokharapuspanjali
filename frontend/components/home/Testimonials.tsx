'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Aarav Sharma',
    role: 'Community Member',
    content: "The Leo Club has transformed our neighborhood. Their dedication to service and youth empowerment is truly inspiring. I've seen firsthand the positive impact they've made.",
    rating: 5,
    avatar: 'A',
    color: '#1B3A6B',
  },
  {
    id: 2,
    name: 'Priya Thapa',
    role: 'Volunteer',
    content: 'Being part of this club has been life-changing. The leadership training and community service opportunities have helped me grow both personally and professionally.',
    rating: 5,
    avatar: 'P',
    color: '#5BB8E8',
  },
  {
    id: 3,
    name: 'Rajesh Gurung',
    role: 'Local Business Owner',
    content: "I've supported the Leo Club for years because they consistently deliver results. Their transparency and commitment to making a difference sets them apart.",
    rating: 5,
    avatar: 'R',
    color: '#D4A017',
  },
];

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const t = TESTIMONIALS[idx];

  return (
    <section className="py-20 lg:py-28 overflow-hidden bg-mesh">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="chip chip-blue mb-5">Testimonials</span>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-[#1E293B] leading-[1.1]">
            What People{' '}
            <span style={{ background: "linear-gradient(135deg,#1B3A6B,#4A7FD4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Say
            </span>
          </h2>
        </div>

        {/* Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="card p-8 sm:p-12 relative"
            style={{ border: "1px solid #D6EAF8" }}
          >
            {/* Big quote */}
            <div
              className="absolute top-6 right-8 font-display text-7xl font-black leading-none select-none pointer-events-none"
              style={{ color: t.color, opacity: 0.08 }}
            >
              &rdquo;
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(t.rating)].map((_, i) => (
                <svg key={i} className="w-5 h-5" viewBox="0 0 20 20" fill="#D4A017">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              ))}
            </div>

            <p className="text-[#1E293B] text-xl sm:text-2xl font-medium leading-relaxed mb-10 text-balance">
              &ldquo;{t.content}&rdquo;
            </p>

            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-display text-xl font-black text-white flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}99)`, boxShadow: `0 4px 16px ${t.color}33` }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="font-display font-bold text-[#1E293B] text-[15px]">{t.name}</p>
                  <p className="text-[13px] text-[#64748B] font-medium">{t.role}</p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    aria-label={`Testimonial ${i + 1}`}
                    className="transition-all duration-300 rounded-full"
                    style={{
                      width: i === idx ? "2rem" : "0.5rem",
                      height: "0.5rem",
                      background: i === idx ? t.color : "#D6EAF8",
                    }}
                  />
                ))}
                <div className="flex gap-1.5 ml-3">
                  <button
                    onClick={() => setIdx(p => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                    aria-label="Previous"
                    className="w-9 h-9 rounded-full bg-[#F0F6FF] text-[#1B3A6B] flex items-center justify-center hover:bg-[#1B3A6B] hover:text-white transition-all"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setIdx(p => (p + 1) % TESTIMONIALS.length)}
                    aria-label="Next"
                    className="w-9 h-9 rounded-full bg-[#1B3A6B] text-white flex items-center justify-center hover:bg-[#0D2146] transition-all"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
