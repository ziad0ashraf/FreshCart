import React, { useContext, useState } from 'react'
import style from './ForgotPassword.module.css'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import axios from 'axios'
import { VscLoading } from 'react-icons/vsc'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { ImCancelCircle } from 'react-icons/im'

export default function ForgotPassword() {

  let navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [verify, setVerify] = useState(false)
  
  const [invalidCode, setInvalidCode] = useState(false)
{/* <><><><><><><><>ForgotPassword<><><><><><><><><> */}
  async function forgotPassword(values) {
    try {
      setLoading(true)
      let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,values)
      setLoading(false)
      setVerify(true)
    } catch (error) {
      console.log(error);
      setLoading(false)
      setVerify(false)
    }    
  }
  
  function closeVerify() {
    setVerify(false)
  }


  let validations = Yup.object().shape({
    email: Yup.string().email('invalid email').required('Email is required !'),
  })


  const formik = useFormik({
    initialValues:{
      email:'',
    },
    validationSchema:validations,
    onSubmit:forgotPassword
  })
{/* <><><><><><><><>VerifyResetCode<><><><><><><><><> */}
    async function verifyResetCode(values) {
      try {        
        setLoading(true)
        let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,values)
        // console.log(data);
        navigate('/resetPassword')
        setLoading(false)
      } catch (error) {
        console.log(error);
        setInvalidCode(error.response.data.message)
        setLoading(false)
      }    
    }

    const formikVerifyCode = useFormik({
      initialValues:{
        resetCode:'',
      },
      onSubmit:verifyResetCode
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


        <div className='flex justify-between items-center'>
            {loading?
            <button type="button" className="text-white bg-main hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg w-full sm:w-auto px-5 py-2.5 text-center dark:hover:bg-main dark:focus:ring-green-800"><VscLoading className='text-xl animate-spin' /></button>
            :<button type="submit" className="text-white bg-main hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:hover:bg-main dark:focus:ring-green-800">Submit</button>
            }
          </div>
            <div className='flex justify-center text-center my-1'>
        </div>
      </form>

      <div className={`${verify?'fixed':'hidden'} min-w-full h-lvh top-0 inset-x-0`}>
        <div className='h-full w-full bg-slate-200 opacity-80 absolute'></div>
        <div className='relative h-full flex items-center justify-center'>
          <div className='relative w-2/6 h-2/6 flex justify-center items-center rounded-lg shadow-2xl bg-white'>
          <form onSubmit={formikVerifyCode.handleSubmit}>
            <div className='flex justify-center items-center flex-col gap-5'>
              <input onBlur={formikVerifyCode.handleBlur} onChange={formikVerifyCode.handleChange} value={formikVerifyCode.values.resetCode} name="resetCode" id="resetCode" type="text" className="w-full ps-2 pe-4 py-1 outline-none border-2 rounded-lg border-main focus:shadow-lg focus:shadow-main duration-150" placeholder="Enter The Verify Code" />
              <button type="submit" className="text-white bg-main hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-main dark:focus:ring-green-800">Submit</button>
              {invalidCode&&
                <h1 className=' p-4 font-medium bg-red-600 text-white rounded-lg dark:bg-gray-800 dark:text-red-400'>{invalidCode}</h1>
              }
            </div>
            <div className='absolute right-2 top-1 text-xl'>
              <button onClick={closeVerify}><ImCancelCircle /></button>
            </div>
          </form>
          </div>
        </div>
      </div>

      </div>
    </section>
    </>)
}
