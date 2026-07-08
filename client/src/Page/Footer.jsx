import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { NAV_LINKS, SOCIAL_LINKS, CONTACT_INFO } from '../utils/constants';
import SocialLinks from '../Components/ui/SocialLinks';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-300 mt-0">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">

        {/* About Section */}
        <div>
          <div className="flex items-center mb-4 bg-gray-800 bg-opacity-50">
            <img src={logo} alt="Leo Logo" className="h-10 mr-2" />
            <h3 className="text-xl font-bold text-white">
              LCP<span className="text-blue-400"> Puspanjali</span>
            </h3>
          </div>

          <p className="text-sm text-gray-400 leading-relaxed">
   Discover what you're capable of with the Leo Club of Pokhara Puspanjali. 
   Here, you'll learn, grow, and make meaningful connections while contributing
    to something bigger than yourself. If you're ready to build your confidence, 
    develop real leadership skills, and take on opportunities that can shape your
     future, we'd 
   love to have you with us. Start your journey today—your impact begins here.
          </p>

          <div className="mt-4">
            <SocialLinks variant="dark" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-5 ">Quick Links</h4>
          <ul className="space-y-3 text-sm text-gray-400 items-start inter">
            {NAV_LINKS.map((item, i) => (
              <li key={i}>
                <Link
                  to={item.path}
                  className="hover:text-blue-400 transition block"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-5">Contact Us</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start">
              <svg className="w-6 h-6 mr-3 text-blue-400" fill="currentColor">
                <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
              <span>{CONTACT_INFO.address}</span>
            </li>

            <li className="flex items-start">
              <svg className="w-6 h-6 mr-3 text-blue-400" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.958 1.846 2.956 3.845 4.802 4.802l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 4 14.18 4 9.5V5a1 1 0 011-1h2.153z" />
              </svg>
              <span>{CONTACT_INFO.phone}</span>
            </li>

            <li className="flex items-start">
              <svg className="w-6 h-6 mr-3 text-blue-400" fill="currentColor">
                <path d="M2.94 6.412A2 2 0 002 8.414V16a2 2 0 002 2h12a2 2 0 002-2V8.414a2 2 0 00-.94-1.679l-7.017-4.154a2 2 0 00-2.126 0l-7.017 4.154z" />
              </svg>
              <span>{CONTACT_INFO.email}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700"></div>

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6 text-center text-sm text-gray-400">
        © {currentYear} Leo Club of Pokhara Puspanjali. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
