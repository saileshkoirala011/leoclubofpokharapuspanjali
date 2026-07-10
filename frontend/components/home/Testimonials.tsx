'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Aarav Sharma',
    role: 'Community Member',
    content: 'The Leo Club has transformed our neighborhood. Their dedication to service and youth empowerment is truly inspiring. I\'ve seen firsthand the positive impact they\'ve made.',
    rating: 5,
    image: '/images/image.jpeg',
  },
  {
    id: 2,
    name: 'Priya Thapa',
    role: 'Volunteer',
    content: 'Being part of this club has been life-changing. The leadership training and community service opportunities have helped me grow both personally and professionally.',
    rating: 5,
    image: '/images/image.jpeg',
  },
  {
    id: 3,
    name: 'Rajesh Gurung',
    role: 'Local Business Owner',
    content: 'I\'ve supported the Leo Club for years because they consistently deliver results. Their transparency and commitment to making a difference sets them apart.',
    rating: 5,
    image: '/images/image.jpeg',
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section ref={sectionRef} className="py-24 overflow-hidden" style={{ background: 'linear-gradient(180deg, #DCF0FB 0%, #EEF8FD 100%)' }}>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <span className="inline-block px-4 py-2 bg-royal/10 text-royal rounded-full text-sm font-semibold mb-4">
              Testimonials
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] mb-4"
            style={{ color: '#0d2657' }}
          >
            What People
            <span className="crimson-text"> Say</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-royal/60 text-lg max-w-2xl mx-auto"
          >
            Hear from our community members, volunteers, and supporters
          </motion.p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50
 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 sm:p-12 shadow-card-hover"
          >
            {/* Quote Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-royal/10 flex items-center justify-center">
                <Quote size={32} className="text-royal" />
              </div>
            </div>

            {/* Content */}
            <p className="text-royal/80 text-lg sm:text-xl leading-relaxed text-center mb-8 font-medium">
              "{TESTIMONIALS[currentIndex].content}"
            </p>

            {/* Author */}
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-royal/10">
                <div className="w-full h-full flex items-center justify-center text-royal font-bold text-xl">
                  {TESTIMONIALS[currentIndex].name.charAt(0)}
                </div>
              </div>
              <div className="text-left">
                <h4 className="font-display font-bold text-lg" style={{ color: '#0d2657' }}>
                  {TESTIMONIALS[currentIndex].name}
                </h4>
                <p className="text-royal/60 text-sm">{TESTIMONIALS[currentIndex].role}</p>
                <div className="flex gap-1 mt-1">
                  {[...Array(TESTIMONIALS[currentIndex].rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-lions text-lions" />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-white shadow-medium flex items-center justify-center hover:shadow-large transition-all duration-200 hover:scale-110"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} className="text-royal" />
            </button>
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'w-8 bg-royal' : 'bg-royal/30 hover:bg-royal/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-white shadow-medium flex items-center justify-center hover:shadow-large transition-all duration-200 hover:scale-110"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} className="text-royal" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
