import React from 'react'

const Testimonials = () => {
    return (
        <div>
            <div>
                <section className="p-10 bg-[#85e7fa] border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition duration-300 text-center">
                    <h2 className="text-4xl font-bold text-center">What Our Clients Say</h2>
                    <div className="mt-6 space-y-2 text-lg">
                        <blockquote className="p-2 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition duration-300 text-center">
                            "Switching to [Your CMS Name] improved our performance massively." <br />
                            <span className="block mt-2 text-right font-semibold">- Client A</span>
                        </blockquote>
                        <blockquote className="p-2 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition duration-300 text-center">
                            "An absolute game-changer for multi-tenant content management." <br />
                            <span className="block mt-2 text-right font-semibold">- Client B</span>
                        </blockquote>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Testimonials