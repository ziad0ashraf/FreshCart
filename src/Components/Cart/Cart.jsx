import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import Loading from '../Loading/Loading'
import EmptyCart from '../EmptyCart/EmptyCart'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
export default function Cart() {


  
  const {getCartItems,updateProduct,deleteCart,clearCart,cartItems} = useContext(CartContext)
  
  const [cart, setCart] = useState(null)
  
  const [loading, setLoading] = useState(false)
  
  async function getCart() {
    setLoading(true); 
    let response = await getCartItems();
    setCart(response?.data);
    setLoading(false); 
  }

  async function updateCart(productId, count) {
    if (count >= 1) {
      setLoading(true); 
      let response = await updateProduct(productId, count);
      setCart(response.data);
      setLoading(false); 
    } else {
      deleteProduct(productId);
    }
  }

  async function deleteProduct(productId) {
    setLoading(true);
    let response = await deleteCart(productId);
    setCart(response.data);
    setLoading(false); 
  }
  
  function handelClearCart() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then( async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
       await clearCart()
       setCart(null);
        Swal.fire({
          title: "Cleared!",
          text: "Your cart has been cleared.",
          icon: "success"
        });
        setLoading(false); 
      }
    });  
  }
  useEffect(() => {
    getCart()
  }, [])

  
  return (
    <>
      <section>
        {!loading ? (
          <>
            {cart ? (
              <div className="container md:w-4/5 mb-5 my-2 p-2  shadow-md sm:rounded-lg">
                {cartItems?.numOfCartItems !== 0 ? (
                  <>
                    {cart?.products?.map((product) => (
                      <div className='flex flex-col md:flex-row justify-around items-center gap-8 my-2 p-2 border-2 shadow' key={product.product.id}>
                        <div>
                          <img src={product.product.imageCover} className='w-52 md:w-40' alt={product.product.title}/>
                        </div>
                        <div className="flex gap-10">
                          <div>
                            {product.product.title.split(" ").slice(0, 10).join(" ")}
                          </div>
                          <div className="flex items-center">
                            <button onClick={() => updateCart(product.product.id, product.count - 1)}
                              className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                              <span className="sr-only">Quantity button</span>
                              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2" >
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16"/>
                              </svg>
                            </button>
                            <div>
                              <span>{product.count}</span>
                            </div>
                            <button onClick={() =>updateCart(product.product.id, product.count + 1)}className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"type="button">
                              <span className="sr-only">Quantity button</span>
                              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18" >
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className='flex gap-10'>
                          <div>{product.price} EGP</div>
                          <div>
                            <button onClick={() => deleteProduct(product.product.id)} className="font-medium text-red-600 dark:text-red-500">
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-between px-4 py-2 font-semibold">
                      <span>Total items Of Cart</span>
                      <span>{cartItems?.numOfCartItems} {cartItems?.numOfCartItems>1 ? 'Items': 'Item'} </span>
                    </div>
                    <div className="flex justify-between px-4 py-2 font-semibold">
                      <span>Total Price</span>
                      <span>{cart?.totalCartPrice} EGP</span>
                    </div>
                    <div className="flex flex-col w-1/4 md:w-1/6 gap-5 text-white">
                      <button className="bg-main py-1 px-2 outline-none rounded-md">
                        <Link to="/checkout">Check Out</Link>
                      </button>
                      <button onClick={()=>handelClearCart()} className='bg-red-600 py-1 px-2 outline-none rounded-md'>Clear Cart</button>
                    </div>
                  </>
                ) : (
                  <EmptyCart />
                )}
              </div>
            ) : (
              <EmptyCart />
            )}
          </>
        ) : (
          <Loading />
        )}
      </section>
    </>
  );
}
