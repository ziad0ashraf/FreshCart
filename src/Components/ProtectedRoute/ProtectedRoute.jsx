import React, { useState } from 'react'
import style from './ProtectedRoute.module.css'
import { Navigate } from 'react-router-dom'


export default function ProtectedRoute({children}) {

  if (localStorage.getItem('user-token')) {
    return children
  }else{
    return <Navigate to ={'/login'}/>
  }

}
