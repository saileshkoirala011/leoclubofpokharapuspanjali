import React from "react";

const TeamMemberCard = ({ name, role, image, variant = "compact" }) => {
  if (variant === "full") {
    return (
      <div className="bg-white shadow-lg hover:shadow-2xl rounded-4xl p-6 hover:scale-105 transition-all duration-300 group border border-gray-100 flex flex-col h-full">
        <div className="overflow-hidden rounded-xl h-80 w-full">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover border-2 border-blue-300 group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="mt-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
            <p className="text-blue-600 text-sm font-medium mt-1">{role}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-3xl p-6 w-72 hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-100 group">
      <div className="flex justify-center overflow-hidden rounded-xl">
        <img
          src={image}
          alt={name}
          className="rounded-xl w-52 h-64 object-cover border-4 border-blue-200 group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-gray-900">{name}</h3>
      <p className="text-blue-600 text-sm font-medium">{role}</p>
    </div>
  );
};

export default TeamMemberCard;
