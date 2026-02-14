import React from "react";

import Footer from "../Page/Footer";

const Abouts = () => {
  return (
    <section className="w-full">
      {/* Hero Section */}
    <div className="py-16 sm:py-28 px-4 sm:px-1 mb-2">
    <div className="text-center px-2">
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-700 mb-4">
      About Us
    </h1>
    <p className="mt-3 text-lg sm:text-xl text-gray-700 font-light">
      Leo Club of Pokhara Puspanjali
    </p>
  </div>
</div>



      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-20 space-y-10 sm:space-y-20">

        {/* Who We Are */}
        <div className="bg-white/90 backdrop-blur-md p-6 sm:p-10 rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-700 mb-4 sm:mb-6">Who We Are</h2>
          <p className="text-gray-800 leading-relaxed text-base sm:text-lg">
            Leo Club of Pokhara Puspanjali is a youth-driven community service organization 
            committed to leadership development, humanitarian action, and positive change.
            We unite young minds to serve the community, build essential life skills, 
            and create impactful social projects across Nepal.
          </p>
        </div>

        {/* Our Mission */}
        <div className="bg-white/90 backdrop-blur-md p-6 sm:p-10 rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-700 mb-4 sm:mb-6">Our Mission</h2>
          <p className="text-gray-800 leading-relaxed text-base sm:text-lg">
            Our mission is to empower youth through meaningful service in health, education,
            environment, and disaster relief while nurturing leadership, compassion,
            and community engagement. We aim to build responsible leaders who create
            long-lasting social impact.
          </p>
        </div>

        {/* What We Do */}
        <div className="bg-white/90 backdrop-blur-md p-6 sm:p-10 rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-700 mb-6 sm:mb-8">What We Do</h2>

          <ul className="space-y-3 sm:space-y-4 text-base sm:text-lg text-gray-800">
            <li className="flex items-start gap-4">
              <span className="text-blue-600 text-2xl flex-shrink-0">•</span>
              <span className="leading-relaxed">Organize environmental campaigns, cleanups & tree plantations</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-blue-600 text-2xl flex-shrink-0">•</span>
              <span className="leading-relaxed">Conduct health camps, blood donation drives & awareness programs</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-blue-600 text-2xl flex-shrink-0">•</span>
              <span className="leading-relaxed">Provide tutoring, scholarships & educational support</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-blue-600 text-2xl flex-shrink-0">•</span>
              <span className="leading-relaxed">Host leadership & skill-development workshops for youth</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-blue-600 text-2xl flex-shrink-0">•</span>
              <span className="leading-relaxed">Support disaster relief & rehabilitation efforts in emergencies</span>
            </li>
          </ul>
        </div>

        {/* Motto Section */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-700 mb-8 sm:mb-12">Our Motto</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">

            {/* Card 1 */}
            <div className="p-6 sm:p-10 rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all group">
              <div className="mx-auto w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center text-blue-700 rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 sm:w-10 h-8 sm:h-10" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a3 3 0 100 6 3 3 0 000-6zM4 14s1-2 6-2 6 2 6 2v2H4v-2z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Leadership</h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Developing confident and ethical leaders.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 sm:p-10 rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all group">
              <div className="mx-auto w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center text-green-600 rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 sm:w-10 h-8 sm:h-10" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h4l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Experience</h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Real-world projects that build skills & confidence.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 sm:p-10 rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all group">
              <div className="mx-auto w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center text-yellow-600 rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 sm:w-10 h-8 sm:h-10" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 100 12A6 6 0 0010 2zm1 9V7H9v4H5v2h10v-2h-4z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Opportunity</h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Connect with mentors and create lifelong networks.
              </p>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Abouts;
