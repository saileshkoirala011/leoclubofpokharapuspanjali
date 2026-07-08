import React from "react";
import PageLayout from "./ui/PageLayout";
import SectionHeader from "./ui/SectionHeader";
import { GALLERY_IMAGES } from "../utils/constants";

const Gallery = () => {
  return (
    <PageLayout>
      {/* Header */}
      <div className="text-center pt-32 mb-16 px-6">
        <SectionHeader
          title="Gallery"
          subtitle="Explore moments captured from our events, meetings, and community service projects."
        />
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {GALLERY_IMAGES.map((img, index) => (
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
    </PageLayout>
  );
};

export default Gallery;
