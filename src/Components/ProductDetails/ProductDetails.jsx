import React, { useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { FaStarHalfAlt } from 'react-icons/fa'
import Slider from "react-slick";

export default function ProductDetails() {
  let {id}=useParams()
  // console.log(id);

  const [productDetails, setProductDetails] = useState({})
  
  const [related, setRelated] = useState([])
  
  async function getProductDetails(id) {
    try {
      let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      // console.log(data.data);
      setProductDetails(data.data)
      getRelated(data.data.category._id)
    } catch (error) {
      // console.log(error);
    }    
  }

  useEffect(() => {
      getProductDetails(id)
  }, [])


  async function getRelated(categoryId) {
    try {
      let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`)
      // console.log(data.data);
      setRelated(data.data)
    } catch (error) {
      // console.log(error);
    }    
  }



  
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
    autoplaySpeed:2000,
  };
  


  return (<>

    <section className="flex items-center">
      <div className="container flex flex-col justify-center items-center gap-14 p-5">
        <div className="w-full flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/4 cursor-grab active:cursor-grabbing">
            <Slider {...settings}>
              {productDetails.images?.map((image, index) => (
                <img key={index} src={image} alt="" />
              ))}
            </Slider>
          </div>
          <div className="w-full md:w-3/4">
            <div className="flex flex-col gap-4">
              <h3 className="text-lg">{productDetails.title}</h3>
              <p className="text-gray-500 text-sm">{productDetails.description}</p>
              <h3>{productDetails.category?.name}</h3>
              <div className="flex justify-between my-3">
                <h2>{productDetails.price} EGP</h2>
                <h2 className="flex items-center gap-2">
                  <FaStarHalfAlt className="text-yellow-400 text-xl" /> {productDetails.ratingsAverage}
                </h2>
              </div>
              <div className="flex justify-center">
                <button className="w-full bg-main p-2 rounded-lg text-white">Add To Cart</button>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Related Products Section */}
        <div className="w-full">
          <div className="flex overflow-x-scroll space-x-5 py-5 custom-scrollbar">
            {related.map((related, index) => (
              <div onClick={()=>getProductDetails(related.id)} key={index} className="product text-center flex-none p-4 overflow-hidden rounded-xl">
                <div className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    <img src={related.imageCover} className="w-44" alt={related.title} />
                  </div>
                  <h2 className="text-main my-3">{related.category?.name}</h2>
                  <h2>{related.title?.split(' ').slice(0, 2).join(' ')}</h2>
                  <div className="flex justify-between my-3">
                    <h2>{related.price} EGP</h2>
                    <h2 className="flex items-center gap-2">
                      <FaStarHalfAlt className="text-yellow-400 text-xl" /> {related.ratingsAverage}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </>
  )
}
