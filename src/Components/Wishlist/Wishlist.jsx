import React, { useContext, useEffect, useState } from 'react';
import { WishlistContext } from '../../Context/WishlistContext';
import { Link } from 'react-router-dom';
import { FaStarHalfAlt } from 'react-icons/fa';
import Loading from '../Loading/Loading';

export default function Wishlist() {
  const { wishlistProducts, deleteWishlist, GetWishlist, isLoading } = useContext(WishlistContext);



  const handleDelete = async (productId, e) => {
      e.stopPropagation();
      await deleteWishlist(productId);
  };

  useEffect(() => {
    GetWishlist()
  }, [])
  

  return (
    <>
      <section>
        <div className="container">
          {!isLoading ? (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              {wishlistProducts?.map((product,index) => (
                <div key={index} className='product px-2 pb-2 overflow-hidden rounded-xl font-sans'>
                  <div className='cursor-pointer'>
                    <Link to={`/productdetails/${product.id}`}>
                      <div className='flex flex-col items-center'>
                        <img src={product.imageCover} className='w-48' alt={product.title} />
                      </div>
                      <h2 className='text-main my-3'>{product.category?.name}</h2>
                      <div className='flex justify-between items-center'>
                        <h2>{product.title?.split(' ').slice(0, 2).join(' ')}</h2>
                        <label onClick={(e) => handleDelete(product.id, e)} className="containerHeart">
                          <input type="checkbox" />
                          <svg fill={wishlistProducts?.some((wishlistProduct)=>wishlistProduct.id==product.id )? '#E3474F':'#666'} id="Layer_1" version="1.0" viewBox="0 0 24 24" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <path d="M16.4,4C14.6,4,13,4.9,12,6.3C11,4.9,9.4,4,7.6,4C4.5,4,2,6.5,2,9.6C2,14,12,22,12,22s10-8,10-12.4C22,6.5,19.5,4,16.4,4z"></path>
                          </svg>
                        </label>
                      </div>
                      <div className='flex justify-between my-3'>
                        <h2>{product.price} EGP</h2>
                        <h2 className='flex items-center gap-2'>
                          <FaStarHalfAlt className='text-yellow-400 text-xl' /> {product.ratingsAverage}
                        </h2>
                      </div>
                    </Link>
                    <button onClick={(e) => handleDelete(product.id, e)} className='bg-red-600 text-white p-2 rounded-lg mt-3'>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Loading />
          )}
        </div>
      </section>
    </>
  );
}
