import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import Loading from '../Loading/Loading'
import EmptyCart from '../EmptyCart/EmptyCart'
import { Link } from 'react-router-dom'
export default function Cart() {

  const {getCartItems,updateProduct,deleteCart,cartItems} = useContext(CartContext)

  const [cart, setCart] = useState(null)

  const [loading, setLoading] = useState(false)
  
  async function getCart() {
    setLoading(true); 
    let response = await getCartItems();
    setLoading(false); 
    setCart(response.data);
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

  useEffect(() => {
    getCart()
  }, [])

  
  return (<>

  <section>
    {!loading?<>
          { cart ? 
          <div className="container md:w-4/5 mb-5 overflow-x-auto shadow-md sm:rounded-lg">
            {cartItems?.numOfCartItems!=0 ?<>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cart?.products?.map((product)=>(
                        <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td className='p-3'>
                            <img src={product.product.imageCover} className='w-16 md:w-32 max-w-full max-h-full' alt={product.product.title} />
                          </td>
                          <td className="px-6 py-4 text-center font-semibold text-gray-900 dark:text-white">
                            {product.product.title.split(' ').slice(0,10).join(' ')} 
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <button onClick={()=>updateCart(product.product.id,product.count-1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                <span className="sr-only">Quantity button</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                                </svg>
                              </button>
                              <div>
                                <span>{product.count}</span>
                              </div>
                              <button onClick={()=>updateCart(product.product.id,product.count+1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                <span className="sr-only">Quantity button</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                </svg>
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {product.price} EGP
                          </td>
                          <td className="px-6 py-4">
                            <button onClick={()=>deleteProduct(product.product.id)} className="font-medium text-red-600 dark:text-red-500">Remove</button>
                          </td>
                        </tr>
              ))}
            </tbody>
          </table>
          <div className='flex justify-between px-4 py-2 font-semibold'>
            <span>Total Price</span>
            <span>{cart?.totalCartPrice} EGP</span>
          </div>
          <div className='p-5'>
            <button className='bg-main text-white py-1 px-2 outline-none rounded-md'>
              <Link to='/checkout'>Check Out</Link>
            </button>
          </div>
          </>
          :<EmptyCart/>
            }
          </div>
          :<EmptyCart/>
          }</>
      :
      <Loading/>
    }
  </section>

  </>
  )
}
