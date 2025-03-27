"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Marquee from "react-fast-marquee";


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <motion.nav
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-black to-blue-800 shadow-lg fixed w-full z-50"
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="text-white text-2xl font-bold flex items-center space-x-2">
                        <Plus size={40} className="text-white" />
                        <span>Event<span className="text-[#75e6da]">Pro</span></span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6">
                        <Link href="/" className="text-white text-2xl text-bold hover:text-[#060c0c] transition">Home</Link>
                        <Link href="ecombox" className="text-white text-2xl text-bold hover:text-[#060c0c] transition">E-com</Link>
                        <Link href="/about" className="text-white text-2xl text-bold hover:text-[#060c0c] transition">About</Link>
                        <Link href="/auth/login" className="text-white text-2xl text-bold hover:text-[#060c0c]  transition">Login</Link>
                        <Link href="/auth/signup" className="text-white text-2xl text-bold hover:text-[#060c0c]  transition">Signup</Link>

                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-white"
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-gradient-to-r from-black to-blue-800 p-4 space-y-3"
                    >
                        <Link href="/" className="block text-white hover:text-[#75e6da]">Home</Link>
                        <Link href="/events" className="block text-white hover:text-[#75e6da]">Events</Link>
                        <Link href="/about" className="block text-white hover:text-[#75e6da]">About</Link>
                        <Link href="/contact" className="block text-white hover:text-[#75e6da]">Contact</Link>
                    </motion.div>
                )}
            </motion.nav>

           

            {/* Hero Section */}
            <section className="relative w-full h-screen flex items-center justify-center bg-black">
                {/* <Image
                    src="/image4.png"
                    alt="Hero Image"
                    fill
                    className="object-cover opacity-80"
                /> */}

<div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-800/50 to-blue-500/20 opacity-80"></div>
      </div>
      
      {/* Hero Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center px-4 max-w-4xl"
      >
        <motion.h1 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight"
        >
          Build Your Online Business in Minutes
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
        >
          Create stunning e-commerce stores and blogs with our all-in-one CMS platform. No coding required.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6, type: "spring" }}
        >
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
            Start Building Now
          </button>
        </motion.div>
      </motion.div>

      {/* Subtle Animated Gradient Overlay */}
      <motion.div 
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-blue-500/10 to-transparent opacity-20"
      ></motion.div>
    </div>


            </section>

              {/* Marquee Section please add here */}
              <Marquee 
                speed={80} 
                gradient={false} 
                loop={0} 
                pauseOnHover={false} 
                className="bg-black text-white py-3 text-xl font-semibold tracking-wide"
            >
                🚀 Welcome to Team Innovator | 🔥 Innovation at its Best | 🎯 Pushing Boundaries | 💡 Creativity Unleashed | 🌟 Join Us!
            </Marquee>

            {/* Left-to-Right Marquee */}
            <Marquee 
                direction="right" 
                speed={60} 
                gradient={false} 
                loop={0} 
                pauseOnHover={false} 
                className="bg-white-900 text-black py-3 text-xl font-semibold tracking-wide"
            >
                🌟 Team Members: Aditya Mudliar | Aditya Giri | Kanak Gupta | Aniket Jadav 🌟
            </Marquee>

            {/* <Marquee 
                speed={80} 
                gradient={false} 
                loop={0} 
                pauseOnHover={false} 
                className="bg-black text-white py-3 text-xl font-semibold tracking-wide"
            >
                Code Urja 1.0 
            </Marquee> */}


            {/* Why Choose Us */}
            <motion.section 
                className="bg-gradient-to-r from-black to-blue-800 text-black py-16 px-6 text-center"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-4xl font-bold mb-6 text-white">Why Choose Us?</h2>
                <p className="max-w-3xl mx-auto text-lg opacity-80 text-white">
                    We provide the best event management platform with seamless booking, interactive experiences, and top-notch customer support.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-8">
                    {["Seamless Experience", "24/7 Support", "Exclusive Features"].map((title, index) => (
                        <motion.div 
                            key={index} 
                            className="w-64 p-6 bg-white bg-opacity-10 rounded-lg"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <h3 className="text-2xl font-bold">{title}</h3>
                            <p className="mt-2 opacity-80">{title === "Seamless Experience" ? "Plan and manage events effortlessly." : title === "24/7 Support" ? "Get help anytime you need it." : "Access tools designed for event success."}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>   

             {/* Latest Updates Section */}
             <motion.section 
                className="bg-gradient-to-r from-black to-blue-800 text-white py-16 px-6 text-center"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-4xl font-bold mb-6">Latest Updates</h2>
                <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-6 text-black">
                    {["New Features Released", "Upcoming Events", "User Testimonials"].map((update, index) => (
                        <motion.div 
                            key={index} 
                            className="bg-white bg-opacity-10 p-8 rounded-lg w-80 text-center shadow-lg"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <h3 className="text-2xl font-bold mb-3">{update}</h3>
                            <p className="text-lg">Stay updated with the latest news and improvements in our event platform.</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>



            <motion.section 
                className="bg-gradient-to-r from-black to-blue-800 text-white py-16 px-6 text-center"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-4xl font-bold mb-6">Pricing Plans</h2>
                <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-6 text-black">
                    {["Basic", "Pro", "Enterprise"].map((plan, index) => (
                        <motion.div 
                            key={index} 
                            className="bg-white bg-opacity-10 p-8 rounded-lg w-80 text-center shadow-lg"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <h3 className="text-2xl font-bold mb-3">{plan} Plan</h3>
                            <p className="text-lg mb-4">Perfect for {plan === "Basic" ? "individuals" : plan === "Pro" ? "small teams" : "large organizations"}.</p>
                            <p className="text-3xl font-bold text-[#231ea6]">${plan === "Basic" ? "9.99" : plan === "Pro" ? "29.99" : "99.99"}/mo</p>
                            <button className="mt-4 bg-[#193aa6] text-white px-5 py-2 rounded-lg font-bold hover:bg-[#1b2221] transition">Choose Plan</button>
                        </motion.div>
                    ))}
                </div>
            </motion.section>


           <motion.section 
                className="bg-gradient-to-r from-black to-blue-800 text-white py-16 px-6 text-center"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
                <p className="max-w-3xl mx-auto text-lg opacity-80">
                    Have questions? Reach out to us and we'll get back to you as soon as possible.
                </p>
                <form className="mt-8 max-w-lg mx-auto">
                    <input type="text" placeholder="Your Name" className="w-full p-3 mb-4 rounded-lg bg-white bg-opacity-10 text-black" />
                    <input type="email" placeholder="Your Email" className="w-full p-3 mb-4 rounded-lg bg-white bg-opacity-10 text-black" />
                    <textarea placeholder="Your Message" className="w-full p-3 mb-4 rounded-lg bg-white bg-opacity-10 text-black"></textarea>
                    <button className="bg-[#189ab4] text-white px-5 py-2 rounded-lg font-bold hover:bg-[#ffffff] transition">Send Message</button>
                </form>
            </motion.section>

            <footer className="bg-black text-white py-4 px-6 text-center mt-6 text-xs">
                <p>&copy; 2025 EventPro. All rights reserved.</p>
                <p className="mt-1">Your trusted event management partner, ensuring seamless and unforgettable experiences.</p>
                <div className="flex justify-center space-x-3 mt-2">
                    <span className="hover:text-[#75e6da] cursor-pointer">Privacy Policy</span>
                    <span>|</span>
                    <span className="hover:text-[#75e6da] cursor-pointer">Terms of Service</span>
                </div>
            </footer>   
            



        </>
    );
};

export default Navbar;
