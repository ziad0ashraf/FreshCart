import React, { useContext, useEffect, useState } from 'react'
import style from './AddressDetails.module.css'
import { useParams } from 'react-router-dom'
import { AddressContext } from '../../Context/AddressContext'
import Loading from '../Loading/Loading'
export default function AddressDetails() {

 let {AddressDetails,loading} = useContext(AddressContext)

 const [address, setAddress] = useState({})

  let {id}=useParams()
  // console.log(id);

  async function details(id) {
    let response = await AddressDetails(id)
    // console.log(response);
    setAddress(response.data)
  }

  useEffect(() => {
    details(id)
  }, [])
  

  return (<>

  <section>
    <div className="container">
      {!loading?
      <div className='h-lvh flex justify-center items-center'>
        <div className='text-3xl bg-gray-100 border-4 rounded-lg shadow-2xl shadow-main p-8'>
          <div className='p-4'>Your Address Name : <span className='text-main'>{address?.name}</span></div>
          <div className='p-4'>Your Address Details : <span className='text-main'>{address?.details}</span></div>
          <div className='p-4'>Your Phone : <span className='text-main'>{address?.phone}</span></div>
          <div className='p-4'>Your City : <span className='text-main'>{address?.city}</span></div>
        </div>
      </div>
      :
      <Loading/>
      }
    </div>
  </section>

  </>
  )
}
