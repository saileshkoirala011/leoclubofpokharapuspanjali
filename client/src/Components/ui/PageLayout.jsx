import React from "react";

const PageLayout = ({ children, className = "" }) => (
  <div className={`bg-gradient-to-b from-white to-blue-50 min-h-screen ${className}`}>
    {children}
  </div>
);

export default PageLayout;
