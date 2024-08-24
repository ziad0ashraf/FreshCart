import React, { useContext, useState } from 'react'
import style from './Register.module.css'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import axios from 'axios'
import { VscLoading } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'

export default function Register() {

  const [existEmail, setExistEmail] = useState(null)
  const [loading, setLoading] = useState(false)

  let {setUserData}=useContext(UserContext)

  let navigate= useNavigate()
  
  async function register(values) {
    try {
      setLoading(true)
      let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
      // console.log(data);
      localStorage.setItem('user-token',data.token)
      setUserData(data.token)
      navigate('/')
      window.location.reload();
    } catch (error) {
      setLoading(false)
      // console.log(error.response.data.message);
      setExistEmail(error.response.data.message)
    }
  }

  let validations = Yup.object().shape({
    name: Yup.string().min(3,'minimum letters is 3').max(10,'maximum letters is 10').required('Name is required !'),
    email: Yup.string().email('invalid email').required('Email is required !'),
    password: Yup.string().matches(/^[A-Z][\w@]{5,10}$/,'invalid password ex.(Ziad123)').required('Password is required'),
    rePassword: Yup.string().oneOf([Yup.ref('password')],'rePassword must be matching Password ').required('RePassword is required'),
    phone: Yup.string().matches(/^(010|011|012|015)\d{8}$/,'We need Egyptian phone number').required('Phone Number is required'),
  })


  const formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:'',
    },
    validationSchema:validations,
    onSubmit:register,
  })

  return (<>

    <section>
      <div className="container my-16">
      <div className='flex justify-center'>
        <h1 className='text-4xl font-medium'>Register</h1>
      </div>
      <form onSubmit={formik.handleSubmit} className={`max-w-lg my-10 mx-auto border-2 p-4 rounded-lg ${existEmail?"border-red-500 shadow-red-500 ":" border-green-500 shadow-green-500 "} duration-500 shadow-xl`}>
          <div className="relative z-0 w-full mb-5 group">
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
              <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
              {formik.errors.name&&formik.touched.name&& <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">{formik.errors.name}</span>
            </div>}
          </div>

        <div className="relative z-0 w-full mb-5 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
            {formik.errors.email&&formik.touched.email&& <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">{formik.errors.email}</span>
            </div>}
        </div>

        <div className="relative z-0 w-full mb-5 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            {formik.errors.password&&formik.touched.password&& <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">{formik.errors.password}</span>
            </div>}
        </div>

        <div className="relative z-0 w-full mb-5 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
            <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">RePassword</label>
            {formik.errors.rePassword&&formik.touched.rePassword&& <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">{formik.errors.rePassword}</span>
            </div>}
        </div>

          <div className="relative z-0 w-full mb-5 group">
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
              <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (123-456-7890)</label>
              {formik.errors.phone&&formik.touched.phone&& <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">{formik.errors.phone}</span>
            </div>}
          </div>

          <div className='flex'>
            {loading?
            <button type="button" className="text-white bg-main hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg w-full sm:w-auto px-5 py-2.5 text-center dark:hover:bg-green-700 dark:focus:ring-green-800"><VscLoading className='text-xl animate-spin' /></button>
            :<button type="submit" className="text-white bg-main hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
            }
          </div>
            <div className='flex justify-center text-center my-1'>
              {existEmail&& <h1 className='w-60 p-4 font-medium bg-red-600 text-white rounded-lg dark:bg-gray-800 dark:text-red-400'>{existEmail}</h1>}
            </div>
      </form>


      </div>
    </section>

  </>
  )
}
