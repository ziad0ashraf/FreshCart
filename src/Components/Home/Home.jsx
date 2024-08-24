import React, { useEffect, useState } from 'react'
import style from './Home.module.css'
import axios from 'axios'
import RecentProducts from '../RecentProducts/RecentProducts'
import Loading from '../Loading/Loading'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Home() {

  const [products, setProducts] = useState([])

  async function getRecentProducts() {
    try {
      let {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/products')
      // console.log(data.data);
      setProducts(data.data)
    } catch (error) {
      // console.log(error);
    }    
  }

  useEffect(() => {
    getRecentProducts()
  }, [])
  

  return (<>

    {products.length?<>
      <section className='overflow-hidden'>
        
        <MainSlider/>

      </section>

      <section id='categorySlider' className='overflow-hidden'>
        <CategorySlider/>
      </section>


      <section id='recentProducts'>
        <div className="container my-6">
            <h1 className='text-2xl'>RecentProducts :</h1>
          <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-1 gap-3">
              {products.sort(() => Math.random() - 0.5).slice(0,12).map((product,index)=><RecentProducts key={index} product={product} />)}
          </div>
            <div className='text-center my-5'>
              <Link to={`Products`} className=' bg-main outline-none hover:shadow-2xl hover:shadow-main px-2 py-2 text-white rounded-lg duration-200'>
                Show All Products
              </Link>
            </div>
          </div>
      </section> </>
    :
    <Loading/>
    }

  </>
  )
}
