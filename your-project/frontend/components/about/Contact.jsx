import React from 'react'

const Contact = () => {
  return (
    <div>
        <div>
        <section className="p-10 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition duration-300 text-center" >
          <h2 className="text-4xl font-bold">Get in Touch</h2>
          <p className="mt-2 text-lg">📧 Email: [your email] | 📞 Phone: [your contact]</p>
          <button className="mt-6 bg-white text-blue-500 px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition text-lg font-bold">
            Request a Demo
          </button>
        </section>

        </div>
    </div>
  )
}

export default Contact