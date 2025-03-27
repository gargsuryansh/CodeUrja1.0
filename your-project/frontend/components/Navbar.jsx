import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-[#0ec937] text-white py-4 px-6 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="text-2xl font-bold tracking-wide">
          My<span className="text-[#75e6da]">Brand</span>
        </a>

        {/* Navigation Links */}
        <ul className="flex space-x-8 text-lg">
          <li>
            <a href="#" className="hover:text-[#75e6da] transition">Home</a>
          </li>
          <li>
            <a href="#" className="hover:text-[#75e6da] transition">Blog</a>
          </li>
          <li>
            <a href="#" className="hover:text-[#75e6da] transition">Store</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
