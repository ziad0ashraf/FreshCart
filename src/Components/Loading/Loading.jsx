import React, { useState } from 'react'
import style from './Loading.module.css'
import { RotatingSquare } from 'react-loader-spinner'
export default function Loading() {


  return (<>
           
           
   <div className='h-lvh flex justify-center items-center'>        
    <RotatingSquare
      visible={true} 
      height="200" 
      width="200" 
      color="#4fa94d" 
      back ariaLabel="rotating-square-loading"/>
  </div>
  


  </>
  )
}
