import Footer from "@/componets/Footer"
import Contact from "@/componets/hero/Contact"
import Faq from "@/componets/hero/Faq"
import Hero from "@/componets/hero/Hero"
import Latest from "@/componets/hero/Latest"
import Pricing from "@/componets/hero/Pricing"
import Testimonial from "@/componets/hero/Testimonial"

import WhyChoseUs from "@/componets/hero/WhyChoseUs"
import Navbar from "@/componets/Navbar"

const page = () => {
  return (
    <div>
        <Navbar/>
        <Hero />
        <WhyChoseUs/>  
        <Faq/>
        <Testimonial/>
        <Pricing/>
        <Latest/>
        <Contact/>
        <Footer/>
    </div>
  )
}

export default page