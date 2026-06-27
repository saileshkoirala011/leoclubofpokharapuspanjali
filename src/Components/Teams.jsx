import React from 'react';
import PageLayout from './ui/PageLayout';
import SectionHeader from './ui/SectionHeader';
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

const TeamSection = () => {
  const team = [
    {
      name: "LEO Dayasagar Parajuli ",
      role: "Chater President",
      image: chaterpresident,
    },
    {
      name: "LEO Sadhana Poudel ",
      role: "IPP",
      image: IPP,
    },
    {
      name: "LEO Smriti Karkai",
      role: "President",
      image: President,
    },
    {
      name: "LEO Pratik Dhakal",
      role: "Vice-President",
      image: vicepresident,
    },
    {
      name: "LEO Sailesh Koirala ",
      role: "Secretary",
      image: Secretary,
    },
    {
      name: "LEO Prsis Adhikari",
      role: "joint Secretary",
      image: jointSecretary,
    },
    {
      name: "LEO Rajani Sharma",
      role: "Teasurer",
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
      name :"LEO Shristi Ranabhat",
      role: "Member",
      image: shristi,
    },
  ];

  return (
    <PageLayout>
      <section className="py-28 text-center">
        <SectionHeader
          title="Our Team"
          subtitle="A dedicated group of young leaders committed to community service and personal growth."
          className="mb-16"
        />

        {/* Improved Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-6 max-w-6xl mx-auto font-poppins">
          {team.map((member, index) => (
            <TeamMemberCard
              key={index}
              name={member.name}
              role={member.role}
              image={member.image}
              variant="full"
            />
          ))}
        </div>
      </section>
    </PageLayout>
  );
};

export default TeamSection;
