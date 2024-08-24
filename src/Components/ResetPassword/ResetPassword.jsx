import React, { useContext, useState } from 'react'
import style from './ResetPassword.module.css'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import axios from 'axios'
import { VscLoading } from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom'

export default function ResetPassword() {

  let navigate = useNavigate()
  
  const [loading, setLoading] = useState(false)



  async function ResetPassword(values) {
    try {
      setLoading(true)
      let {data}=await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,values)
      console.log(data);
      navigate('/login')
    } catch (error) {
      console.log(error);
      setLoading(false)
    }    
  }
  


  let validations = Yup.object().shape({
    email: Yup.string().email('invalid email').required('Email is required !'),
    newPassword: Yup.string().matches(/^[A-Z][\w@]{5,10}$/,'invalid password ').required('Password is required'),
  })


  const formik = useFormik({
    initialValues:{
      email:'',
      newPassword:'',
    },
    validationSchema:validations,
    onSubmit:ResetPassword
  })


  


  return (<>

    <section>
      <div className="container my-16">
      <div className='flex justify-center'>
        <h1 className='text-4xl font-medium'>Login</h1>
      </div>
      <form onSubmit={formik.handleSubmit} className={`max-w-lg my-10 mx-auto border-2 p-4 rounded-lg  border-green-500 shadow-green-500 duration-500 shadow-xl`}>

        <div className="relative z-0 w-full mb-5 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
            {formik.errors.email&&formik.touched.email&& <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">{formik.errors.email}</span>
            </div>}
        </div>

        <div className="relative z-0 w-full mb-5 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.newPassword} type="Password" name="newPassword" id="newPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
            <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">newPassword</label>
            {formik.errors.newPassword&&formik.touched.newPassword&& <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">{formik.errors.newPassword}</span>
            </div>}
        </div>


        <div className='flex justify-between items-center'>
            {loading?
            <button type="button" className="text-white bg-main hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-main dark:focus:ring-green-800"><VscLoading className='text-xl animate-spin' /></button>
            :<button type="submit" className="text-white bg-main hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-main dark:focus:ring-green-800">Submit</button>
            }
          </div>
      </form>

      </div>
    </section>
    </>)
}
