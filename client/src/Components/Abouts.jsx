import React from "react";

const mottoItems = [
  {
    icon: <path d="M10 2a3 3 0 100 6 3 3 0 000-6zM4 14s1-2 6-2 6 2 6 2v2H4v-2z" />,
    title: "Leadership",
    desc: "Developing confident and ethical leaders ready to serve.",
    bg: "bg-blue-50", color: "text-blue-600",
  },
  {
    icon: <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />,
    title: "Experience",
    desc: "Real-world projects that build skills and confidence.",
    bg: "bg-emerald-50", color: "text-emerald-600",
  },
  {
    icon: <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM6.293 6.707a1 1 0 011.414-1.414l.707.707A1 1 0 116.293 7.414l-.707-.707zM3 11a1 1 0 100 2h1a1 1 0 100-2H3zM16 11a1 1 0 100 2h1a1 1 0 100-2h-1zM13.293 6.707a1 1 0 010-1.414l.707-.707a1 1 0 111.414 1.414l-.707.707a1 1 0 01-1.414 0zM10 14a4 4 0 100-8 4 4 0 000 8z" />,
    title: "Opportunity",
    desc: "Connect with mentors and create lifelong networks.",
    bg: "bg-amber-50", color: "text-amber-600",
  },
];

const activities = [
  "Organize environmental campaigns, cleanups & tree plantations",
  "Conduct health camps, blood donation drives & awareness programs",
  "Provide tutoring, scholarships & educational support",
  "Host leadership & skill-development workshops for youth",
  "Support disaster relief & rehabilitation efforts in emergencies",
];

const PageBanner = ({ title, subtitle }) => (
  <div className="relative bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 py-28 px-5 text-center overflow-hidden">
    <div className="absolute -top-16 -left-16 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute -bottom-12 -right-12 w-56 h-56 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
    <div className="relative z-10">
      <span className="inline-block bg-white/10 text-white/90 text-xs font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full mb-5 border border-white/15">
        Leo Club of Pokhara Puspanjali
      </span>
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">{title}</h1>
      <p className="text-blue-100/80 text-lg max-w-xl mx-auto font-light">{subtitle}</p>
    </div>
  </div>
);

const Abouts = () => (
  <section className="w-full">
    <PageBanner
      title="About Us"
      subtitle="Learn about our mission, values, and the work we do for our community."
    />

    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-20 space-y-20">

      {/* Who We Are */}
      <div className="grid sm:grid-cols-5 gap-6 sm:gap-10 items-start">
        <div className="sm:col-span-2">
          <div className="w-8 h-1 bg-blue-600 rounded-full mb-3" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Who We Are</h2>
        </div>
        <p className="sm:col-span-3 text-gray-600 leading-relaxed text-[15px]">
          Leo Club of Pokhara Puspanjali is a youth-driven community service organization committed to leadership development, humanitarian action, and positive change. We unite young minds to serve the community, build essential life skills, and create impactful social projects across Nepal.
        </p>
      </div>

      <div className="border-t border-gray-100" />

      {/* Our Mission */}
      <div className="grid sm:grid-cols-5 gap-6 sm:gap-10 items-start">
        <div className="sm:col-span-2">
          <div className="w-8 h-1 bg-blue-600 rounded-full mb-3" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Our Mission</h2>
        </div>
        <p className="sm:col-span-3 text-gray-600 leading-relaxed text-[15px]">
          Our mission is to empower youth through meaningful service in health, education, environment, and disaster relief while nurturing leadership, compassion, and community engagement. We aim to build responsible leaders who create long-lasting social impact.
        </p>
      </div>

      <div className="border-t border-gray-100" />

      {/* What We Do */}
      <div>
        <div className="w-8 h-1 bg-blue-600 rounded-full mb-3" />
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-8">What We Do</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {activities.map((act, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-4 bg-gray-50 hover:bg-blue-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-all duration-200 group"
            >
              <div className="w-7 h-7 rounded-lg bg-blue-100 group-hover:bg-blue-200 text-blue-700 flex items-center justify-center flex-shrink-0 text-xs font-bold transition-colors">
                {i + 1}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{act}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100" />

      {/* Our Motto */}
      <div>
        <div className="text-center mb-10">
          <div className="w-8 h-1 bg-blue-600 rounded-full mx-auto mb-3" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Our Motto</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {mottoItems.map(({ icon, title, desc, bg, color }) => (
            <div
              key={title}
              className="group p-8 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-center bg-white"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 ${bg} group-hover:scale-110 transition-transform duration-300`}>
                <svg className={`w-7 h-7 ${color}`} fill="currentColor" viewBox="0 0 20 20">
                  {icon}
                </svg>
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Abouts;
