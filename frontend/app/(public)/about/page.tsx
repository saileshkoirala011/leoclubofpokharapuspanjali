import type { Metadata } from "next";
import Image  from "next/image";
import Link   from "next/link";
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

const MOTTO = [
  { title: "Leadership", desc: "Developing confident, ethical leaders ready to serve their communities.", icon: "🎯", color: "#c9a84c" },
  { title: "Experience",  desc: "Real-world projects that build lasting skills and personal confidence.",  icon: "📖", color: "#3182ce" },
  { title: "Opportunity", desc: "Connect with mentors, peers, and build lifelong networks.",               icon: "🌟", color: "#38a169" },
];

export default function AboutPage() {
  return (
    <section className="w-full">
      <PageHero label="Leo Club of Pokhara Puspanjali" title="About Us"
        subtitle="Our mission, values, and the work we do every day for our community." />

      {/* Who We Are */}
      <div className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <Image src="/images/image.jpeg" alt="Leo Club members" width={600} height={420}
              className="w-full h-[420px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/50 to-transparent" />
            <div className="absolute bottom-6 left-6 glass rounded-2xl px-5 py-3 shadow-xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500 mb-0.5">Est.</p>
              <p className="font-display text-2xl font-black text-[#c9a84c] leading-none">2019</p>
            </div>
          </div>
          <div>
            <div className="flex items-start gap-5 mb-6">
              <div className="flex-shrink-0 w-1 h-14 bg-gradient-to-b from-[#c9a84c] to-transparent rounded-full mt-1" />
              <div>
                <span className="section-pill">Who We Are</span>
                <h2 className="font-display text-4xl font-black text-[#0a1628] leading-[1.1] mt-3">
                  A Youth-Led Movement<br /><span className="gold-text">for Change</span>
                </h2>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed text-[15px] mb-5">
              Leo Club of Pokhara Puspanjali is a youth-driven community service organization committed to leadership development, humanitarian action, and positive change across Nepal.
            </p>
            <p className="text-gray-600 leading-relaxed text-[15px]">
              Operating under the International Lions Club, we provide a platform where youth can turn their passion for service into real, lasting impact.
            </p>
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <div className="py-24 px-6" style={{ background: "#faf7f0" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="flex items-start gap-5 mb-6">
              <div className="flex-shrink-0 w-1 h-14 bg-gradient-to-b from-[#c9a84c] to-transparent rounded-full mt-1" />
              <div>
                <span className="section-pill">Our Mission</span>
                <h2 className="font-display text-4xl font-black text-[#0a1628] leading-[1.1] mt-3">
                  Empower. Serve.<br /><span className="gold-text">Lead.</span>
                </h2>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed text-[15px] mb-8">
              Our mission is to empower youth through meaningful service in health, education, environment, and disaster relief while nurturing leadership, compassion, and community engagement.
            </p>
            <div className="space-y-3">
              {ACTIVITIES.map((act, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-gray-100 hover:border-[#c9a84c]/30 transition-colors group">
                  <span className="w-6 h-6 rounded-full bg-[#c9a84c]/15 text-[#c9a84c] text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#c9a84c] group-hover:text-white transition-colors">
                    {i + 1}
                  </span>
                  <p className="text-gray-700 text-sm leading-relaxed">{act}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2 relative rounded-3xl overflow-hidden shadow-2xl">
            <Image src="/images/image2.jpeg" alt="Community service" width={600} height={480}
              className="w-full h-[480px] object-cover" />
          </div>
        </div>
      </div>

      {/* Our Motto */}
      <div className="bg-[#0a1628] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-pill">Our Motto</span>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-white mt-4 leading-[1.1]">
              Leadership. Experience.<br /><span className="gold-text">Opportunity.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {MOTTO.map(({ title, desc, icon, color }) => (
              <div key={title} className="rounded-3xl p-8 bg-white/5 border border-white/8 hover:border-[#c9a84c]/40 text-center group transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `${color}18` }}>{icon}</div>
                <h3 className="font-display text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
