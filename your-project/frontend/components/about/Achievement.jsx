import React from 'react'

const Achievements = () => {
    return (
        <div>
            <div>
                <section className="p-10 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition duration-300 text-center">
                    <h2 className="text-4xl font-bold text-center">Our Achievements</h2>
                    <ul className="mt-6 space-y-2 text-lg">
                        <li>🏆 Deployed in <strong>[X]</strong> multi-tenant environments.</li>
                        <li>⚡ Reduced content latency by <strong>[X]%</strong>.</li>
                    </ul>
                </section>
            </div>
        </div>
    )
}

export default Achievements