import React, { useState } from 'react'
import style from './Loading.module.css'
import { RotatingSquare } from 'react-loader-spinner'
export default function Loading() {


  return (<>
           
           
    <div className='h-lvh'>
      <div className='fixed w-full h-full inset-x-0'>
        <div className='h-full w-full bg-white opacity-70 absolute'></div>
        <div className='relative h-full flex items-center justify-center'>
          <RotatingSquare
            visible={true} 
            height="200" 
            width="200" 
            color="#4fa94d" 
            ariaLabel="rotating-square-loading"/>
        </div>
      </div>
    </div>
  </>
  )
}
