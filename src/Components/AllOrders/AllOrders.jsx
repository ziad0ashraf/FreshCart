import React, { useContext, useEffect, useState } from 'react'
import style from './AllOrders.module.css'
import { CartContext } from '../../Context/CartContext'
import { FcShipped } from 'react-icons/fc'
export default function AllOrders() {
 let {clearCart} = useContext(CartContext)

  useEffect(() => {
    clearCart()
  }, [])
  

  return (<>

    <section className='h-lvh flex justify-center items-center'>
      <div className="container flex justify-center flex-col">
        <div className='text-4xl text-main text-center '>
          Products have been successfully checked out. 
        </div>
        <div className='w-3/4 relative  '>
          <FcShipped className='shipped text-7xl absolute'/>
        </div>
      </div>
    </section>

  </>
  )
}
