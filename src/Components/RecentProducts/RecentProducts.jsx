import React, { useState } from 'react'
import style from './RecentProducts.module.css'
import { FaStarHalfAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function RecentProducts({product}) {

  
  return (<>

    <div className='product px-2 pb-2 overflow-hidden rounded-xl font-sans'>
      <div className='cursor-pointer'>
        <Link to={`productdetails/${product.id}`}>
        <div className=' flex flex-col items-center'>
        <img src={product.imageCover} className='w-full' alt={product.title} />
        </div>
        <h2 className='text-main my-3'>{product.category.name}</h2>
        <h2>{product.title.split(' ').slice(0,2).join(' ')}</h2>
        <div className='flex justify-between my-3'>
          <h2>{product.price} EGP</h2>
          <h2 className='flex items-center gap-2'><FaStarHalfAlt className='text-yellow-400 text-xl'/> {product.ratingsAverage}</h2>
        </div>
        </Link>
        <div className='flex justify-center'>
          <button className='btn bg-main p-2 rounded-lg text-white'>Add To Cart</button>
        </div>
      </div>
    </div>

  </>
  )
}
