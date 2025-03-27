import React from "react";

const latestUpdates = [
  {
    title: "Introducing Our New Event Management Features",
    date: "March 20, 2025",
    description: "We have launched new tools to make event planning seamless and efficient.",
  },
  {
    title: "How Multi-Tenant CMS is Changing the Industry",
    date: "March 15, 2025",
    description: "Explore how multi-tenant CMS enhances scalability for businesses.",
  },
  {
    title: "Security Enhancements for Your Data Safety",
    date: "March 10, 2025",
    description: "We have upgraded our platform with enterprise-level security updates.",
  },
];

const LatestUpdates = () => {
  return (
    <section className="bg-[#05445e] text-white py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Latest Updates</h2>
        <p className="text-lg text-gray-300 mb-12">
          Stay up-to-date with our latest news, features, and improvements.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {latestUpdates.map((update, index) => (
            <div
              key={index}
              className="bg-[#189ab4] p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
            >
              <h3 className="text-xl font-semibold">{update.title}</h3>
              <p className="text-gray-200 text-sm mb-2">{update.date}</p>
              <p className="text-gray-100">{update.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestUpdates;
