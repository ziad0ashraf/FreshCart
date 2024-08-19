import React, { useState } from 'react'
import style from './MainSlider.module.css'
import slide1 from '../../assets/images/slider-image-1.jpeg'
import slide2 from '../../assets/images/slider-image-2.jpeg'
import slide3 from '../../assets/images/slider-image-3.jpeg'
import Slider from 'react-slick'
export default function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
    autoplaySpeed:3000,
  };

  return (<>

  <div className='container flex flex-col md:flex-row cursor-grab active:cursor-grabbing'>
    <div className='w-full md:w-3/4'>
    <Slider {...settings}>
      {[slide1,slide2,slide3].map((image,index)=>(<img key={index} src={image} className='md:h-[400px]'/>))}
    </Slider>
    </div>
    <div className='w-full md:w-1/4'>
      <div>
        <img src={slide1} alt="" className='w-full md:h-[200px]' />
        <img src={slide3} alt="" className='w-full md:h-[200px]' />
      </div>
    </div>
  </div>
  

  </>
  )
}
