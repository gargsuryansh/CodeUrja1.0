import React from "react";

const Hero = () => {
  return (
    <div className="bg-[#5d5e05] text-white py-12">
      {/* Container for Hero Section */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 px-6">
        
        {/* Left Section */}
        <div className="bg-[#189ab4] p-6 w-full rounded-lg shadow-lg">
          <div className="bg-[#75e6da] p-4 rounded-lg mb-4">D</div>
          <div className="bg-[#75e6da] p-4 rounded-lg mb-4">E</div>
          <div className="bg-[#75e6da] p-4 rounded-lg mb-4">E</div>

          {/* Nested Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-400 p-6 rounded-lg">1</div>
            <div className="bg-amber-700 p-6 rounded-lg">1</div>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-[#189ab4] p-6 w-full rounded-lg shadow-lg flex items-center justify-center">
          <div className="bg-purple-400 p-6 rounded-lg shadow-md">S</div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
