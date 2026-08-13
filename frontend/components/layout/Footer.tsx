import React from "react";
import Link  from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { NAV_LINKS, SOCIAL_LINKS, CONTACT_INFO } from "@/lib/constants";

const year = new Date().getFullYear();

const CONTACT_ITEMS = [
  { Icon: MapPin, text: CONTACT_INFO.address },
  { Icon: Phone,  text: CONTACT_INFO.phone   },
  { Icon: Mail,   text: CONTACT_INFO.email   },
];

export default function Footer() {
  return (
    <footer>
      {/* ── CTA Banner ── */}
      <div className="bg-hero-gradient relative overflow-hidden py-20 px-6">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(74,127,212,0.3) 0%, transparent 70%)" }} />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(135,206,235,0.2) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-[11px] font-bold uppercase tracking-[0.12em]"
            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.22)", color: "#87CEEB" }}>
            Get Involved
          </div>
          <h3 className="font-display text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
            Ready to Make a Difference?
          </h3>
          <p className="text-white/55 text-[15px] mb-8 max-w-md mx-auto leading-relaxed">
            Join Leo Club of Pokhara Puspanjali and start your journey of leadership and service.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/contact" className="btn btn-white">
              Join Our Club
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
            <Link href="/about" className="btn btn-outline-white">
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main ── */}
      <div className="bg-[#0D2146] py-14 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <Image src="/images/logo.png" alt="Leo Club" width={46} height={46} className="rounded-full"
                style={{ border: "2px solid rgba(135,206,235,0.3)" }} />
              <div>
                <div className="text-sky-200/60 text-[9px] uppercase tracking-[0.2em] font-bold">Leo Club</div>
                <div className="font-display font-black text-white text-[14px]">
                  Pokhara <span className="text-[#D4A017]">Puspanjali</span>
                </div>
                <div className="text-white/25 text-[9px] uppercase tracking-[0.15em] mt-0.5">Est. 2022</div>
              </div>
            </div>
            <p className="text-white/35 text-sm leading-relaxed mb-6 max-w-xs">
              Empowering youth through leadership, service, and opportunity. Building a brighter Nepal, one community at a time.
            </p>
            <div className="flex gap-2">
              {[
                { href: SOCIAL_LINKS.facebook, label: "Facebook", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
                { href: SOCIAL_LINKS.instagram, label: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-white/[0.08] border border-white/10 text-white/50 flex items-center justify-center transition-all hover:bg-white/[0.15] hover:text-white hover:-translate-y-0.5">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map(({ name, path }) => (
                <li key={path}>
                  <Link href={path} className="text-sm text-white/35 hover:text-white transition-colors flex items-center gap-2 group">
                    <ArrowRight size={12} className="text-sky-400/50 group-hover:text-sky-300 transition-colors" />
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-5">Contact</h4>
            <ul className="space-y-4">
              {CONTACT_ITEMS.map(({ Icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-sm text-white/35">
                  <Icon size={15} className="text-sky-400/60 flex-shrink-0 mt-0.5" strokeWidth={1.8} />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom ── */}
      <div className="bg-[#081830] py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/20">
          <span>© {year} Leo Club of Pokhara Puspanjali. All rights reserved.</span>
          <span>Made with love in Pokhara, Nepal</span>
        </div>
      </div>
    </footer>
  );
}
