import React from 'react';
import Footer from '../Page/Footer';
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
    <div className="bg-gradient-to-b from-white to-blue-50">
      <section className="py-28 text-center">
        <h2 className="text-5xl font-bold text-blue-700 mb-4">Our Team</h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-16 text-lg leading-relaxed">
          A dedicated group of young leaders committed to community service and personal growth.
        </p>

        {/* Improved Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-6 max-w-6xl mx-auto font-poppins">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white shadow-lg hover:shadow-2xl rounded-4xl p-6 hover:scale-105 transition-all duration-300 group border border-gray-100 flex flex-col h-full"
            >
              <div className="overflow-hidden rounded-xl h-80 w-full">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover border-2 border-blue-300 group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="mt-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 text-sm font-medium mt-1">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TeamSection;
