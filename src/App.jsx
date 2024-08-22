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
import CartContextProvider from './Context/CartContext'
import { Toaster } from 'react-hot-toast'
import AllOrders from './Components/AllOrders/AllOrders'
import CheckOut from './Components/CheckOut/CheckOut'
import Wishlist from './Components/Wishlist/Wishlist'
import WishlistContextProvider from './Context/WishlistContext'
import { QueryClient, QueryClientContext, QueryClientProvider } from '@tanstack/react-query'
import ProductsByCategory from './Components/ProductsByCategory/ProductsByCategory'
import ProductsByBrand from './Components/ProductsByBrand/ProductsByBrand'
import ForgotPassword from './Components/ForgotPassword/ForgotPassword'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import Address from './Components/Address/Address'
import AddressContextProvider from './Context/AddressContext'
import AddAddress from './Components/AddAddress/AddAddress'
import AddressDetails from './Components/AddressDetails/AddressDetails'
import UpdatePassword from './Components/UpdatePassword/UpdatePassword'
import UpdateUserData from './Components/UpdateUserData/UpdateUserData'

function App() {

  let routers=createBrowserRouter([
    {path:'',element:<Layout/>,children:[
      {index:true, element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path:'brands', element:<ProtectedRoute><Brands/></ProtectedRoute>},
      {path:'cart', element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:'products', element:<ProtectedRoute><Products/></ProtectedRoute>},
      {path:'about', element:<ProtectedRoute><About/></ProtectedRoute>},
      {path:'categories', element:<ProtectedRoute><Categories/></ProtectedRoute>},
      {path:'allorders', element:<ProtectedRoute><AllOrders/></ProtectedRoute>},
      {path:'checkout', element:<ProtectedRoute><CheckOut/></ProtectedRoute>},
      {path:'wishlist', element:<ProtectedRoute><Wishlist/></ProtectedRoute>},
      {path:'productsByCategory/:id', element:<ProtectedRoute><ProductsByCategory/></ProtectedRoute>},
      {path:'productsByBrand/:id', element:<ProtectedRoute><ProductsByBrand/></ProtectedRoute>},
      {path:'productdetails/:id', element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path:'addressDetails/:id', element:<ProtectedRoute><AddressDetails/></ProtectedRoute>},
      {path:'address', element:<ProtectedRoute><Address/></ProtectedRoute>},
      {path:'addAddress', element:<ProtectedRoute><AddAddress/></ProtectedRoute>},
      {path:'updatePassword', element:<ProtectedRoute><UpdatePassword/></ProtectedRoute>},
      {path:'updateUserData', element:<ProtectedRoute><UpdateUserData/></ProtectedRoute>},
      {path:'login', element:<Login/>},
      {path:'register', element:<Register/>},
      {path:'forgotPassword', element:<ForgotPassword/>},
      {path:'resetPassword', element:<ResetPassword/>},
      {path:'*', element:<Notfound/>},
    ]},
  ])
  
  let query=new QueryClient()

  return (
 <QueryClientProvider client={query}>
      <AddressContextProvider>
        <WishlistContextProvider>
          <CartContextProvider>
            <UserContextProvider>
              <RouterProvider router={routers} />
              <Toaster />
            </UserContextProvider>
          </CartContextProvider>
        </WishlistContextProvider>
      </AddressContextProvider>
    </QueryClientProvider>
  );
  }

export default App
