import React from "react";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../Components/ui/SectionHeader";
import TeamMemberCard from "../Components/ui/TeamMemberCard";
import President from '../assets/Smitri-Karki.jpg';
import VicePresident from '../assets/pratikdhakal.jpg';
import Secretary from '../assets/Sailesh.jpg';

const TeamSection = () => {
  const navigate = useNavigate();

  const team = [
    {
      name: "LEO Smiriti Karkai",
      role: "President",
      image: President,
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

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50 text-center">
      <SectionHeader
        title="Our Team"
        subtitle="A dedicated group of young leaders committed to community service and personal growth."
        className="mb-16"
      />

      <div className="flex flex-wrap justify-center gap-8 font-poppins px-6">
        {team.map((member, index) => (
          <TeamMemberCard
            key={index}
            name={member.name}
            role={member.role}
            image={member.image}
            variant="compact"
          />
        ))}
      </div>

      <button
        className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 hover:shadow-lg active:scale-95 transition-all duration-300 cursor-pointer"
        onClick={() => navigate("/Team")}
      >
        View More
      </button>
    </section>
  );
};

export default TeamSection;
