import React from "react";
import { useNavigate } from "react-router-dom";
import Team from "../Components/Teams.jsx"
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
      <h2 className="text-5xl font-bold text-blue-700 mb-3">Our Team</h2>
      <p className="text-gray-700 max-w-xl mx-auto mb-16 text-lg leading-relaxed">
        A dedicated group of young leaders committed to community service and personal growth.
      </p>

      <div className="flex flex-wrap justify-center gap-8 font-poppins px-6">
        {team.map((member, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-3xl p-6 w-72 hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-100 group"
          >
            <div className="flex justify-center overflow-hidden rounded-xl">
              <img
                src={member.image}
                alt={member.name}
                className="rounded-xl w-52 h-64 object-cover border-4 border-blue-200 group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-gray-900">
              {member.name}
            </h3>
            <p className="text-blue-600 text-sm font-medium">{member.role}</p>
          </div>
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
