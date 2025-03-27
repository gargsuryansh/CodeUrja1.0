import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router
import { FaGlobe, FaSatellite, FaMapMarkedAlt, FaHandsHelping, FaUsers, FaCheckCircle, FaRocket } from 'react-icons/fa'; // React Icons


 
const AboutUs = () => {
  return (
    
   
    <div className="bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-6">
      <div className="max-w-5xl mx-auto text-center">
        {/* 🌟 Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-6 tracking-wide animate-fade-in">About Us – Disaster Management Platform</h1>

        {/* 🔥 Introduction */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-8 transition-transform hover:scale-105">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
          <p className="text-gray-700 leading-relaxed">
            Disasters, whether natural or man-made, can cause immense loss of life and resources. Our Disaster Management Platform provides **real-time alerts, resources, and support networks** to ensure efficient response and recovery.
          </p>
        </section>

        {/* 🎯 Our Mission */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-8 transition-transform hover:scale-105">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            Empowering communities with **real-time disaster alerts, survival resources, and volunteer coordination**. We leverage technology to improve disaster preparedness, response, and recovery.
          </p>
        </section>

        {/* ⚡ Why This Platform? */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-8 transition-transform hover:scale-105">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why This Platform?</h2>
          <ul className="text-gray-700 space-y-3">
            <li className="flex items-center"><FaSatellite className="mr-3 text-blue-500" /> **Live Disaster Alerts** – Real-time updates about ongoing emergencies.</li>
            <li className="flex items-center"><FaMapMarkedAlt className="mr-3 text-green-500" /> **Disaster Map** – Visual representation of affected areas & safe zones.</li>
            <li className="flex items-center"><FaGlobe className="mr-3 text-yellow-500" /> **Emergency Resources** – Survival guides, medical tips & contact numbers.</li>
            <li className="flex items-center"><FaUsers className="mr-3 text-purple-500" /> **Report Incidents** – Users can report disasters & request help.</li>
            <li className="flex items-center"><FaHandsHelping className="mr-3 text-red-500" /> **Volunteer & Donation System** – Connects individuals to relief efforts.</li>
          </ul>
        </section>

        {/* 🚀 Our Vision */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-8 transition-transform hover:scale-105">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            We aim to build a **global disaster response network**, connecting affected communities with **relief agencies, first responders, and volunteers** for faster, efficient disaster management.
          </p>
        </section>

        {/* ⚙️ How It Works? */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-8 transition-transform hover:scale-105">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">How It Works?</h2>
          <ul className="text-gray-700 space-y-3">
            <li>🚨 **Live Alerts & Notifications** – Real-time updates on earthquakes, floods, etc.</li>
            <li>🗺 **Interactive Disaster Map** – Affected areas, shelters, and emergency services.</li>
            <li>📢 **Incident Reporting** – Users report disasters with photos/videos & locations.</li>
            <li>📖 **Resource Hub** – Guides for survival, medical help, and evacuation plans.</li>
            <li>🤝 **Volunteer & Donation Portal** – Users can register, donate funds, or provide supplies.</li>
          </ul>
        </section>

        {/* 🏆 Our Achievements */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-8 transition-transform hover:scale-105">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Achievements</h2>
          <ul className="text-gray-700 space-y-3">
            <li className="flex items-center"><FaCheckCircle className="mr-3 text-green-500" /> Assisted thousands of disaster-affected people.</li>
            <li className="flex items-center"><FaCheckCircle className="mr-3 text-green-500" /> Provided real-time alerts and rescue support.</li>
            <li className="flex items-center"><FaCheckCircle className="mr-3 text-green-500" /> Partnered with leading relief organizations.</li>
          </ul>
        </section>

        {/* 🚀 Join Us */}
        <section className="bg-gray-800 text-white p-6 rounded-lg shadow-md transition-transform hover:scale-105">
          <h2 className="text-2xl font-semibold mb-4">Join Us</h2>
          <p className="text-gray-300 mb-4">
            **Every action matters!** Whether it's sharing alerts, volunteering, or donating – be a part of the solution.
          </p>
          <p className="text-yellow-400 font-semibold">
            <FaRocket className="inline mr-2" /> **Be Informed. Stay Safe. Take Action.** 🚀
          </p>
        </section>
       
      </div>
    </div>
  );
};

export default AboutUs;
