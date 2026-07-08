import React, { useState, useEffect, useCallback } from "react";
import { GALLERY_IMAGES } from "../utils/constants";

const PageBanner = ({ title, subtitle }) => (
  <div className="relative bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 py-28 px-5 text-center overflow-hidden">
    <div className="absolute -top-16 -left-16 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute -bottom-12 -right-12 w-56 h-56 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
    <div className="relative z-10">
      <span className="inline-block bg-white/10 text-white/90 text-xs font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full mb-5 border border-white/15">
        Leo Club of Pokhara Puspanjali
      </span>
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">{title}</h1>
      <p className="text-blue-100/80 text-lg max-w-xl mx-auto font-light">{subtitle}</p>
    </div>
  </div>
);

const Gallery = () => {
  const [lightbox, setLightbox] = useState(null);

  const close = useCallback(() => setLightbox(null), []);
  const prev  = useCallback(() => setLightbox((i) => (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length), []);
  const next  = useCallback(() => setLightbox((i) => (i + 1) % GALLERY_IMAGES.length), []);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e) => {
      if (e.key === "Escape")     close();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, prev, next]);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <PageBanner
        title="Gallery"
        subtitle="Moments captured from our events, meetings, and community service projects."
      />

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <button
              key={i}
              onClick={() => setLightbox(i)}
              className="group relative overflow-hidden rounded-2xl bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              aria-label={`View photo ${i + 1}`}
            >
              <img
                src={img}
                alt={`Gallery ${i + 1}`}
                loading="lazy"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/30 transition-colors duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/0 group-hover:bg-white/20 flex items-center justify-center scale-75 group-hover:scale-100 transition-all duration-300">
                  <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
                  </svg>
                </div>
              </div>
              {/* Photo number */}
              <div className="absolute bottom-3 left-3 text-white/0 group-hover:text-white/70 text-xs font-medium transition-colors duration-300">
                {i + 1} / {GALLERY_IMAGES.length}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-4"
          onClick={close}
        >
          <img
            src={GALLERY_IMAGES[lightbox]}
            alt={`Gallery ${lightbox + 1}`}
            className="max-h-[85vh] max-w-[88vw] rounded-xl shadow-2xl object-contain select-none"
            onClick={(e) => e.stopPropagation()}
            draggable={false}
          />

          {/* Close */}
          <button
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Counter + dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
            <div className="flex gap-1.5">
              {GALLERY_IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                  className={`rounded-full transition-all duration-300 ${i === lightbox ? "w-6 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"}`}
                />
              ))}
            </div>
            <span className="text-white/50 text-xs">{lightbox + 1} / {GALLERY_IMAGES.length}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
