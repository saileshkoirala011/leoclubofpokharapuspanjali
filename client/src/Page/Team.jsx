import React from "react";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../Components/ui/SectionHeader";
import TeamMemberCard from "../Components/ui/TeamMemberCard";
import President from '../assets/Smitri-Karki.jpg';
import VicePresident from '../assets/pratikdhakal.jpg';
import Secretary from '../assets/Sailesh.jpg';

const team = [
  {
    name: "LEO Smriti Karki",
    role: "President",
    image: President,
    badge: "President",
  },
  {
    name: "LEO Pratik Dhakal",
    role: "Vice-President",
    image: VicePresident,
  },
  {
    name: "LEO Sailesh Koirala",
    role: "Secretary",
    image: Secretary,
  },
];

const TeamSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50 text-center">
      <SectionHeader
        title="Our Team"
        subtitle="A dedicated group of young leaders committed to community service and personal growth."
        className="mb-14"
      />

      <div className="flex flex-wrap justify-center gap-6 px-6">
        {team.map((member, index) => (
          <TeamMemberCard
            key={index}
            name={member.name}
            role={member.role}
            image={member.image}
            badge={member.badge}
            variant="compact"
          />
        ))}
      </div>

      <button
        className="mt-12 inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-blue-700 hover:shadow-lg active:scale-95 transition-all duration-200"
        onClick={() => navigate("/team")}
      >
        View Full Team
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </section>
  );
};

export default TeamSection;
