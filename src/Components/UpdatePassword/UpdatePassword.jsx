import React, { useState } from 'react'
import style from './UpdatePassword.module.css'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import axios from 'axios'
import { VscLoading } from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function UpdatePassword() {

  let navigate= useNavigate()

  const headers = {
    token: localStorage.getItem('user-token'),
  };

  const [loading, setLoading] = useState(false)

  const [IncorrectCurrent, setIncorrectCurrent] = useState(null)


  async function changePassword(values) {
    try {
      setLoading(true)
      let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,values,{headers})
      // console.log(data);
      setLoading(false)
      toast.success('Password has been changed. You may need to log in again',{duration:5000,})
      localStorage.removeItem('user-token')
      navigate('/login')
    } catch (error) {
      console.log(error);
      setLoading(false)  
      setIncorrectCurrent(error.response.data.errors.msg)    
    }
  }


    let validations = Yup.object().shape({
      currentPassword: Yup.string().required('Current Password is required'),
      password: Yup.string().matches(/^[A-Z][\w@]{5,10}$/,'invalid password ex.(Ziad123)').required('Password is required'),
      rePassword: Yup.string().oneOf([Yup.ref('password')],'rePassword must be matching Password ').required('RePassword is required'),
    })


    const formik = useFormik ({
        initialValues: {
          currentPassword: "",
          password: "",
          rePassword: "",
      },
        validationSchema:validations,
        onSubmit: changePassword,
    })



  return (<>
    <section className='h-lvh flex items-center'>
      <div className="container">
      <div>
                <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto relative">

                    <h2 className='font-medium text-2xl mb-5'>Change Password:</h2>


                    <div className="relative z-0 w-full mb-2 group">
                        <input type="password" name="currentPassword" value={formik.values.currentPassword} onBlur={formik.handleBlur} onChange={formik.handleChange} id="currentPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:border-gray-400 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                        <label htmlFor="currentPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">currentPassword</label>
                    </div>
                    {formik.errors.currentPassword &&formik.touched.currentPassword && 
                      <div className='border-red-600 border p-4 mb-4 text-sm text-red-700 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'>
                        <h1>{formik.errors.currentPassword}</h1>
                      </div>
                    }
                    
                    <div className="relative z-0 w-full mb-2 group">
                        <input type="password" name="password" onBlur={formik.handleBlur} onChange={formik.handleChange} id="password" value={formik.values.password} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:border-gray-400 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                        <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">password</label>
                    </div>
                    {formik.errors.password && formik.touched.password && 
                      <div className='border-red-600 border p-4 mb-4 text-sm text-red-700 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'>
                        <h1>{formik.errors.password}</h1>
                      </div>
                    }
                    
                    <div className="relative z-0 w-full mb-2 group">
                        <input type="password" name="rePassword" onBlur={formik.handleBlur} onChange={formik.handleChange} id="rePassword" value={formik.values.rePassword} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:border-gray-400 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                        <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">rePassword</label>
                    </div>
                    {formik.errors.rePassword &&formik.touched.rePassword && 
                      <div className='border-red-600 border p-4 mb-4 text-sm text-red-700 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'>
                        <h1>{formik.errors.rePassword}</h1>
                      </div>
                    }
                    
                    <div className='flex mt-5 gap-6'>
                      <div>
                        {loading?
                        <button type="button" className=" text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:hover:bg-green-700 dark:focus:ring-green-600"><VscLoading className='text-xl animate-spin' /></button>
                        :<button type="submit" className=" text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:hover:bg-green-700 dark:focus:ring-green-600">ChangePassword</button>
                        }
                      </div>
                    {IncorrectCurrent&&<h1 className='bg-red-600 p-2 text-white rounded-lg'>{IncorrectCurrent}</h1>}
                    </div>

                </form>
            </div>

      </div>
    </section>
  </>
  )
}
