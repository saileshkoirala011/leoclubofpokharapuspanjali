import type { Metadata } from "next";
import Link             from "next/link";
import PageHero         from "@/components/ui/PageHero";
import TeamMemberCard   from "@/components/ui/TeamMemberCard";

export const metadata: Metadata = {
  title:       "Our Team | Leo Club of Pokhara Puspanjali",
  description: "Meet the passionate young leaders driving positive change in Pokhara.",
};

const TEAM = [
  { name: "LEO Dayasagar Parajuli",  role: "Charter President",       image: "/images/dayasagarparajuli.jpg", badge: "Founder",    accent: "#c9a84c" },
  { name: "LEO Sadhana Poudel",      role: "Immediate Past President", image: "/images/sandhya.jpg",          badge: "Leadership", accent: "#805ad5" },
  { name: "LEO Smriti Karki",        role: "President",                image: "/images/Smitri-Karki.jpg",     badge: "President",  accent: "#3182ce" },
  { name: "LEO Pratik Dhakal",       role: "Vice-President",           image: "/images/pratikdhakal.jpg",                          accent: "#2b6cb0" },
  { name: "LEO Sailesh Koirala",     role: "Secretary",                image: "/images/Sailesh.jpg",                               accent: "#276749" },
  { name: "LEO Prasis Adhikari",     role: "Joint Secretary",          image: "/images/prasis.jpg",                                accent: "#2f855a" },
  { name: "LEO Rajani Sharma",       role: "Treasurer",                image: "/images/rajani-sharma.jpg",                         accent: "#c05621" },
  { name: "LEO Shreeya Acharya",     role: "Member",                   image: "/images/shreeya.jpg",                               accent: "#553c9a" },
  { name: "LEO Shrijan Acharya",     role: "Member",                   image: "/images/shrijan.png",                               accent: "#2b6cb0" },
  { name: "LEO Shristi Ranabhat",    role: "Member",                   image: "/images/shristi.jpeg",                              accent: "#b7791f" },
];

const leadership = TEAM.filter((m) => m.role !== "Member");
const members    = TEAM.filter((m) => m.role === "Member");

function Divider({ label }: { label: string }) {
  return (
    <div className="divider-ornament mb-10">
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#c9a84c] whitespace-nowrap px-4">
        {label}
      </span>
    </div>
  );
}

export default function TeamPage() {
  return (
    <div className="min-h-screen" style={{ background: "#faf7f0" }}>
      <PageHero
        label="Leo Club of Pokhara Puspanjali"
        title="Meet Our Team"
        subtitle="A passionate group of young leaders dedicated to community service and lasting positive change."
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24">

        {/* Leadership Board */}
        <Divider label="Leadership Board" />
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-black text-[#0a1628]">
            The <span className="gold-text">Leadership</span> Board
          </h2>
          <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
            Experienced leaders guiding our club towards its mission and goals.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-24">
          {leadership.map((m) => (
            <TeamMemberCard key={m.name} {...m} />
          ))}
        </div>

        {/* Active Members */}
        <Divider label="Active Members" />
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-black text-[#0a1628]">
            Active <span className="gold-text">Members</span>
          </h2>
          <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
            The heart of our club — committed volunteers making a real difference every day.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-24">
          {members.map((m) => (
            <TeamMemberCard key={m.name} {...m} />
          ))}
        </div>

        {/* Join CTA */}
        <div className="relative rounded-3xl bg-[#0a1628] px-8 py-16 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.08)_0%,transparent_70%)]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#c9a84c]/30 to-transparent" />
          <div className="relative z-10">
            <span className="section-pill mb-5">Join Us</span>
            <h3 className="font-display text-3xl font-bold text-white mb-3 mt-4">Want to Join Our Team?</h3>
            <p className="text-white/45 text-sm mb-8 max-w-md mx-auto leading-relaxed">
              We&apos;re always looking for passionate young leaders. Come be a part of something meaningful.
            </p>
            <Link href="/contact" className="btn-gold">
              Get in Touch
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
