import React from "react";

const badgeStyles = {
  Founder:    "bg-amber-100 text-amber-700 border-amber-200",
  President:  "bg-blue-100 text-blue-700 border-blue-200",
  Leadership: "bg-violet-100 text-violet-700 border-violet-200",
};

const TeamMemberCard = ({ name, role, image, badge, variant = "compact" }) => {
  if (variant === "full") {
    return (
      <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
        <div className="relative overflow-hidden h-72 bg-gray-100">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
          {badge && (
            <span className={`absolute top-3 right-3 text-[11px] font-semibold px-2.5 py-1 rounded-full border backdrop-blur-sm ${badgeStyles[badge] ?? "bg-gray-100 text-gray-600 border-gray-200"}`}>
              {badge}
            </span>
          )}
        </div>
        <div className="px-5 py-4">
          <h3 className="text-[15px] font-semibold text-gray-900 leading-snug">{name}</h3>
          <span className="inline-block mt-1.5 text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
            {role}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white shadow-sm hover:shadow-xl rounded-2xl p-5 w-60 border border-gray-100 hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center">
      <div className="overflow-hidden rounded-xl w-full h-48 mb-4">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <h3 className="text-[15px] font-semibold text-gray-900 leading-snug">{name}</h3>
      <span className="inline-block mt-1.5 text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
        {role}
      </span>
    </div>
  );
};

export default TeamMemberCard;
