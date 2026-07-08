import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { NAV_LINKS, JOIN_FORM_URL } from "../utils/constants";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white/95 backdrop-blur-md shadow-lg fixed top-0 left-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          <Link to="/" className="transition-transform hover:scale-105">
            <img src={logo} alt="Leo Club Logo" className="h-14 drop-shadow-sm" />
          </Link>
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-lg font-medium">
          {NAV_LINKS.map((item) => (
            <li key={item.path}>
              <Link className="text-gray-700 hover:text-blue-600 transition-colors duration-300" to={item.path}>
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to={JOIN_FORM_URL}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all duration-300 font-semibold"
            >
              JOIN NOW
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="w-6 h-1 bg-black"></span>
          <span className="w-6 h-1 bg-black"></span>
          <span className="w-6 h-1 bg-black"></span>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md w-full shadow-lg border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
          <ul className="flex flex-col text-center py-4 text-lg font-medium gap-4">
            {NAV_LINKS.map((item) => (
              <li key={item.path}>
                <Link to={item.path} className="text-gray-700 hover:text-blue-600 transition-colors duration-300" onClick={() => setIsOpen(false)}>
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to={JOIN_FORM_URL}
                className="inline-block mx-auto px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all duration-300 font-semibold"
                onClick={() => setIsOpen(false)}
              >
                JOIN NOW
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
