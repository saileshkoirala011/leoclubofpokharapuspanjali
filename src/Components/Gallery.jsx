import React from "react";
import Footer from "../Page/Footer";
import { Link } from "react-router-dom";
import gallery1 from "../assets/image.jpeg";
import gallery2 from "../assets/image2.jpeg";
import gallery3 from "../assets/image3.jpg";
import gallery4 from "../assets/image4.jpg";
import gallery5 from "../assets/image5.jpg";


const Gallery = () => {
  const images = [
    gallery1,
    gallery2,
    gallery3,
    gallery4,
    gallery5,
    
  ];

  return (
    <div className="bg-gradient-to-b from-white to-blue-50">
      
      {/* Header */}
      <div className="text-center pt-32 mb-16 px-6">
        <h2 className="text-5xl font-bold text-blue-700 tracking-wide mb-4">
          Gallery
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto text-lg leading-relaxed">
          Explore moments captured from our events, meetings, and community service projects.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {images.map((img, index) => (
          <div
            key={index}
            className="group overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl border border-gray-200 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
          >
            <div className="relative overflow-hidden h-64">
              <img
                src={img}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Gallery;
