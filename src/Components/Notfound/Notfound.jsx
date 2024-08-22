import React, { useState } from 'react'
import style from './Notfound.module.css'
import notFound from '../../assets/images/nfpage.jpeg'

export default function Notfound() {


  return (<>
    <section className='bg-neutral-300 flex justify-center'>
    <img src={notFound} className='w-3/4' alt="Not Found Page" />
    </section>
  </>
  )
}
