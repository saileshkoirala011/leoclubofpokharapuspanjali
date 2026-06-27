import React from "react";
import about from "../assets/image.jpeg";
import SocialLinks from "../Components/ui/SocialLinks";

const About = () => {
  return (
    <section
      id="about"
      className="py-20 bg-white flex items-center justify-center"
    >
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Left: Image */}
        <div>
          { <img
            src={about}
            alt="Leo Club Members"
            className="rounded-lg shadow-lg"
          /> }
        </div>

        {/* Right: Text */}
        <div className="text-gray-700">
          <h3 className="text-xl font-semibold text-black -900 mb-2">
            Leo Club of Pokhara Puspanjali 
          </h3>
          <h2 className="text-4xl font-bold text-blue-600 mb-4">
            Who We Are ?
          </h2>
          <p className="mb-4 leading-relaxed">
            The Leo Club of Pokhara Puspanjali  is a dedicated children's
            organization operating under the esteemed International Lions Club,
            which spans the globe. Our club, located in the beautiful city of
            Pokhara, Nepal, is committed to nurturing young leaders and fostering
            a sense of community service among the youth.
          </p>
          <p className="leading-relaxed">
            As a non-profit organization, we focus on empowering children and
            teenagers to develop leadership skills, engage in meaningful
            community projects, and make a positive impact in their surroundings.
            Through various activities and initiatives, we strive to build a
            brighter future for our community and beyond.
          </p>

          {/* Social Media Icons */}
          <div className="mt-8">
            <SocialLinks variant="colored" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
