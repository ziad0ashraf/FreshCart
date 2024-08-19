import React, { useContext, useState } from 'react'
import style from './AddAddress.module.css'
import { AddressContext } from '../../Context/AddressContext'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import axios from 'axios'
import { VscLoading } from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom'

export default function AddAddress() {

   let {AddAddress,loading} = useContext(AddressContext)

   let navigate = useNavigate()


  async function newAddress(values) {
    try {
      let response = await AddAddress(values)
      // console.log(response);  
      navigate('/address')
    } catch (error) {
      // console.log(error);
    }
   }



  const formik = useFormik ({
    initialValues: {
      name:"",
      details:"",
      phone:"",
      city:"" 
    },
    onSubmit: newAddress,
})

return (
  <>
      
      <div className='py-16'>
          <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto relative">

              <h2 className='font-medium text-2xl mb-5'>Add Address :</h2>

              <div className="relative z-0 w-full mb-2 group">
                  <input type="text" name="name" value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} id="name"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:border-gray-400 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required/>
                  <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">name</label>
              </div>

              <div className="relative z-0 w-full mb-2 group">
                  <input type="text" name="details" value={formik.values.details} onBlur={formik.handleBlur} onChange={formik.handleChange} id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:border-gray-400 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                  <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">details</label>
              </div>
              
              <div className="relative z-0 w-full mb-2 group">
                  <input type="tel" name="phone" onBlur={formik.handleBlur} onChange={formik.handleChange} id="phone" value={formik.values.phone} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:border-gray-400 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                  <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">phone</label>
              </div>
              
              <div className="relative z-0 w-full mb-2 group">
                  <input type="text" name="city" onBlur={formik.handleBlur} onChange={formik.handleChange} id="city" value={formik.values.city} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:border-gray-400 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                  <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">city</label>
              </div>
              

              <div className='flex mt-5 gap-6'>
                <div>
                {loading?
                <button type="button" className=" text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-600"><VscLoading className='text-xl animate-spin' /></button>
                :<button type="submit" className=" text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-600">Add</button>
                }
                </div>
              </div>

          </form>
      </div>


</>
)
}
