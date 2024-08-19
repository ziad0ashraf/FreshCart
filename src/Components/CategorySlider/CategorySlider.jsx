import React, { useEffect, useState } from 'react'
import style from './CategorySlider.module.css'
import Slider from 'react-slick'
import axios from 'axios'
import { Link } from 'react-router-dom'
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

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "flex",justifyContent:'center',alignItems:'center', background: "rgba(15, 173, 15, 0.7)",padding:'25px',borderRadius:'50%', }}
        onClick={onClick}
      />
    );
  }
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style,zIndex:'1', display: "flex",justifyContent:'center',alignItems:'center', background: "rgba(15, 173, 15, 0.7)",padding:'25px',borderRadius:'50%',fontSize:'50px' }}
        onClick={onClick}
      />
    );
  }

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 5,
    arrows:true,
    autoplay:true,
    autoplaySpeed:3000,
    nextArrow: <SampleNextArrow />,
    prevArrow:<SamplePrevArrow/>,
  };


  return (<>

    <div className='container cursor-grab active:cursor-grabbing font-sans'>
      <h1 className='text-xl'>Shop Popular Categories</h1>
    <Slider {...settings}>
      {categories.map((category,id)=>
      <div key={id} className='p-1 text-center'>
        <Link to={`/productsByCategory/${category._id}`}>
        <img src={category.image} className='w-full h-24 md:h-60'/>        
        </Link>
        <h2>{category.name}</h2>
      </div>
      )}
    </Slider>
    </div>



  </>
  )
}
