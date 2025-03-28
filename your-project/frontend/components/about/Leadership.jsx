import React from 'react'

const Leadership = () => {
    return (
        <div>
            <div>
                <section className="p-10 bg-white border rounded-lg shadow-md hover:shadow-xl transition duration-300">
                    <h2 className="text-4xl font-bold text-center text-gray-800">Meet Our Team</h2>
                    <ul className="mt-6 space-y-4 text-gray-600 text-center">
                        <li className="flex items-center gap-3">
                            <span className="text-blue-600 text-2xl">👨‍💻</span>
                            <span><strong>[Founder/CEO Name]</strong> – Expert in headless CMS architecture.</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-blue-600 text-2xl">👩‍💻</span>
                            <span>[Other Key Team Members]</span>
                        </li>
                    </ul>
                </section>

            </div>
        </div>
    )
}

export default Leadership