import React from "react";
import Footer from "../../Page/Footer";

const PageLayout = ({ children, className = "" }) => (
  <div className={`bg-gradient-to-b from-white to-blue-50 ${className}`}>
    {children}
    <Footer />
  </div>
);

export default PageLayout;
