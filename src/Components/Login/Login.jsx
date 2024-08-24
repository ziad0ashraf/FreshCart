import React, { useContext, useState } from 'react'
import style from './Login.module.css'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import axios from 'axios'
import { VscLoading } from 'react-icons/vsc'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'

export default function Login() {

  const [incorrect, setIncorrect] = useState('')
  const [loading, setLoading] = useState(false)
  let {setUserData} = useContext(UserContext);
  let navigate = useNavigate()

  async function login(values) {
    try {
      setLoading(true)
      let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values)
      // console.log(data);
      localStorage.setItem('user-token',data.token)
      setUserData(data.token)
      navigate('/')
      window.location.reload();
    } catch (error) {
      setLoading(false)
      // console.log(error);
      setIncorrect(error.response.data.message)
    }
  }

  let validations = Yup.object().shape({
    email: Yup.string().email('invalid email').required('Email is required !'),
    password: Yup.string().matches(/^[A-Z][\w@]{5,10}$/,'invalid password ').required('Password is required'),
  })


  const formik = useFormik({
    initialValues:{
      email:'',
      password:'',
    },
    validationSchema:validations,
    onSubmit:login,
  })

  return (<>

    <section>
      <div className="container my-16">
      <div className='flex justify-center'>
        <h1 className='text-4xl font-medium'>Login</h1>
      </div>
      <form onSubmit={formik.handleSubmit} className={`max-w-lg my-10 mx-auto border-2 p-4 rounded-lg ${incorrect?"border-red-500 shadow-red-500 ":" border-green-500 shadow-green-500 "} duration-500 shadow-xl`}>

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

        <div className='flex flex-col gap-2 md:flex-row md:gap-0 justify-between items-center'>
            {loading?
            <button type="button" className="text-white bg-main hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg w-full sm:w-auto px-5 py-2.5 text-center dark:hover:bg-main dark:focus:ring-green-800"><VscLoading className='text-xl animate-spin' /></button>
            :<button type="submit" className="text-white bg-main hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:hover:bg-main dark:focus:ring-green-800">Submit</button>
            }
            <Link to={'/forgotPassword'} className='underline'>Forgot Password ?</Link>
            </div>
            <div className='flex justify-center text-center my-1'>
              {incorrect&& <h1 className='w-60 p-4 font-medium bg-red-600 text-white rounded-lg dark:bg-gray-800 dark:text-red-400'>{incorrect}</h1>}
            </div>
        
      </form>


      </div>
    </section>
    </>)
}
