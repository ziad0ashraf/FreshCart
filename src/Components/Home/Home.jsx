import React, { useEffect, useState } from 'react'
import style from './Home.module.css'
import axios from 'axios'
import RecentProducts from '../RecentProducts/RecentProducts'
import Loading from '../Loading/Loading'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'

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
      <section>
        
        <MainSlider/>

      </section>

      <section id='categorySlider'>
        <CategorySlider/>
      </section>


      <section id='recentProducts'>
        <div className="container my-6">
            <h1 className='text-2xl'>RecentProducts :</h1>
          <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-1 gap-3">
              {products.map((product,index)=><RecentProducts key={index} product={product} />)}
          </div>
        </div>
      </section> </>
    :
    <Loading/>
    }

  </>
  )
}
