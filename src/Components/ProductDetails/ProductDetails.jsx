import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { FaStarHalfAlt } from 'react-icons/fa'
import Slider from "react-slick";
import Loading from '../Loading/Loading'
import { CartContext } from '../../Context/CartContext'
import { VscLoading } from 'react-icons/vsc'
import { WishlistContext } from '../../Context/WishlistContext'

export default function ProductDetails() {
  let {id}=useParams()
  // console.log(id);
  let {addToCart,loading,currentId}=useContext(CartContext)
  
  let {deleteWishlist,AddToWishlist,wishlistProducts}=useContext(WishlistContext)

  const [wishlistLoading, setWishlistLoading] = useState(false);

  const [productDetails, setProductDetails] = useState({})
  
  const [related, setRelated] = useState([])
  
  const [loader, setLoader] = useState(false)

  async function getProductDetails(id) {
    try {
      setLoader(true)
      let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      // console.log(data.data);
      setProductDetails(data.data)
      getRelated(data.data.category._id)
      setLoader(false)
    } catch (error) {
      // console.log(error);
    }    
  }

  useEffect(() => {
      getProductDetails(id)
  }, [])


  async function getRelated(categoryId) {
    try {
      setLoader(true)
      let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`)
      // console.log(data.data);
      setRelated(data.data)
      setLoader(false)
    } catch (error) {
      // console.log(error);
    }    
  }


  const handleAdd = async (e) => {
    e.stopPropagation();
    if (!wishlistLoading) {
      setWishlistLoading(true);
      await AddToWishlist(productDetails.id);
      setWishlistLoading(false);
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!wishlistLoading) {
      setWishlistLoading(true);
      await deleteWishlist(productDetails.id);
      setWishlistLoading(false);
    }
  };

    const isInWishlist = wishlistProducts?.some((wishlistProduct) => wishlistProduct.id == productDetails.id);




  
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
    {loader?
    <Loading/>
    :
    <section className="flex items-center">
    <div className="container flex flex-col justify-center items-center gap-14 p-5">
      <div className="w-full flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/4 cursor-grab active:cursor-grabbing">
        {productDetails.images?.length>1 ?
          <Slider {...settings}>
            {productDetails.images.map((image, index) => (
              <img key={index} src={image} alt={image.title} />
            ))}
          </Slider> 
          :   
          <img src={productDetails.images} alt={productDetails.title} />
        }
        </div>
        <div className="w-full md:w-3/4">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg">{productDetails.title}</h3>
            <p className="text-gray-500 text-sm">{productDetails.description}</p>
            <div className='flex justify-between items-center'>
            <h3>{productDetails.category?.name}</h3>
            <label className="containerHeart" onClick={isInWishlist ? handleDelete : handleAdd} >
              <input type="checkbox"/>
              <svg fill={isInWishlist ? '#E3474F' : '#666'} id="Layer_1" version="1.0" viewBox="0 0 24 24" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path d="M16.4,4C14.6,4,13,4.9,12,6.3C11,4.9,9.4,4,7.6,4C4.5,4,2,6.5,2,9.6C2,14,12,22,12,22s10-8,10-12.4C22,6.5,19.5,4,16.4,4z"></path></svg>
            </label>
            </div>
            <div className="flex justify-between my-3">
              <h2>{productDetails.price} EGP</h2>
              <h2 className="flex items-center gap-2">
                <FaStarHalfAlt className="text-yellow-400 text-xl" /> {productDetails.ratingsAverage}
              </h2>
            </div>
            <div className="flex justify-center">
              {currentId==productDetails.id&&loading?
              <button type="button" className="text-white bg-main hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-main dark:focus:ring-green-800"><VscLoading className='text-xl animate-spin' /></button>
              :
              <button onClick={()=>addToCart(productDetails.id)} className="w-full bg-main p-2 rounded-lg text-white">Add To Cart</button>
              }
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Related Products Section */}
      <div className="w-full">
        <div className="flex overflow-x-scroll space-x-5 py-5 custom-scrollbar">
          {related.map((related, index) => (
            <div onClick={()=>getProductDetails(related.id)} key={index} className=" hover:-translate-y-5 duration-200 text-center flex-none p-4 overflow-hidden rounded-xl">
              <Link to={`/productdetails/${related.id}`}>
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
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>

    }
  </>
  )
}
