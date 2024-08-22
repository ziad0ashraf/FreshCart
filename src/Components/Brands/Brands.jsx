import React, { useState } from 'react'
import style from './Brands.module.css'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import Loading from '../Loading/Loading'
import { Link } from 'react-router-dom'
export default function Brands() {

  function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }
  let {data,isFetching}=useQuery({
    queryKey:['GetBrands'],
    queryFn:getBrands
  })
  // console.log(data);
  let brands=data?.data.data

  return (<>

    <section>
          <div className="container">
            {!isFetching?<>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
              {brands?.map((brand,index)=>(
                <div className='flex flex-col justify-center items-center hover:shadow-lg hover:shadow-main hover:scale-105 duration-150' key={index}>
                  <Link className='cursor-pointer' to={`/productsByBrand/${brand._id}`}>
                  <div>
                    <img src={brand.image} className='w-60' alt={brand.name} />
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
