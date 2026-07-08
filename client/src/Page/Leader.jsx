import React from "react";
import leader from "../assets/dayasagarparajuli.jpg";

const Hero = ({
  title = "Helping Today’s Young Minds Become Tomorrow’s Leaders.",
  description = "Welcome to the Leo Club of Pokhara Puspanjali. Our goal is to help young people grow into strong leaders by serving our community and learning together. Every member plays a vital role in making a positive difference. Let's work together to create a brighter future for everyone.",
  name = "Dayasagar Parajuli",
  subtitle = "PRESIDENT, LEO CLUB OF POKHARA PUSPANJALI",
}) => {
  return (
    <section className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-6 leading-tight text-blue-700">
          "{title}"
        </h1>

        <p className="mt-8 text-gray-700 text-lg md:text-xl lg:text-xl leading-relaxed max-w-3xl mx-auto font-light">
          {description}
        </p>

        <div className="mt-12 flex flex-col items-center">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur opacity-30"></div>
            <img
              src={leader}
              alt={`${name} portrait`}
              width={96}
              height={96}
              className="relative w-28 h-28 md:w-28 md:h-28 rounded-full object-cover ring-4 ring-white shadow-lg"
            />
          </div>
          <h3 className="mt-6 text-2xl font-bold text-gray-900">{name}</h3>
          <p className="mt-3 text-sm text-blue-600 uppercase tracking-wider font-semibold">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;