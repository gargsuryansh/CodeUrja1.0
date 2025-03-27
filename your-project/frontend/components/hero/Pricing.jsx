import React from "react";

const pricingPlans = [
  {
    name: "Basic",
    price: "$9.99/month",
    features: ["1 Website", "5GB Storage", "Basic Support"],
  },
  {
    name: "Pro",
    price: "$19.99/month",
    features: ["5 Websites", "50GB Storage", "Priority Support"],
  },
  {
    name: "Enterprise",
    price: "$49.99/month",
    features: ["Unlimited Websites", "500GB Storage", "24/7 Dedicated Support"],
  },
];

const Pricing = () => {
  return (
    <section className="bg-[#05445e] text-white py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Our Pricing Plans</h2>
        <p className="text-lg text-gray-300 mb-12">
          Choose the plan that fits your needs and scale your business seamlessly.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className="bg-[#189ab4] p-8 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
            >
              <h3 className="text-2xl font-semibold">{plan.name}</h3>
              <p className="text-3xl font-bold mt-2">{plan.price}</p>
              <ul className="mt-4 space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="text-gray-200">
                    ✅ {feature}
                  </li>
                ))}
              </ul>
              <button className="mt-6 bg-white text-[#05445e] px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition">
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
