import React from 'react';
import TeamMemberCard from './ui/TeamMemberCard';
import President from '../assets/Smitri-Karki.jpg';
import Secretary from '../assets/Sailesh.jpg';
import chaterpresident from '../assets/dayasagarparajuli.jpg';
import IPP from '../assets/sandhya.jpg';
import vicepresident from '../assets/pratikdhakal.jpg';
import shreeya from '../assets/shreeya.jpg';
import shrijan from '../assets/shrijan.png';
import Teasurer from "../assets/rajani-sharma.jpg";
import jointSecretary from "../assets/prasis.jpg";
import shristi from "../assets/shristi.jpeg";

const team = [
  {
    name: "LEO Dayasagar Parajuli",
    role: "Charter President",
    image: chaterpresident,
    badge: "Founder",
  },
  {
    name: "LEO Sadhana Poudel",
    role: "Immediate Past President",
    image: IPP,
    badge: "Leadership",
  },
  {
    name: "LEO Smriti Karki",
    role: "President",
    image: President,
    badge: "President",
  },
  {
    name: "LEO Pratik Dhakal",
    role: "Vice-President",
    image: vicepresident,
  },
  {
    name: "LEO Sailesh Koirala",
    role: "Secretary",
    image: Secretary,
  },
  {
    name: "LEO Prasis Adhikari",
    role: "Joint Secretary",
    image: jointSecretary,
  },
  {
    name: "LEO Rajani Sharma",
    role: "Treasurer",
    image: Teasurer,
  },
  {
    name: "LEO Shreeya Acharya",
    role: "Member",
    image: shreeya,
  },
  {
    name: "LEO Shrijan Acharya",
    role: "Member",
    image: shrijan,
  },
  {
    name: "LEO Shristi Ranabhat",
    role: "Member",
    image: shristi,
  },
];

// Separate leadership tier from members
const leadership = team.filter((m) => m.role !== "Member");
const members = team.filter((m) => m.role === "Member");

const Teams = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/40 to-white">

      {/* Page Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 py-24 px-4 text-center">
        {/* Decorative blobs */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-block bg-white/10 text-white text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5 border border-white/20 backdrop-blur-sm">
            Leo Club of Pokhara Puspanjali
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-5">
            Meet Our Team
          </h1>
          <p className="text-blue-100 text-lg sm:text-xl leading-relaxed font-light max-w-2xl mx-auto">
            A passionate group of young leaders dedicated to community service,
            personal growth, and creating lasting positive change.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">

        {/* Leadership Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Leadership Board
            </h2>
            <div className="mx-auto w-16 h-1 bg-blue-600 rounded-full mt-3" />
            <p className="mt-4 text-gray-500 text-base max-w-xl mx-auto">
              The experienced leaders guiding our club towards its mission and goals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {leadership.map((member, index) => (
              <TeamMemberCard
                key={index}
                name={member.name}
                role={member.role}
                image={member.image}
                badge={member.badge}
                variant="full"
              />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-16">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Members</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Members Section */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Active Members
            </h2>
            <div className="mx-auto w-16 h-1 bg-blue-600 rounded-full mt-3" />
            <p className="mt-4 text-gray-500 text-base max-w-xl mx-auto">
              The heart of our club — committed volunteers making a real difference every day.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
            {members.map((member, index) => (
              <TeamMemberCard
                key={index}
                name={member.name}
                role={member.role}
                image={member.image}
                variant="full"
              />
            ))}
          </div>
        </div>

        {/* Join CTA */}
        <div className="mt-24 rounded-3xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-14 text-center shadow-xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-52 h-52 bg-blue-500/30 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-52 h-52 bg-blue-800/30 rounded-full blur-2xl" />
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Want to Join Our Team?
            </h3>
            <p className="text-blue-100 text-base sm:text-lg mb-8 max-w-xl mx-auto font-light">
              We're always looking for passionate young leaders. Come be a part of something meaningful.
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-blue-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-blue-50 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Get in Touch
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Teams;
