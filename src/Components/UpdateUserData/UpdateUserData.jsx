import React, { useState } from 'react'
import style from './UpdateUserData.module.css'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import axios from 'axios'
import { VscLoading } from 'react-icons/vsc'
import toast from 'react-hot-toast'
export default function UpdateUserData() {

  const headers = {
    token: localStorage.getItem('user-token'),
  };

  const [loading, setLoading] = useState(false)

  const [emailInUse, setEmailInUse] = useState(null)


  async function changeData(values) {
    try {
      setLoading(true)
      let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/users/updateMe`,values,{headers})
      console.log(data);
      setLoading(false)
      toast.success('Your data has been Updated successfully',{duration:5000,})
      setEmailInUse(null)    
    } catch (error) {
      console.log(error);
      setLoading(false)  
      setEmailInUse(error.response.data.errors.msg)    
    }
  }


    let validations = Yup.object().shape({
      name: Yup.string().min(3,'minimum letters is 3').max(10,'maximum letters is 10').required('Name is required !'),
      email: Yup.string().email('invalid email').required('Email is required !'),
      phone: Yup.string().matches(/^(002|\+2)?01[0125][0-9]{8}$/,'We need Egyptian phone number').required('Phone Number is required'),
    })


    const formik = useFormik ({
        initialValues: {
          name: "",
          email: "",
          phone: "",
      },
        validationSchema:validations,
        onSubmit: changeData,
    })



  return (<>
    <section className='h-lvh flex items-center'>
      <div className="container">
      <div>
                <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto relative">

                    <h2 className='font-medium text-2xl mb-5'>Change Information Data:</h2>


                    <div className="relative z-0 w-full mb-2 group">
                        <input type="text" name="name" value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} id="name"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:border-gray-400 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "/>
                        <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">name</label>
                    </div>
                    {formik.errors.name &&formik.touched.name && 
                      <div className='border-red-600 border p-4 mb-4 text-sm text-red-700 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'>
                        <h1>{formik.errors.name}</h1>
                      </div>
                    }

                    
                    <div className="relative z-0 w-full mb-2 group">
                        <input type="email" name="email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:border-gray-400 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                        <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">email</label>
                    </div>
                    {formik.errors.email &&formik.touched.email && 
                      <div className='border-red-600 border p-4 mb-4 text-sm text-red-700 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'>
                        <h1>{formik.errors.email}</h1>
                      </div>
                    }
                    
                    <div className="relative z-0 w-full mb-2 group">
                        <input type="tel" name="phone" onBlur={formik.handleBlur} onChange={formik.handleChange} id="phone" value={formik.values.phone} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:border-gray-400 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                        <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">phone</label>
                    </div>
                    {formik.errors.phone &&formik.touched.phone && 
                      <div className='border-red-600 border p-4 mb-4 text-sm text-red-700 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'>
                        <h1>{formik.errors.phone}</h1>
                      </div>
                    }
                    
                    <div className='flex mt-5 gap-6'>
                      <div>
                        {loading?
                        <button type="button" className=" text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:focus:ring-green-600"><VscLoading className='text-xl animate-spin' /></button>
                        :<button type="submit" className=" text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:focus:ring-green-600">Change Data</button>
                        }
                      </div>
                    {emailInUse&&<h1 className='bg-red-600 p-2 text-white rounded-lg'>{emailInUse}</h1>}
                    </div>

                </form>
            </div>

      </div>
    </section>
  </>
  )
}
