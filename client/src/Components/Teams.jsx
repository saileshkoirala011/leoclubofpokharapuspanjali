import React from "react";
import { Link } from "react-router-dom";
import TeamMemberCard from "./ui/TeamMemberCard";
import chaterpresident from "../assets/dayasagarparajuli.jpg";
import IPP             from "../assets/sandhya.jpg";
import President       from "../assets/Smitri-Karki.jpg";
import vicepresident   from "../assets/pratikdhakal.jpg";
import Secretary       from "../assets/Sailesh.jpg";
import jointSecretary  from "../assets/prasis.jpg";
import Treasurer       from "../assets/rajani-sharma.jpg";
import shreeya         from "../assets/shreeya.jpg";
import shrijan         from "../assets/shrijan.png";
import shristi         from "../assets/shristi.jpeg";

const team = [
  { name: "LEO Dayasagar Parajuli",  role: "Charter President",       image: chaterpresident, badge: "Founder"    },
  { name: "LEO Sadhana Poudel",      role: "Immediate Past President", image: IPP,             badge: "Leadership" },
  { name: "LEO Smriti Karki",        role: "President",                image: President,       badge: "President"  },
  { name: "LEO Pratik Dhakal",       role: "Vice-President",           image: vicepresident                        },
  { name: "LEO Sailesh Koirala",     role: "Secretary",                image: Secretary                            },
  { name: "LEO Prasis Adhikari",     role: "Joint Secretary",          image: jointSecretary                       },
  { name: "LEO Rajani Sharma",       role: "Treasurer",                image: Treasurer                            },
  { name: "LEO Shreeya Acharya",     role: "Member",                   image: shreeya                              },
  { name: "LEO Shrijan Acharya",     role: "Member",                   image: shrijan                              },
  { name: "LEO Shristi Ranabhat",    role: "Member",                   image: shristi                              },
];

const leadership = team.filter((m) => m.role !== "Member");
const members    = team.filter((m) => m.role === "Member");

const SectionTitle = ({ title, subtitle }) => (
  <div className="text-center mb-12">
    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{title}</h2>
    <div className="mx-auto w-10 h-1 bg-blue-600 rounded-full mt-3 mb-4" />
    {subtitle && <p className="text-gray-500 text-[15px] max-w-xl mx-auto">{subtitle}</p>}
  </div>
);

const Teams = () => (
  <div className="min-h-screen bg-gray-50/50">

    {/* Hero */}
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 py-28 px-5 text-center">
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-3xl mx-auto">
        <span className="inline-block bg-white/10 text-white/90 text-xs font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full mb-5 border border-white/15">
          Leo Club of Pokhara Puspanjali
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-5">
          Meet Our Team
        </h1>
        <p className="text-blue-100/80 text-lg sm:text-xl leading-relaxed font-light max-w-2xl mx-auto">
          A passionate group of young leaders dedicated to community service, personal growth, and creating lasting positive change.
        </p>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24">

      {/* Leadership */}
      <SectionTitle
        title="Leadership Board"
        subtitle="The experienced leaders guiding our club towards its mission and goals."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-20">
        {leadership.map((m, i) => <TeamMemberCard key={i} {...m} variant="full" />)}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-16">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em]">Active Members</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Members */}
      <SectionTitle
        title="Active Members"
        subtitle="The heart of our club — committed volunteers making a real difference every day."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-24">
        {members.map((m, i) => <TeamMemberCard key={i} {...m} variant="full" />)}
      </div>

      {/* Join CTA */}
      <div className="relative rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 px-8 py-16 text-center overflow-hidden shadow-2xl">
        <div className="absolute -top-12 -right-12 w-56 h-56 bg-blue-500/25 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-blue-900/30 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">Want to Join Our Team?</h3>
          <p className="text-blue-100/80 text-base sm:text-lg mb-8 max-w-lg mx-auto font-light">
            We're always looking for passionate young leaders. Come be a part of something meaningful.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-blue-700 font-semibold px-8 py-3.5 rounded-2xl hover:bg-blue-50 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl text-sm"
          >
            Get in Touch →
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Teams;
