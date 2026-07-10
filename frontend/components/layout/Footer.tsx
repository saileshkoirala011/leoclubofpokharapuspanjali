import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS, SOCIAL_LINKS, CONTACT_INFO } from "@/lib/constants";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="overflow-hidden relative" style={{
      background: "linear-gradient(180deg, #1a3a6b 0%, #0d2657 100%)"
    }}>
      {/* Sky-to-royal transition wave at top */}
      <div className="absolute top-0 left-0 right-0 h-12 pointer-events-none" style={{
        background: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 50'%3E%3Cpath d='M0,0 C360,50 1080,50 1440,0 L1440,0 L0,0 Z' fill='%23B8E4F7' opacity='0.3'/%3E%3C/svg%3E\")",
        backgroundSize: "100% 100%",
      }} />

      {/* ── CTA Banner ── */}
      <div className="relative pt-16 pb-14 px-6 text-center overflow-hidden border-b border-white/8">
        {/* Subtle crimson glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,16,46,0.08)_0%,transparent_70%)]" />
        {/* Lotus decorators */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 text-5xl opacity-15 select-none">🪷</div>
        <div className="absolute right-10 top-1/2 -translate-y-1/2 text-5xl opacity-15 select-none">🪷</div>

        <div className="relative z-10 max-w-xl mx-auto">
          <span className="section-pill-light mb-6">Get Involved</span>
          <h3 className="font-display text-3xl sm:text-4xl font-black text-white mb-4 leading-tight mt-4">
            Ready to Make a Difference?
          </h3>
          <p className="text-white/45 text-sm mb-8 leading-relaxed">
            Join Leo Club of Pokhara Puspanjali and start your journey of leadership and service.
          </p>
          <Link href="/contact" className="btn-gold">
            Join Our Club
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-5">
            <Image src="/images/logo.png" alt="Leo Club" width={48} height={48}
              className="rounded-full ring-2 ring-sky/30" />
            <div>
              <div className="text-sky-light text-[10px] uppercase tracking-[0.2em] font-bold">Leo Club</div>
              <div className="text-white font-black text-sm tracking-tight font-display">
                Pokhara <span className="text-lions">Puspanjali</span>
              </div>
              <div className="text-white/30 text-[9px] uppercase tracking-[0.15em] mt-0.5">Est. 2022</div>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-white/35 mb-6 max-w-xs">
            Empowering youth through leadership, service, and opportunity. Building a brighter Nepal, one community at a time.
          </p>
          <div className="flex gap-2">
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
              className="w-9 h-9 rounded-xl bg-white/8 hover:bg-[#1877F2] border border-white/10 flex items-center justify-center transition-all hover:-translate-y-0.5">
              <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.29 20v-7.752h-2.603V9.349h2.603V7.124c0-2.577 1.574-3.974 3.864-3.974 1.099 0 2.042.082 2.313.118v2.685h-1.588c-1.246 0-1.487.592-1.487 1.46v1.912h2.973l-.386 2.899h-2.587V20" />
              </svg>
            </a>
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="w-9 h-9 rounded-xl bg-white/8 hover:bg-gradient-to-br hover:from-pink-500 hover:to-orange-400 border border-white/10 flex items-center justify-center transition-all hover:-translate-y-0.5">
              <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 1.802c2.67 0 2.987.01 4.042.059 2.71.123 3.851 1.244 3.974 3.974.049 1.054.059 1.37.059 4.041 0 2.67-.01 2.987-.059 4.041-.123 2.729-1.268 3.859-3.977 3.977-1.053.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-2.717-.119-3.851-1.244-3.977-3.942-.059-1.069-.069-1.386-.069-4.041 0-2.67.01-2.986.069-4.04.129-2.729 1.261-3.864 3.975-3.977 1.052-.048 1.368-.058 4.041-.058zm0 1.822c-2.629 0-2.927.01-3.96.058-1.482.069-2.633 1.182-2.702 2.702-.048 1.032-.058 1.331-.058 3.96 0 2.629.01 2.927.058 3.96.069 1.528 1.228 2.653 2.702 2.702 1.033.048 1.331.058 3.96.058 2.629 0 2.927-.01 3.96-.058 1.488-.049 2.646-1.156 2.724-2.702.048-1.033.058-1.331.058-3.96 0-2.629-.01-2.927-.058-3.96-.079-1.528-1.235-2.633-2.703-2.702-1.034-.048-1.332-.058-3.96-.058z"/>
                <path d="M10 4.865a5.135 5.135 0 1 0 0 10.27 5.135 5.135 0 0 0 0-10.27zm0 8.468a3.333 3.333 0 1 1 0-6.666 3.333 3.333 0 0 1 0 6.666z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sky-light text-[11px] font-bold uppercase tracking-[0.18em] mb-5">Quick Links</h4>
          <ul className="space-y-3">
            {NAV_LINKS.map(({ name, path }) => (
              <li key={path}>
                <Link href={path} className="text-sm text-white/35 hover:text-sky-light transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-white/15 group-hover:bg-sky transition-colors flex-shrink-0" />
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sky-light text-[11px] font-bold uppercase tracking-[0.18em] mb-5">Contact</h4>
          <ul className="space-y-4">
            {[
              { d: "M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z", text: CONTACT_INFO.address },
              { d: "M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.042 11.042 0 005.516 5.516l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z", text: CONTACT_INFO.phone },
              { d: "M2.94 6.412A2 2 0 002 8.414V16a2 2 0 002 2h12a2 2 0 002-2V8.414a2 2 0 00-.94-1.679l-7.017-4.154a2 2 0 00-2.126 0L2.94 6.412z", text: CONTACT_INFO.email },
            ].map(({ d, text }) => (
              <li key={text} className="flex items-start gap-3 text-sm text-white/35">
                <svg className="w-4 h-4 mt-0.5 text-sky flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d={d} />
                </svg>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: "1px solid rgba(135,206,235,0.1)" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/20">
          <span>© {year} Leo Club of Pokhara Puspanjali. All rights reserved.</span>
          <span>Made with ❤️ in Pokhara, Nepal 🇳🇵</span>
        </div>
      </div>
    </footer>
  );
}
