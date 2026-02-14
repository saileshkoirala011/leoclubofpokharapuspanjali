import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

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
     future, we’d 
   love to have you with us. Start your journey today—your impact begins here.
          </p>

          <div className="flex gap-4 mt-4">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/profile.php?id=100083652833637"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-700 hover:bg-blue-600 transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.29 20v-7.752h-2.603V9.349h2.603V7.124c0-2.577 1.574-3.974 3.864-3.974 1.099 0 2.042.082 2.313.118v2.685h-1.588c-1.246 0-1.487.592-1.487 1.46v1.912h2.973l-.386 2.899h-2.587V20" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/leo_club_of_pokhara_puspanjali/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-700 hover:bg-pink-500 transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 1.802c2.67 0 2.987.01 4.042.059 2.71.123 3.851 1.244 3.974 3.974.049 1.054.059 1.37.059 4.041 0 2.67-.01 2.987-.059 4.041-.123 2.729-1.268 3.859-3.977 3.977-1.053.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-2.717-.119-3.851-1.244-3.977-3.942-.059-1.069-.069-1.386-.069-4.041 0-2.67.01-2.986.069-4.04.129-2.729 1.261-3.864 3.975-3.977 1.052-.048 1.368-.058 4.041-.058zm0 1.822c-2.629 0-2.927.01-3.96.058-1.482.069-2.633 1.182-2.702 2.702-.048 1.032-.058 1.331-.058 3.96 0 2.629.01 2.927.058 3.96.069 1.528 1.228 2.653 2.702 2.702 1.033.048 1.331.058 3.96.058 2.629 0 2.927-.01 3.96-.058 1.488-.049 2.646-1.156 2.724-2.702.048-1.033.058-1.331.058-3.96 0-2.629-.01-2.927-.058-3.96-.079-1.528-1.235-2.633-2.703-2.702-1.034-.048-1.332-.058-3.96-.058z" />
                <path d="M10 4.865a5.135 5.135 0 1 0 0 10.27 5.135 5.135 0 0 0 0-10.27zm0 8.468a3.333 3.333 0 1 1 0-6.666 3.333 3.333 0 0 1 0 6.666z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-5 ">Quick Links</h4>
          <ul className="space-y-3 text-sm text-gray-400 items-start inter">
            {[
              { name: "Home", link: "/" },
              { name: "About Us", link: "/Abouts" },
              { name: "Team", link: "/team" },
              { name: "Gallery", link: "/gallery" },
              { name: "Contact", link: "/contact" },
            ].map((item, i) => (
              <li key={i}>
                <Link
                  to={item.link}
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
              <span>Pokhara, Nepal</span>
            </li>

            <li className="flex items-start">
              <svg className="w-6 h-6 mr-3 text-blue-400" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.958 1.846 2.956 3.845 4.802 4.802l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 4 14.18 4 9.5V5a1 1 0 011-1h2.153z" />
              </svg>
              <span>+977-61-XXXXXX</span>
            </li>

            <li className="flex items-start">
              <svg className="w-6 h-6 mr-3 text-blue-400" fill="currentColor">
                <path d="M2.94 6.412A2 2 0 002 8.414V16a2 2 0 002 2h12a2 2 0 002-2V8.414a2 2 0 00-.94-1.679l-7.017-4.154a2 2 0 00-2.126 0l-7.017 4.154z" />
              </svg>
              <span>leoclubofpokharapuspanjali.com</span>
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
