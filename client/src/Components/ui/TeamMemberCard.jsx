import React from "react";

const badgeColors = {
  Founder: "bg-amber-100 text-amber-700 border-amber-200",
  President: "bg-blue-100 text-blue-700 border-blue-200",
  Leadership: "bg-purple-100 text-purple-700 border-purple-200",
};

const TeamMemberCard = ({ name, role, image, badge, variant = "compact" }) => {
  if (variant === "full") {
    return (
      <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-blue-100 transition-all duration-300 flex flex-col">
        {/* Image */}
        <div className="relative overflow-hidden h-72 w-full bg-gray-100">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
          {/* Gradient overlay at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
          {badge && (
            <span
              className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full border backdrop-blur-sm ${badgeColors[badge] ?? "bg-gray-100 text-gray-600 border-gray-200"}`}
            >
              {badge}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="px-5 py-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold text-gray-900 leading-snug">{name}</h3>
            <p className="mt-1 text-sm font-medium text-blue-600">{role}</p>
          </div>
        </div>
      </div>
    );
  }

  // Compact variant (used on Home page preview)
  return (
    <div className="group bg-white shadow-md rounded-2xl p-5 w-64 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 hover:border-blue-100 flex flex-col items-center text-center">
      <div className="overflow-hidden rounded-xl w-full h-52">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <h3 className="mt-4 text-base font-semibold text-gray-900">{name}</h3>
      <p className="mt-1 text-sm font-medium text-blue-600">{role}</p>
    </div>
  );
};

export default TeamMemberCard;
