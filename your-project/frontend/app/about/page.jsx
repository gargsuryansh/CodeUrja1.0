"use client";

import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black to-purple-900 text-white">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-6 text-center bg-purple-800 shadow-lg rounded-b-lg"
      >
        <h1 className="text-4xl font-extrabold tracking-wide w-3/4 mx-auto shadow-xl p-2 border-b-4 border-purple-500 hover:scale-105 transition-transform duration-300">About Our Project</h1>
      </motion.div>

      {/* Content Section */}
      <div className="container mx-auto px-8 py-16 flex flex-col space-y-12">
        {/* Problem Statement */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-8 bg-gradient-to-r from-black to-purple-800 rounded-lg shadow-md border-l-4 border-purple-500 transition"
        >
          <h2 className="text-3xl font-bold mb-3">📌 Problem Statement</h2>
          <p>
            We built a <strong>Multi-Tenant Headless CMS</strong> for <strong>blogs, e-commerce, and content platforms</strong>. Our aim was to
            create a <strong>scalable, flexible, and efficient</strong> system that allows multiple businesses to manage content
            independently while sharing a unified infrastructure.
          </p>
        </motion.div>

        {/* Solution */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-8 bg-gradient-to-r from-black to-purple-800 rounded-lg shadow-md border-l-4 border-purple-500 transition"
        >
          <h2 className="text-3xl font-bold mb-3">🚀 Solution</h2>
          <p>
            We designed and developed a <strong>scalable</strong> multi-tenant architecture using <strong>Next.js, GraphQL, and a dynamic
            database system</strong>. Each tenant manages its content while utilizing shared resources in a <strong>secure and
            optimized</strong> manner.
          </p>
        </motion.div>

        {/* Key Challenges */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-8 bg-gradient-to-r from-black to-purple-800 rounded-lg shadow-md border-l-4 border-purple-500 transition"
        >
          <h2 className="text-3xl font-bold mb-3">⚠️ Key Challenges</h2>
          <ul className="list-disc list-inside space-y-3">
            <li>🔹 Implementing <strong>separate database instances</strong> dynamically.</li>
            <li>🔹 Providing <strong>GraphQL & REST API</strong> access per tenant.</li>
            <li>🔹 Ensuring <strong>security & scalability</strong> across tenants.</li>
            <li>🔹 Managing <strong>user authentication & role-based access control (RBAC)</strong>.</li>
          </ul>
        </motion.div>

        {/* Team Members */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-8 bg-gradient-to-r from-black to-purple-800 rounded-lg shadow-md border-l-4 border-purple-500 transition"
        >
          <h2 className="text-3xl font-bold mb-3">👨‍💻 Team Members</h2>
          <div className="flex flex-wrap gap-3">
            {["Aditya Giri", "Aditya Mudliar", "Aniket Jatav", "Kanak Gupta"].map((member, index) => (
              <span
                key={index}
                className="bg-purple-600 text-white px-4 py-2 rounded-full text-lg font-medium shadow-md"
              >
                {member}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
