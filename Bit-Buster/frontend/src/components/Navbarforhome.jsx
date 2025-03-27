import React, { useState } from 'react'
import { FaSearch, FaBell, FaQuestionCircle, FaGithub } from 'react-icons/fa'; // Import icons
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Navbarforhome() {


  return (



    <div className="font-sans">
     
      {/* Navigation Bar */}
      <nav className=" bg-blue-900 shadow">
        <div className="container mx-auto py-4 flex items-center justify-between">
          {/* Logo and Search */}
          <div className="flex items-center space-x-4 ">
            <a href="/" className="flex items-center space-x-2 ">
              <img src={logo} alt="Flowbite Logo" className="h-11 w-16 rounded-full  shadow-md " />
                           <span className="font-extrabold text-2xl md:text-3xl text-white tracking-wider drop-shadow-lg">
               Pralay<span className="text-green-400">Alert</span>
             
             </span>
            </a>
            <div className="relative">
              <input type="text" placeholder="Search" className="border rounded-md px-3 py-1 text-lg focus:outline-none focus:ring focus:border-blue-300" />
              <FaSearch className="absolute right-3 top-2 text-gray-400" />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            
           <Link to="/" className="relative flex items-center space-x-2 text-sm text-white font-semibold transition-all duration-300 hover:text-yellow-400 group"
                   >Home<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
           <Link to="/smsalert" className="relative flex items-center space-x-2 text-sm text-white font-semibold transition-all duration-300 hover:text-yellow-400 group"
                   >Live Alerts<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
           <Link to="/disastermap" className="relative flex items-center space-x-2 text-sm text-white font-semibold transition-all duration-300 hover:text-yellow-400 group"
                   >Disaster Map<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
           <Link to="/aboutus" className="relative flex items-center space-x-2 text-sm text-white font-semibold transition-all duration-300 hover:text-yellow-400 group"
                   >About Us<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
           <Link to="/footer" className="relative flex items-center space-x-2 text-sm text-white font-semibold transition-all duration-300 hover:text-yellow-400 group"
                   >Contact Us<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* User Icons */}
          {/* <div className="flex items-center space-x-3">
            <FaBell className="text-gray-500 text-lg" />
            <FaQuestionCircle className="text-gray-500 text-lg" />
            <FaGithub className="text-gray-500 text-lg" />
            
          </div> */}
         <div className='flex justify-end gap-3'>
         <Link to="/login">
  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg">
    Logout
  </button>
</Link>

         </div>
        </div>
      </nav>

    </div>
  )
}

export default Navbarforhome