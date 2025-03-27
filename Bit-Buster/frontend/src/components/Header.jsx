import React, { useState } from 'react'


function Header() {
 
   
 
    return (
       
        <header className="relative h-[550px] bg-gradient-to-r from-blue-800 via-blue-900 to-green-600 text-white flex flex-col items-center justify-center text-center px-6 md:px-12 overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
            Real-Time Disaster Response & Volunteer Management
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Stay Updated. Stay Safe.
          </p>
          <button className="mt-6 bg-green-400 text-blue-900 px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-green-500 transition-all transform hover:scale-105">
            Join This Mission
          </button>
        </div>
      </header>
   
        
      
    )
}

export default Header