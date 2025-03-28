import React from 'react'

const MissionVision = () => {
  return (
    <div>
      <div>
        <section className="p-10 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition duration-300">
          <h2 className="text-4xl font-bold text-center text-gray-800">Our Mission & Vision</h2>
          <div className="mt-4 text-gray-600 text-lg space-y-4 text-center">
            <p><span className="font-semibold">🚀 Mission:</span> Revolutionizing content management with an API-first, scalable CMS.</p>
            <p><span className="font-semibold">🌍 Vision:</span> Empowering developers and creators with fast, flexible integrations.</p>
          </div>
        </section>
        {/* <section className="p-10 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-center text-gray-800">Our Mission & Vision</h2>
                <div className="mt-4 text-gray-600 text-lg text-center">
                    <p className=' '><strong>Mission:</strong> To revolutionize content management by providing a seamless, API-first CMS.</p>
                    <p><strong>Vision:</strong> To empower developers with an efficient, scalable, and flexible CMS.</p>
                </div>
            </section> */}
      </div>
    </div>
  )
}

export default MissionVision