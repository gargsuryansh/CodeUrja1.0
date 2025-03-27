import React from 'react';
import './LogoSlider.css'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const LogoSlider = ({ logos }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Adjust based on your design
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Adjust autoplay speed in milliseconds
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="logo-slider-container">
      <Slider {...settings}>
        {logos.map((logo, index) => (
          <div key={index} className="logo-slide">  
            <img src={logo.src} alt={logo.alt} className="logo-image" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default LogoSlider;


