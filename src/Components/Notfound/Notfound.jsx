import React, { useState } from 'react'
import style from './Notfound.module.css'
import notFound from '../../assets/images/notfoundpage.jpeg'

export default function Notfound() {


  return (<>

    <img src={notFound} className='h-lvh w-full' alt="" />
  </>
  )
}
