import React from "react";  
// replace with your image path
import { FaFacebook, FaInstagram } from "react-icons/fa";
import about from "../assets/image.jpeg";

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
            src={about} // replace with your image path
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
            The Leo Club of Pokhara Puspanjali  is a dedicated children’s
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
          <div className="flex space-x-4 mt-8">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-700 text-white p-3 rounded-full hover:bg-blue-800 transition"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition"
            >
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
