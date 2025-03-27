import React from "react";

const WhyChooseUs = () => {
  return (
    <section className="bg-[#05445e] text-white py-16">
      <div className="max-w-6xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
        <p className="text-lg text-gray-300 mb-12">
          We provide a seamless, multi-tenant CMS designed for <strong>speed, security, and scalability</strong>.
        </p>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-[#189ab4] p-6 rounded-lg shadow-lg text-center">
            <div className="text-4xl mb-4">🔒</div> {/* Using emoji instead of an icon */}
            <h3 className="text-xl font-semibold mb-2">Enterprise-Grade Security</h3>
            <p className="text-gray-200">We use top-level security standards to keep your data safe.</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-[#189ab4] p-6 rounded-lg shadow-lg text-center">
            <div className="text-4xl mb-4">⚡</div> {/* Using emoji */}
            <h3 className="text-xl font-semibold mb-2">Lightning-Fast Performance</h3>
            <p className="text-gray-200">Optimized for <strong>speed and scalability</strong> with Next.js.</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-[#189ab4] p-6 rounded-lg shadow-lg text-center">
            <div className="text-4xl mb-4">👥</div> {/* Using emoji */}
            <h3 className="text-xl font-semibold mb-2">Multi-Tenant & Customizable</h3>
            <p className="text-gray-200">Easily manage multiple clients and businesses on one platform.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
