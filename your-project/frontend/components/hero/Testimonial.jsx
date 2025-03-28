import React from "react";

const testimonials = [
  {
    name: "John Doe",
    role: "CEO, TechCorp",
    image: "https://via.placeholder.com/80",
    feedback: "This platform transformed the way we manage content. Highly recommended!",
  },
  {
    name: "Jane Smith",
    role: "Marketing Head, BrandX",
    image: "https://via.placeholder.com/80",
    feedback: "The speed and security of this CMS are top-notch. A game-changer!",
  },
  {
    name: "Michael Lee",
    role: "Founder, StartupZ",
    image: "https://via.placeholder.com/80",
    feedback: "Super easy to use and fully customizable. Exactly what I needed!",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-[#05445e] text-white py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Clients Say</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#189ab4] p-6 rounded-lg shadow-lg text-center transform transition duration-300 hover:scale-105"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 mx-auto rounded-full mb-4 border-4 border-white"
              />
              <p className="text-gray-200 italic mb-4">"{testimonial.feedback}"</p>
              <h3 className="text-xl font-semibold">{testimonial.name}</h3>
              <p className="text-gray-300">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
