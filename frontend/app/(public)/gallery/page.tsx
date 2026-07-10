"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import Image     from "next/image";
import PageHero  from "@/components/ui/PageHero";
import { GALLERY_IMAGES } from "@/lib/constants";

const LABELS = ["Community", "Environment", "Events", "Leadership", "Community", "Events"] as const;
const CATS   = ["All", "Community", "Environment", "Events", "Leadership"] as const;

const ITEMS = GALLERY_IMAGES.map((src, i) => ({
  src,
  label: LABELS[i % LABELS.length] as string,
  tall:  [true, false, false, true, false, true][i % 6],
}));

export default function GalleryPage() {
  const [cat,      setCat]      = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = useMemo(
    () => cat === "All" ? ITEMS : ITEMS.filter((it) => it.label === cat),
    [cat]
  );

  const close = useCallback(() => setLightbox(null), []);
  const prev  = useCallback(() => setLightbox((i) => i === null ? null : (i - 1 + filtered.length) % filtered.length), [filtered.length]);
  const next  = useCallback(() => setLightbox((i) => i === null ? null : (i + 1) % filtered.length),  [filtered.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape")     close();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [lightbox, close, prev, next]);

  return (
    <div className="w-full min-h-screen bg-white">
      <PageHero
        label="Leo Club of Pokhara Puspanjali"
        title="Gallery"
        subtitle="Moments captured from our events, meetings, and community service projects."
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {CATS.map((c) => (
            <button key={c} onClick={() => { setCat(c); setLightbox(null); }}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-200 ${
                cat === c
                  ? "bg-[#0a1628] text-[#c9a84c] border-[#c9a84c]/40 shadow-md"
                  : "bg-white text-gray-500 border-gray-200 hover:border-[#c9a84c]/40 hover:text-[#c9a84c]"
              }`}>
              {c}
            </button>
          ))}
        </div>

        {/* Masonry grid via CSS columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((item, i) => (
            <button key={`${item.src}-${i}`} onClick={() => setLightbox(i)}
              className="group relative overflow-hidden rounded-2xl bg-gray-100 w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2 break-inside-avoid block"
              aria-label={`View photo ${i + 1} — ${item.label}`}>
              <div className={`relative w-full ${item.tall ? "h-80" : "h-56"}`}>
                <Image src={item.src} alt={`${item.label} ${i + 1}`} fill loading="lazy"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" />
              </div>
              <div className="absolute inset-0 bg-[#0a1628]/0 group-hover:bg-[#0a1628]/50 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-11 h-11 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
                  </svg>
                </div>
              </div>
              <span className="absolute top-3 left-3 glass text-[10px] font-bold uppercase tracking-[0.15em] text-gray-700 px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400 text-sm">No photos in this category yet.</div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          role="dialog" aria-modal="true" aria-label="Image lightbox"
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={close}
        >
          <div className="relative max-h-[85vh] max-w-[88vw]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={filtered[lightbox].src}
              alt={`Gallery ${lightbox + 1}`}
              width={1200} height={800}
              className="max-h-[85vh] w-auto object-contain rounded-2xl shadow-2xl"
              priority
            />
          </div>

          <button onClick={close} aria-label="Close"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
            <div className="flex gap-1.5">
              {filtered.map((_, i) => (
                <button key={i} onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                  className={`rounded-full transition-all duration-300 ${i === lightbox ? "w-6 h-1.5 bg-[#c9a84c]" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"}`} />
              ))}
            </div>
            <span className="text-white/40 text-xs">{lightbox + 1} / {filtered.length}</span>
          </div>
        </div>
      )}
    </div>
  );
}
