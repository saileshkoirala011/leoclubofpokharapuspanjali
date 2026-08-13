"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { NAV_LINKS, JOIN_FORM_URL } from "@/lib/constants";

export default function Navbar() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const isHome = pathname === "/";
  const solid  = scrolled || !isHome;

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      solid ? "bg-white/95 backdrop-blur-xl shadow-md border-b border-[#D6EAF8]" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-10 h-[72px] flex items-center justify-between gap-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
          <Image
            src="/images/logo.png"
            alt="Leo Club logo"
            width={42} height={42}
            className="rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
            style={{ boxShadow: "0 2px 12px rgba(27,58,107,0.18)" }}
          />
          <div className="hidden sm:flex flex-col leading-none gap-0.5">
            <span className={`text-[9px] font-bold tracking-[0.22em] uppercase transition-colors duration-300 ${solid ? "text-[#64748B]" : "text-white/60"}`}>
              Leo Club
            </span>
            <span className={`text-[13.5px] font-black font-display tracking-tight leading-none transition-colors duration-300 ${solid ? "text-[#1B3A6B]" : "text-white"}`}>
              Puspanjali
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map(({ name, path }) => {
            const active = pathname === path;
            return (
              <Link
                key={path}
                href={path}
                className={`relative px-4 py-2.5 text-[13.5px] font-semibold rounded-full transition-all duration-200 ${
                  active
                    ? "text-[#1B3A6B] bg-[#EBF3FF]"
                    : solid
                    ? "text-[#1E293B] hover:text-[#1B3A6B] hover:bg-[#F0F6FF]"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {name}
                {active && (
                  <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#1B3A6B]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Join CTA */}
        <div className="hidden md:block">
          <Link href={JOIN_FORM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
            Join Now
            <ArrowRight size={14} strokeWidth={2.5} />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(v => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className={`md:hidden flex items-center justify-center w-10 h-10 rounded-xl transition-colors ${
            solid ? "hover:bg-[#F0F6FF] text-[#1B3A6B]" : "hover:bg-white/10 text-white"
          }`}
        >
          {open ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${open ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"}`}>
        <nav className="bg-white/98 backdrop-blur-xl border-t border-[#D6EAF8] px-4 py-3 flex flex-col gap-1" aria-label="Mobile navigation">
          {NAV_LINKS.map(({ name, path }) => {
            const active = pathname === path;
            return (
              <Link
                key={path}
                href={path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 ${
                  active ? "bg-[#EBF3FF] text-[#1B3A6B]" : "text-[#1E293B] hover:bg-[#F8FAFC] hover:text-[#1B3A6B]"
                }`}
              >
                {active && <span className="w-1.5 h-1.5 rounded-full bg-[#1B3A6B] flex-shrink-0" />}
                {name}
              </Link>
            );
          })}
          <div className="pt-2 pb-1">
            <Link href={JOIN_FORM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full justify-center">
              Join Now
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
