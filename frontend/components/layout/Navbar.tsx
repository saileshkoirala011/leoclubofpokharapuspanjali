"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_LINKS, JOIN_FORM_URL } from "@/lib/constants";

export default function Navbar() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname                = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const isHome   = pathname === "/";
  const floating = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        !floating
          ? "bg-white/95 backdrop-blur-xl shadow-sky border-b border-sky-light/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-10 h-[72px] flex items-center justify-between gap-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
          <Image
            src="/images/logo.png"
            alt="Leo Club of Pokhara Puspanjali"
            width={44}
            height={44}
            className={`transition-all duration-300 rounded-full ${floating ? "ring-2 ring-white/40" : "ring-2 ring-sky/30"}`}
          />
          <span className="hidden sm:flex flex-col leading-none">
            <span className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors ${floating ? "text-white/90" : "text-royal/70"}`}>
              Leo Club
            </span>
            <span className={`text-[13px] font-black tracking-tight font-display transition-colors ${floating ? "text-white" : "text-royal-deep"}`}>
              Puspanjali
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className={`hidden md:flex items-center gap-0.5 rounded-full px-2 py-1.5 transition-all duration-300 ${
          floating
            ? "bg-white/10 border border-white/20 backdrop-blur-sm"
            : "bg-sky-ultra border border-sky/30"
        }`}>
          {NAV_LINKS.map(({ name, path }) => {
            const active = pathname === path;
            return (
              <Link
                key={path}
                href={path}
                className={`px-4 py-1.5 text-[13px] font-medium rounded-full transition-all duration-200 ${
                  active
                    ? "bg-royal text-white font-semibold shadow-royal"
                    : floating
                    ? "text-white/80 hover:text-white hover:bg-white/15"
                    : "text-royal/70 hover:text-royal hover:bg-sky-light/50"
                }`}
              >
                {name}
              </Link>
            );
          })}
        </nav>

        {/* Join CTA */}
        <div className="hidden md:block">
          <Link href={JOIN_FORM_URL} className="btn-primary text-[13px] py-2.5 px-5">
            Join Now
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className={`md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-xl transition-colors ${
            floating ? "hover:bg-white/15" : "hover:bg-sky-light/50"
          }`}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`block h-[2px] rounded-full transition-all duration-300 ${
                floating ? "bg-white" : "bg-royal"
              } ${
                open && i === 0 ? "w-5 rotate-45 translate-y-[7px]"
                : open && i === 1 ? "w-5 opacity-0 scale-x-0"
                : open && i === 2 ? "w-5 -rotate-45 -translate-y-[7px]"
                : i === 1 ? "w-3.5" : "w-5"
              }`}
            />
          ))}
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="bg-white border-t border-sky/30 shadow-sky px-5 pt-4 pb-6 flex flex-col gap-1.5">
          {NAV_LINKS.map(({ name, path }) => (
            <Link
              key={path}
              href={path}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                pathname === path
                  ? "text-white bg-royal font-semibold"
                  : "text-royal hover:bg-sky-ultra"
              }`}
            >
              {name}
            </Link>
          ))}
          <Link href={JOIN_FORM_URL} className="btn-primary mt-2 justify-center">
            Join Now
          </Link>
        </div>
      </div>
    </header>
  );
}
