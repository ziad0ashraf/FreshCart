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
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          {categories?.map((category,index)=>(
            <div key={index}>
              <Link className='cursor-pointer' to={`/productsByCategory/${category._id}`}>
              <div className='flex flex-col justify-center items-center'>
                <div><img src={category.image} className='w-60' alt={category.name} /></div>
                <h1 className='text-2xl font-medium'>{category.name}</h1>
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
