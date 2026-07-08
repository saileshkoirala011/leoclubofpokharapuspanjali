import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { NAV_LINKS, SOCIAL_LINKS, CONTACT_INFO } from "../utils/constants";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-[#050d1a] text-gray-400 overflow-hidden relative">

      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      {/* CTA Banner */}
      <div className="relative py-16 px-6 text-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-blue-900/10" />
        <div className="relative z-10 max-w-xl mx-auto">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.15em] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full mb-5">
            Get Involved
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 leading-tight">
            Ready to Make a Difference?
          </h3>
          <p className="text-white/40 text-sm mb-7 leading-relaxed">
            Join Leo Club of Pokhara Puspanjali and start your journey of leadership and service.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-900/40 text-sm"
          >
            Join Our Club
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-5">
            <img src={logo} alt="Leo Club" className="h-9 brightness-0 invert opacity-70" />
            <span className="text-white font-bold text-base">
              LCP <span className="text-blue-400">Puspanjali</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed text-white/30 mb-6 max-w-xs">
            Empowering youth through leadership, service, and opportunity. Building a brighter future for Pokhara and beyond.
          </p>
          <div className="flex gap-2">
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-blue-600 border border-white/8 hover:border-blue-600 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5">
              <svg className="w-4 h-4 text-white/60 hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.29 20v-7.752h-2.603V9.349h2.603V7.124c0-2.577 1.574-3.974 3.864-3.974 1.099 0 2.042.082 2.313.118v2.685h-1.588c-1.246 0-1.487.592-1.487 1.46v1.912h2.973l-.386 2.899h-2.587V20" />
              </svg>
            </a>
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-gradient-to-br hover:from-pink-500 hover:to-orange-400 border border-white/8 hover:border-transparent flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5">
              <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 1.802c2.67 0 2.987.01 4.042.059 2.71.123 3.851 1.244 3.974 3.974.049 1.054.059 1.37.059 4.041 0 2.67-.01 2.987-.059 4.041-.123 2.729-1.268 3.859-3.977 3.977-1.053.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-2.717-.119-3.851-1.244-3.977-3.942-.059-1.069-.069-1.386-.069-4.041 0-2.67.01-2.986.069-4.04.129-2.729 1.261-3.864 3.975-3.977 1.052-.048 1.368-.058 4.041-.058zm0 1.822c-2.629 0-2.927.01-3.96.058-1.482.069-2.633 1.182-2.702 2.702-.048 1.032-.058 1.331-.058 3.96 0 2.629.01 2.927.058 3.96.069 1.528 1.228 2.653 2.702 2.702 1.033.048 1.331.058 3.96.058 2.629 0 2.927-.01 3.96-.058 1.488-.049 2.646-1.156 2.724-2.702.048-1.033.058-1.331.058-3.96 0-2.629-.01-2.927-.058-3.96-.079-1.528-1.235-2.633-2.703-2.702-1.034-.048-1.332-.058-3.96-.058z" />
                <path d="M10 4.865a5.135 5.135 0 1 0 0 10.27 5.135 5.135 0 0 0 0-10.27zm0 8.468a3.333 3.333 0 1 1 0-6.666 3.333 3.333 0 0 1 0 6.666z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white/80 text-xs font-bold uppercase tracking-[0.15em] mb-5">Quick Links</h4>
          <ul className="space-y-3">
            {NAV_LINKS.map(({ name, path }) => (
              <li key={path}>
                <Link to={path} className="text-sm text-white/30 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-white/15 group-hover:bg-blue-500 transition-colors" />
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white/80 text-xs font-bold uppercase tracking-[0.15em] mb-5">Contact</h4>
          <ul className="space-y-4">
            {[
              { d: "M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z", text: CONTACT_INFO.address },
              { d: "M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.042 11.042 0 005.516 5.516l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z", text: CONTACT_INFO.phone },
              { d: "M2.94 6.412A2 2 0 002 8.414V16a2 2 0 002 2h12a2 2 0 002-2V8.414a2 2 0 00-.94-1.679l-7.017-4.154a2 2 0 00-2.126 0L2.94 6.412z", text: CONTACT_INFO.email },
            ].map(({ d, text }) => (
              <li key={text} className="flex items-start gap-3 text-sm text-white/30">
                <svg className="w-4 h-4 mt-0.5 text-blue-500/70 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d={d} />
                </svg>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/20">
          <span>© {year} Leo Club of Pokhara Puspanjali. All rights reserved.</span>
          <span>Made with ❤️ in Pokhara, Nepal</span>
        </div>
      </div>
    </footer>
  );
}
