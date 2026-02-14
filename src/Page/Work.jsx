import React from "react";
import { FaHandshake, FaLeaf, FaBook, FaUsers } from "react-icons/fa";

const Work = () => {
  const workItems = [
    {
      icon: <FaHandshake className="text-red-500 text-4xl mb-4" />,
      title: "Community Service",
      desc: "Organizing blood donation drives, health camps, and social awareness programs to support the community.",
    },
    {
      icon: <FaLeaf className="text-green-500 text-4xl mb-4" />,
      title: "Environment",
      desc: "Tree plantation, clean-up campaigns, and spreading awareness about sustainability and eco-friendly practices.",
    },
    {
      icon: <FaBook className="text-blue-600 text-4xl mb-4" />,
      title: "Education",
      desc: "Supporting schools, distributing learning materials, and conducting workshops for students.",
    },
    {
      icon: <FaUsers className="text-purple-600 text-4xl mb-4" />,
      title: "Youth Empowerment",
      desc: "Leadership training, skill development workshops, and programs to inspire young people for a brighter future.",
    },
  ];

  return (
    <section id="work" className="py-24 bg-gradient-to-b from-white via-blue-50 to-white text-center">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="mb-16">
          <h2 className="text-5xl font-bold text-blue-700 mb-4 flex items-center justify-center gap-3">
            <FaUsers className="text-blue-600 text-4xl" />
            Our Work
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
            At <span className="font-semibold text-gray-900">Leo Club of Pokhara Puspanjali</span>, 
            we are committed to impactful community service, environmental protection, education, 
            and youth empowerment. Here are some of the key areas we focus on:
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {workItems.map((item, index) => (
            <div
              key={index}
              className="group bg-white shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 rounded-2xl p-8 flex flex-col items-center text-center border border-gray-100 hover:border-blue-200"
            >
              <div className="transform group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
