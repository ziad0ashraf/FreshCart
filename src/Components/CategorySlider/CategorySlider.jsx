import React, { useEffect, useState } from 'react'
import style from './CategorySlider.module.css'
import Slider from 'react-slick'
import axios from 'axios'
export default function CategorySlider() {

  const [categories, setCategories] = useState([])

  async function getRecentCategories() {
    try {
      let {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      // console.log(data.data);
      setCategories(data.data)
    } catch (error) {
      console.log(error);
      
    }    
  }

  useEffect(() => {
    getRecentCategories()
  }, [])

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 5,
    arrows:false,
    autoplay:true,
    autoplaySpeed:3000,
  };


  return (<>

    <div className='container cursor-grab active:cursor-grabbing font-sans'>
      <h1 className='text-xl'>Shop Popular Categories</h1>
    <Slider {...settings}>
      {categories.map((category,id)=>
      <div key={id} className='p-1 text-center'>
        <img src={category.image} className='w-full h-24 md:h-60'/>
        <h2>{category.name}</h2>
      </div>
      )}
    </Slider>
    </div>



  </>
  )
}
