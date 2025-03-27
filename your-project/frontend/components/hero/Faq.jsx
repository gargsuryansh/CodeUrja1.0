


"use client";  // Add this line what is this dont know

import React, { useState } from "react";

const faqData = [
  {
    question: "What is a multi-tenant CMS?",
    answer:
      "A multi-tenant CMS allows multiple users or businesses to manage their content independently within a single platform.",
  },
  {
    question: "Is this CMS scalable?",
    answer:
      "Yes, our CMS is designed to handle small blogs to large enterprise applications efficiently.",
  },
  {
    question: "Can I customize the platform?",
    answer:
      "Absolutely! Our CMS is highly customizable to fit your business needs.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, we use top-level security measures, including encryption and regular security audits, to keep your data safe.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#05445e] text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-[#189ab4] p-5 rounded-lg shadow-md cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{item.question}</h3>
                <span className="text-2xl">{openIndex === index ? "−" : "+"}</span>
              </div>
              {openIndex === index && (
                <p className="mt-3 text-gray-200">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
