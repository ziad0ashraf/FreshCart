import React, { useContext, useEffect, useState } from 'react'
import style from './RecentProducts.module.css'
import { FaRegHeart, FaStarHalfAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { VscLoading } from 'react-icons/vsc';
import { WishlistContext } from '../../Context/WishlistContext';

export default function RecentProducts({product}) {

     const {addToCart,currentId,loading} = useContext(CartContext)
     

     const [wishlistLoading, setWishlistLoading] = useState(false);
     
     let {AddToWishlist,wishlistProducts,deleteWishlist}=useContext(WishlistContext)


        
     const handleAdd = async (e) => {
      e.stopPropagation();
      if (!wishlistLoading) {
        setWishlistLoading(true);
        await AddToWishlist(product.id);
        setWishlistLoading(false);
      }
    };

    const handleDelete = async (e) => {
      e.stopPropagation();
      if (!wishlistLoading) {
        setWishlistLoading(true);
        await deleteWishlist(product.id);
        setWishlistLoading(false);
      }
    };

      const isInWishlist = wishlistProducts?.some((wishlistProduct) => wishlistProduct.id == product.id);
    
    
  return (<>

    <div className='product px-2 pb-2 overflow-hidden rounded-xl font-sans'>
      <div className='cursor-pointer'>
        <Link to={`productdetails/${product.id}`}>
        <div className=' flex flex-col items-center'>
        <img src={product.imageCover} className='w-full' alt={product.title} />
        </div>
        <h2 className='text-main my-3'>{product.category.name}</h2>
        <div className='flex justify-between items-center'>
        <h2>{product.title.split(' ').slice(0,2).join(' ')}</h2>
        <label className="containerHeart" onClick={isInWishlist ? handleDelete : handleAdd} >
          <input type="checkbox"/>
          <svg fill={isInWishlist ? '#E3474F' : '#666'} id="Layer_1" version="1.0" viewBox="0 0 24 24" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path d="M16.4,4C14.6,4,13,4.9,12,6.3C11,4.9,9.4,4,7.6,4C4.5,4,2,6.5,2,9.6C2,14,12,22,12,22s10-8,10-12.4C22,6.5,19.5,4,16.4,4z"></path></svg>
        </label>
        </div>
        <div className='flex justify-between my-3'>
          <h2>{product.price} EGP</h2>
          <h2 className='flex items-center gap-2'><FaStarHalfAlt className='text-yellow-400 text-xl'/> {product.ratingsAverage}</h2>
        </div>
        </Link>
        <div className='flex justify-center'>
          {currentId==product.id&&loading?
          <button type="button" className=" text-white bg-green-700 hover:bg-main focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"><VscLoading className='text-xl animate-spin' /></button>
          :
          <button onClick={()=>addToCart(product.id)} className='btn bg-main p-2 rounded-lg text-white'>Add To Cart</button>
          }
        </div>
      </div>
    </div>

  </>
  )
  {/* <FaRegHeart className='text-red-600' /> */}
}
