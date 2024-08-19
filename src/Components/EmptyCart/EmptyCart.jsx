import React, { useState } from 'react'
export default function EmptyCart() {


  return (<>

    <section className='h-lvh flex items-center'>
      <div className="container flex items-center justify-center">
        <h1 className='text-red-600 text-4xl'>There's No Products in Cart</h1>
      </div>
    </section>

  </>
  )
}
