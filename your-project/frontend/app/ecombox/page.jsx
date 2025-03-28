import React from "react";
import { FaPlus, FaUser, FaBell, FaShoppingCart } from "react-icons/fa";

export default function EcommercePage() {
  return (
    <div className="bg-[#0f0f1a] min-h-screen text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-[#12122b] shadow-md">
        <div className="text-xl font-bold">E-Shop</div>
        <div className="flex space-x-4">
          <FaPlus className="text-2xl cursor-pointer" />
          <FaUser className="text-2xl cursor-pointer" />
          <FaBell className="text-2xl cursor-pointer" />
          <FaShoppingCart className="text-2xl cursor-pointer" />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="grid grid-cols-2 gap-4 p-6">
        <div className="bg-[#2d2d5a] h-64 flex items-center justify-center text-xl font-semibold text-white rounded-lg">
          Discount Offer Image
        </div>
        <div className="bg-[#3b3b75] h-64 flex items-center justify-center text-xl font-semibold text-white rounded-lg">
          Product Promotion Image
        </div>
      </section>

      {/* Filters */}
      <div className="flex justify-center space-x-4 p-4">
        {['Electronics', 'Fashion', 'Home', 'Beauty'].map((filter) => (
          <button key={filter} className="rounded-full px-4 py-2 bg-[#8a2be2] text-white shadow-lg">
            {filter}
          </button>
        ))}
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-3 gap-6 p-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="p-4 shadow-lg rounded-lg border bg-[#24244a] text-white">
            <div className="h-40 bg-[#39398b] mb-2 flex items-center justify-center rounded-md">Image</div>
            <p className="font-semibold">Product Name</p>
            <p className="text-sm text-gray-300">Rating: ⭐⭐⭐⭐</p>
            <p className="text-lg font-bold text-purple-300">$99.99</p>
            <div className="flex space-x-2 mt-2">
              <button className="bg-purple-500 text-white px-3 py-1 rounded-lg shadow-md">Add to Cart</button>
              <button className="bg-purple-700 text-white px-3 py-1 rounded-lg shadow-md">Buy Now</button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="bg-[#12122b] text-white text-center p-4 mt-6">
        <p>&copy; 2025 E-Shop. All rights reserved.</p>
      </footer>
    </div>
  );
}