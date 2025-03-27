import React, { useState } from 'react'
import { FaBell, FaQuestionCircle, FaGithub } from 'react-icons/fa';
import { Home, Bell, Map, Info, Mail } from "lucide-react"; // Import icons
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Navbar() {
  

  return (



    <div className="font-sans">
     
      {/* Navigation Bar */}
      <nav className="bg-indigo-950 shadow">
        <div className="container mx-auto py-4 flex items-center justify-between">
          {/* Logo and Search */}
          <div className="flex items-center space-x-4 ">
            <a href="/login" className="flex items-center space-x-2 ">
              <img src={logo} alt="Flowbite Logo" className="h-11 w-16 rounded-full  shadow-md " />
              <span className="font-extrabold text-2xl md:text-3xl text-white tracking-wider drop-shadow-lg">
                Pralay<span className="text-green-400">Alert</span>

                </span>
            </a>
           
          </div>

          {/* Navigation Links */}
          
          <div className="flex items-center space-x-6">
      {/* Navbar Items */}
      {[
        { name: "Home", icon: <Home size={16} /> },
        { name: "Live Alerts", icon: <Bell size={18} /> },
        { name: "Disaster Map", icon: <Map size={18} /> },
        { name: "About Us", icon: <Info size={18} /> },
        { name: "Contact Us", icon: <Mail size={18} /> }
      ].map((item, index) => (
        <Link
          key={index}
          to="/login"
          className="relative flex items-center space-x-2 text-sm text-white font-semibold transition-all duration-300 hover:text-yellow-400 group"
        >
          {/* Icon */}
          {item.icon}
          {/* Text */}
          <span>{item.name}</span>
          {/* Underline Effect */}
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
        </Link>
      ))}
    </div>

          {/* User Icons */}
          <div className="flex items-center space-x-3">
            <FaBell className="text-gray-500 text-lg" />
            <FaQuestionCircle className="text-gray-500 text-lg" />
            <FaGithub className="text-gray-500 text-lg" />
            
          </div>
         <div className='flex justify-end gap-3'>
         <Link to="/login">
  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg">
    Login
  </button>
</Link>
<Link to="/register">
  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg">
    Register
  </button>
</Link>
         </div>
        </div>
      </nav>

    </div>
  )
}

export default Navbar