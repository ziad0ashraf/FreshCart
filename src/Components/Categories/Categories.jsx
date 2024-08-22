import React, { useState } from 'react'
import style from './Categories.module.css'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import Loading from '../Loading/Loading'
import { Link } from 'react-router-dom'
export default function Categories() {


  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }

  let {data,isFetching}=useQuery({
    queryKey:['GetCategories'],
    queryFn:getCategories
  })
  // console.log(data);
  let categories=data?.data.data

  return (<>

    <section>
      <div className="container">
        {!isFetching?<>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-5'>
          {categories?.map((category,index)=>(
            <div className='border hover:scale-105 hover:border-main duration-300 rounded-lg overflow-hidden' key={index}>
              <Link className='cursor-pointer ' to={`/productsByCategory/${category._id}`}>
              <div className='flex flex-col justify-center items-center'>
                <div className='h-[300px] w-full'>
                  <img src={category.image} className='w-full h-full object-cover' alt={category.name} />
                </div>
                <div className='w-full text-center text-main text-2xl font-medium mt-2 bg-slate-100'>
                <h1 className=''>{category.name}</h1>
                </div>
              </div>
              </Link>
            </div>
          ))

          }
        </div>

        </>
        :
        <Loading/>
        }
      </div>
    </section>

  </>
  )
}
