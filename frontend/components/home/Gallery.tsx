'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, Eye } from 'lucide-react';

const GALLERY_ITEMS = [
  { id: 1, src: '/images/image.jpeg', alt: 'Community Service Event', likes: 45, views: 230 },
  { id: 2, src: '/images/image.jpeg', alt: 'Blood Donation Drive', likes: 67, views: 345 },
  { id: 3, src: '/images/image.jpeg', alt: 'Tree Plantation', likes: 32, views: 189 },
  { id: 4, src: '/images/image.jpeg', alt: 'Health Camp', likes: 54, views: 412 },
  { id: 5, src: '/images/image.jpeg', alt: 'Leadership Workshop', likes: 41, views: 278 },
  { id: 6, src: '/images/image.jpeg', alt: 'School Visit', likes: 38, views: 256 },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>('.gallery-card');
    if (!cards) return;
    const obs = new IntersectionObserver((entries) =>
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 overflow-hidden bg-white">
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
              Our Gallery
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
            Capturing Our
            <span className="crimson-text"> Journey</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-royal/60 text-lg max-w-2xl mx-auto"
          >
            Moments of service, leadership, and community impact captured in time
          </motion.p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              className="gallery-card fade-up relative group overflow-hidden rounded-2xl cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                />
                
                {/* Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-royal/90 via-royal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ opacity: hoveredId === item.id ? 1 : 0 }}
                />
                
                {/* Content on hover */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-6 text-white"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ 
                    y: hoveredId === item.id ? 0 : 20,
                    opacity: hoveredId === item.id ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-display text-lg font-bold mb-2">{item.alt}</h3>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Heart size={16} className="text-crimson" />
                      {item.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye size={16} />
                      {item.views}
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button className="px-8 py-4 bg-royal text-white rounded-xl hover:bg-royal-mid transition-all duration-200 font-medium shadow-medium hover:shadow-large inline-flex items-center gap-2">
            View All Photos
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
