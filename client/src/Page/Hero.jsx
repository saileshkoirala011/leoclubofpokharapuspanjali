import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GALLERY_IMAGES } from "../utils/constants";

const Hero = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center text-center text-white"
    >
      <img
        src={GALLERY_IMAGES[index]}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
      />

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 px-6 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Leadership, Experience, Opportunity
        </h1>
        <p className="text-lg md:text-xl mb-6 leading-relaxed">
          Join the <span className="font-semibold">Leo Club of Pokhara Puspanjali</span>
          to grow your leadership skills, gain real experience, and explore exciting opportunities.
          Make a difference while having fun start your journey with us today.
        </p>
        <button
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:ring focus:ring-blue-300 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
          onClick={() => navigate("/about")}
        >
          Learn More
        </button>
      </div>
    </section>
  );
};

export default Hero;
