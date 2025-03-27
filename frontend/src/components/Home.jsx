import React from 'react';
import { useSpring } from 'react-spring';
import Header from "./Header"
import LogoSlider from './LogoSlider'; // Adjust path
import logo1 from '../assets/download3.png'; // Example image paths
import logo2 from '../assets/download1.png';
import logo3 from '../assets/download2.jpeg';
import logo4 from '../assets/download3.png';
import logo5 from '../assets/download2.jpeg';
import logo6 from '../assets/download1.png';
import Navbarforhome from './Navbarforhome';
import ManufacturingServices from './ManufacturingServices';
import AboutUs from './AboutUs';
import DisasterMap from './DisasterMap';
// import UpcomingEventsDummy from './UpcomingEventsDummy';
import Footer from './Footer';
import LocationSearchMap from './LocationSearchMap';








//9KDLGA8G3X3P4BE9CQM3JY6X

function Homepage() {
  const logos = [
    { src: logo1, alt: 'Logo 1' },
    { src: logo2, alt: 'Logo 2' },
    { src: logo3, alt: 'Logo 3' },
    { src: logo4, alt: 'Logo 4' },
    { src: logo5, alt: 'Logo 5' },
    { src: logo6, alt: 'Logo 6' },
    // ... more logos
  ];


  // Text Animation
  const textSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 280, friction: 60 },
  });

  // Image Animation
  const imageSpring = useSpring({
    from: { opacity: 0, transform: 'translateX(-50px)' },
    to: { opacity: 1, transform: 'translateX(0px)' },
    config: { tension: 280, friction: 60 },
  });

  return (
    <div>
      <Navbarforhome />
      <Header />
      <LogoSlider logos={logos} />
      <ManufacturingServices />
      <AboutUs />
      <DisasterMap />
     {/* <UpcomingEventsDummy /> */}
    <LocationSearchMap />
     <Footer />
    
     
      
      
      
    
      


    </div>
  );
}

export default Homepage;