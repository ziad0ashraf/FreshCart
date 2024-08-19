import React from 'react'
import { createContext, useEffect, useState } from "react";
import * as Yup from 'yup'
import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export let AddressContext = createContext()


export default function AddressContextProvider({children}) {


    const headers = {
        token: localStorage.getItem('user-token'),
      };
    
      const [loading, setLoading] = useState(false)
      
    
      async function AddAddress(values) {
        try {
          setLoading(true)
          let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/addresses`,values,{headers})
          setLoading(false)
          return data
        } catch (error) {
          setLoading(false)
        }
      } 

      async function deleteAddress(idAddress) {
        try {
          setLoading(true)
          let {data}= await axios.delete(`https://ecommerce.routemisr.com/api/v1/addresses/${idAddress}`,{headers})
          setLoading(false)
          return data
        } catch (error) {
          setLoading(false)
        }
      }
    
      async function getAddress() {
        try {
          setLoading(true)
          let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/addresses`,{headers})
          setLoading(false)
          return data
        } catch (error) {
            console.log(error);
          setLoading(false)
        }
      }
      async function AddressDetails(idAddress) {
        try {
          setLoading(true)
          let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/addresses/${idAddress}`,{headers})
          setLoading(false)
          return data
        } catch (error) {
            console.log(error);
          setLoading(false)
        }
      }
    
    
    
    


    return <AddressContext.Provider value={{AddAddress,getAddress,deleteAddress,AddressDetails,loading}}>
        {children}
    </AddressContext.Provider>
}

