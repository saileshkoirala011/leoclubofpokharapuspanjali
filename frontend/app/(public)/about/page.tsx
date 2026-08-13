import type { Metadata } from "next";
import Image    from "next/image";
import Link     from "next/link";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "About Us | Leo Club of Pokhara Puspanjali",
  description: "Learn about our mission, values, and the work we do for our community.",
};

const ACTIVITIES = [
  "Organize environmental campaigns, cleanups & tree plantations",
  "Conduct health camps, blood donation drives & awareness programs",
  "Provide tutoring, scholarships & educational support",
  "Host leadership & skill-development workshops for youth",
  "Support disaster relief & rehabilitation efforts in emergencies",
];

import { Target, BookOpen, Star } from "lucide-react";

const MOTTO = [
  { title: "Leadership", desc: "Developing confident, ethical leaders ready to serve their communities.", Icon: Target,   color: "#1B3A6B", bg: "bg-[#EBF3FF]" },
  { title: "Experience",  desc: "Real-world projects that build lasting skills and personal confidence.",  Icon: BookOpen, color: "#2D5FAA", bg: "bg-[#EBF5FB]" },
  { title: "Opportunity", desc: "Connect with mentors, peers, and build lifelong networks.",               Icon: Star,     color: "#D4A017", bg: "bg-[#FEF9EC]" },
];

export default function AboutPage() {
  return (
    <section className="w-full">
      <PageHero
        label="Leo Club of Pokhara Puspanjali"
        title="About Us"
        subtitle="Our mission, values, and the work we do every day for our community."
      />

      {/* ── Who We Are ── */}
      <div className="py-20 lg:py-28 px-6" style={{ background: "var(--bg)" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* Image */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 rounded-3xl bg-[#EBF3FF] -z-10" />
            <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-2xl bg-[#EBF5FB] -z-10" />
            <div className="relative rounded-3xl overflow-hidden" style={{ boxShadow: "0 16px 64px rgba(27,58,107,0.15)" }}>
              <Image src="/images/image.jpeg" alt="Leo Club members" width={620} height={460}
                className="w-full h-[460px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D2146]/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 rounded-tr-2xl px-5 py-3"
                style={{ background: "linear-gradient(135deg,#1B3A6B,#2D5FAA)", boxShadow: "0 4px 20px rgba(27,58,107,0.5)" }}>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-sky-200/70 mb-0.5">Est.</p>
                <p className="font-display text-xl font-black text-white leading-none">2022</p>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="chip chip-blue mb-5">Who We Are</span>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-[#1E293B] leading-[1.1] tracking-tight mb-6">
              A Youth-Led{" "}
              <span style={{ background: "linear-gradient(135deg,#1B3A6B,#4A7FD4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Movement for Change
              </span>
            </h2>
            <p className="text-[#64748B] leading-relaxed text-[15.5px] mb-4">
              Leo Club of Pokhara Puspanjali is a youth-driven community service organization committed to leadership development, humanitarian action, and positive change across Nepal.
            </p>
            <p className="text-[#64748B] leading-relaxed text-[15.5px] mb-8">
              Operating under the International Lions Club, we provide a platform where youth can turn their passion for service into real, lasting impact.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Get Involved
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Our Mission ── */}
      <div className="py-20 lg:py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <div className="order-2 lg:order-1">
            <span className="chip chip-blue mb-5">Our Mission</span>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-[#1E293B] leading-[1.1] tracking-tight mb-6">
              Empower. Serve.{" "}
              <span style={{ background: "linear-gradient(135deg,#1B3A6B,#4A7FD4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Lead.
              </span>
            </h2>
            <p className="text-[#64748B] leading-relaxed text-[15.5px] mb-8">
              Our mission is to empower youth through meaningful service in health, education, environment, and disaster relief while nurturing leadership, compassion, and community engagement.
            </p>
            <div className="space-y-3">
              {ACTIVITIES.map((act, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-[#F8FAFC] rounded-xl border border-[#D6EAF8] hover:border-[#4A7FD4]/40 transition-colors group">
                  <span className="w-7 h-7 rounded-full bg-[#EBF3FF] text-[#1B3A6B] text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#1B3A6B] group-hover:text-white transition-colors">
                    {i + 1}
                  </span>
                  <p className="text-[#64748B] text-[15px] leading-relaxed">{act}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-[#EBF5FB] -z-10" />
            <div className="rounded-3xl overflow-hidden" style={{ boxShadow: "0 16px 64px rgba(27,58,107,0.15)" }}>
              <Image src="/images/image2.jpeg" alt="Community service" width={620} height={520}
                className="w-full h-[520px] object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Our Motto ── */}
      <div className="py-20 lg:py-28 px-6 bg-hero-gradient">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="chip mb-5" style={{ background: "rgba(135,206,235,0.15)", border: "1px solid rgba(135,206,235,0.3)", color: "#87CEEB" }}>
              Our Motto
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-white mt-4 leading-[1.1]">
              Leadership. Experience.{" "}
              <span style={{ background: "linear-gradient(135deg,#87CEEB,#4A7FD4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Opportunity.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {MOTTO.map(({ title, desc, Icon, color, bg }) => (
              <div key={title} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-8 text-center group hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
                <div className={`w-16 h-16 ${bg} rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={28} style={{ color }} strokeWidth={1.8} />
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-3">{title}</h3>
                <div className="h-0.5 w-12 rounded-full mx-auto mb-4" style={{ background: color }} />
                <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
