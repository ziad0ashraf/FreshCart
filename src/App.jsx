import { useState } from 'react'
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

function App() {

  let routers=createBrowserRouter([
    {path:'',element:<Layout/>,children:[
      {index:true, element:<Home/>},
      {path:'brands', element:<Brands/>},
      {path:'cart', element:<Cart/>},
      {path:'products', element:<Products/>},
      {path:'about', element:<About/>},
      {path:'categories', element:<Categories/>},
      {path:'login', element:<Login/>},
      {path:'register', element:<Register/>},
      {path:'*', element:<Notfound/>},
    ]},
  ])

  return (<>
    <RouterProvider router={routers}></RouterProvider>
    </>
  )
}

export default App
