import React, { useState } from 'react';
import { MapPin, Shield, Clock, Check, Star } from 'lucide-react';
import { useNavigate } from "react-router-dom";


const Hero = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/register-land");
  };

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Tamper-Proof Records",
      description: "Secure blockchain technology ensures your land records remain unalterable and trustworthy."
    },
    {
      icon: <Check className="w-8 h-8 text-primary" />,
      title: "Secure Verification",
      description: "Multi-level verification process through government and banking institutions."
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Quick Processing",
      description: "Fast and efficient online processing of all land-related transactions."
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "John Smith",
      role: "Property Owner",
      content: "The digital land management system has made it incredibly easy to manage my properties. The verification process is smooth and secure.",
      rating: 5,
      image: "https://placehold.co/100x100"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Bank Manager",
      content: "As a banking professional, this system has streamlined our property verification process. It's reliable and efficient.",
      rating: 5,
      image: "https://placehold.co/100x100"
    },
    {
      id: 3,
      name: "Michael Brown",
      role: "Government Official",
      content: "The platform has revolutionized how we handle land records. It's secure, transparent, and user-friendly.",
      rating: 5,
      image: "https://placehold.co/100x100"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white">
              Digital Land Management System
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Secure, transparent, and efficient land record management powered by cutting-edge technology
            </p>
            <div className="flex gap-4 justify-center">
              <button className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              onClick={handleClick}
              >
                Get Started
              </button>
              <button className="px-8 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto mt-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              ["10K+", "Registered Properties"],
              ["99.9%", "Secure Transactions"],
              ["24/7", "System Availability"]
            ].map(([stat, label]) => (
              <div key={label} className="text-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg">
                <div className="text-3xl font-bold text-primary">{stat}</div>
                <div className="text-gray-600 dark:text-gray-300 mt-2">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-xl transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            What Our Users Say
          </h2>
          <div className="relative">
            <div className="flex overflow-hidden">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`w-full flex-shrink-0 transition-transform duration-500 ${
                    index === activeTestimonial ? 'translate-x-0' : 'translate-x-full'
                  }`}
                >
                  <div className="max-w-2xl mx-auto text-center">
                    <div className="flex justify-center mb-6">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-20 h-20 rounded-full"
                      />
                    </div>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                      "{testimonial.content}"
                    </p>
                    <div className="flex justify-center mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeTestimonial
                      ? 'bg-primary'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who trust our platform for their land management needs
          </p>
          <button className="px-8 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors">
            Register Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Hero;
