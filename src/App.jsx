import { useEffect, useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Cart from './Components/Cart/Cart'
import Brands from './Components/Brands/Brands'
import About from './Components/About/About'
import Categories from './Components/Categories/Categories'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Notfound from './Components/Notfound/Notfound'
import Products from './Components/Products/Products'
import UserContextProvider from './Context/UserContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './Components/ProductDetails/ProductDetails'

function App() {

  let routers=createBrowserRouter([
    {path:'',element:<Layout/>,children:[
      {index:true, element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path:'brands', element:<ProtectedRoute><Brands/></ProtectedRoute>},
      {path:'cart', element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:'products', element:<ProtectedRoute><Products/></ProtectedRoute>},
      {path:'about', element:<ProtectedRoute><About/></ProtectedRoute>},
      {path:'categories', element:<ProtectedRoute><Categories/></ProtectedRoute>},
      {path:'productdetails/:id', element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path:'login', element:<Login/>},
      {path:'register', element:<Register/>},
      {path:'*', element:<Notfound/>},
    ]},
  ])
  

  return (<>
  <UserContextProvider>
  
  <RouterProvider router={routers}></RouterProvider>

  </UserContextProvider>
    </>
  )
}

export default App
