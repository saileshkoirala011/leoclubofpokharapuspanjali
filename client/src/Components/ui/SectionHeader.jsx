import React from "react";

const SectionHeader = ({ title, subtitle, icon, className = "" }) => (
  <div className={`text-center ${className}`}>
    <h2 className="text-5xl font-bold text-blue-700 mb-4 flex items-center justify-center gap-3">
      {icon && icon}
      {title}
    </h2>
    {subtitle && (
      <p className="text-gray-700 max-w-2xl mx-auto text-lg leading-relaxed">
        {subtitle}
      </p>
    )}
  </div>
);

export default SectionHeader;
