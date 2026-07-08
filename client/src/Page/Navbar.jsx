import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { NAV_LINKS, JOIN_FORM_URL } from "../utils/constants";

export default function Navbar() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname }            = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const isHome    = pathname === "/";
  const isDark    = isHome && !scrolled;
  const isScrolled = scrolled || !isHome;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl shadow-sm shadow-gray-200/50 border-b border-gray-100/80"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-10 h-[72px] flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
          <img
            src={logo}
            alt="Leo Club"
            className={`h-10 transition-all duration-300 ${isDark ? "brightness-0 invert" : ""}`}
          />
          <span className={`hidden sm:block text-sm font-bold tracking-tight transition-colors ${isDark ? "text-white/90" : "text-gray-900"}`}>
            LCP <span className="text-blue-600">Puspanjali</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map(({ name, path }) => {
            const active = pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                  active
                    ? isDark ? "text-white" : "text-blue-600"
                    : isDark
                    ? "text-white/70 hover:text-white hover:bg-white/10"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/80"
                }`}
              >
                {name}
                {active && (
                  <span className={`absolute bottom-1 left-4 right-4 h-0.5 rounded-full ${isDark ? "bg-white" : "bg-blue-600"}`} />
                )}
              </Link>
            );
          })}

          <Link
            to={JOIN_FORM_URL}
            className="ml-3 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all duration-200 active:scale-95"
          >
            Join Now
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className={`md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-xl transition-colors ${
            isScrolled ? "hover:bg-gray-100" : "hover:bg-white/10"
          }`}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`block h-[2px] rounded-full transition-all duration-300 ${isScrolled ? "bg-gray-800" : "bg-white"} ${
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
        <div className="bg-white/95 backdrop-blur-xl border-t border-gray-100 px-5 py-4 flex flex-col gap-1 shadow-xl">
          {NAV_LINKS.map(({ name, path }) => (
            <Link
              key={path}
              to={path}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                pathname === path
                  ? "text-blue-600 bg-blue-50 font-semibold"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {name}
            </Link>
          ))}
          <Link
            to={JOIN_FORM_URL}
            className="mt-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold text-center transition-colors shadow-md"
          >
            Join Now
          </Link>
        </div>
      </div>
    </header>
  );
}
