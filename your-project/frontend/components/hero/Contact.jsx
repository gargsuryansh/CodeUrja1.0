import React from "react";

const Contact = () => {
  return (
    <section className="bg-[#05445e] text-white py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
        <p className="text-lg text-gray-300 mb-12">
          Have questions or need help? Reach out to us anytime.
        </p>

        <div className="bg-[#189ab4] p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
          <form className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-left text-white font-semibold">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 mt-2 text-black rounded-lg focus:ring-2 focus:ring-[#75e6da] focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-left text-white font-semibold">Your Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 mt-2 text-black rounded-lg focus:ring-2 focus:ring-[#75e6da] focus:outline-none"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-left text-white font-semibold">Your Message</label>
              <textarea
                placeholder="Write your message here..."
                rows="4"
                className="w-full px-4 py-2 mt-2 text-black rounded-lg focus:ring-2 focus:ring-[#75e6da] focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#75e6da] text-[#05445e] font-bold py-2 rounded-lg hover:bg-white transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
