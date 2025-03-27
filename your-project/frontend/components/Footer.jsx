import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#05445e] text-white py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top Section */}
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Column 1 - Brand */}
          <div>
            <h2 className="text-2xl font-bold">My<span className="text-[#75e6da]">Brand</span></h2>
            <p className="text-gray-300 mt-2">Your go-to multi-tenant CMS solution.</p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#75e6da] transition">Home</a></li>
              <li><a href="#" className="hover:text-[#75e6da] transition">About</a></li>
              <li><a href="#" className="hover:text-[#75e6da] transition">Blog</a></li>
              <li><a href="#" className="hover:text-[#75e6da] transition">Contact</a></li>
            </ul>
          </div>

          {/* Column 3 - Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="hover:text-[#75e6da] transition">Facebook</a>
              <a href="#" className="hover:text-[#75e6da] transition">Twitter</a>
              <a href="#" className="hover:text-[#75e6da] transition">LinkedIn</a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center text-gray-400 text-sm mt-8 border-t border-gray-600 pt-4">
          &copy; {new Date().getFullYear()} MyBrand. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
