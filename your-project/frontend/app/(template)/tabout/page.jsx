import React from 'react'
import Introduction from '@/componets/about/Introduction'
import MissionVision from '@/componets/about/MissionVision'
import History from '@/componets/about/History'
import Leadership from '@/componets/about/Leadership'
import ValueCulture from '@/componets/about/ValueCulture'
import Achievements from '@/componets/about/Achievements'
import Testimonials from '@/componets/about/Testimonials'
import Contact from '@/componets/about/Contact'


const page = () => {
  return (
    <div>
      <div className=' p-8 '>
        <div>
        <Introduction/>
        </div>
        <div className=' p-8 bg-[#189ab4]'><MissionVision/></div>
        <div className=' p-8 '><History/></div>
        <div className=' p-8 bg-[#189ab4]'><Leadership/></div>
        <div className=' p-8 '><ValueCulture/></div>
        <div className=' p-8 bg-[#189ab4]'><Achievements/></div>
        <div className=' p-8 '><Testimonials/></div>
        <div className=' p-8 bg-[#189ab4]'><Contact/></div>

{/*         
      <Introduction/>
      <MissionVision/>
      <History/>
      <Leadership/>
      <ValueCulture/>
      <Achievements/>
      <Testimonials/>
      <Contact/> */}

      </div>
      

      
    </div>
  )
}

export default page