import React, { useContext, useState } from 'react'
import style from './Navbar.module.css'
import { FaFacebook ,FaTwitter,FaLinkedin,FaInstagram,FaYoutube, FaAlignJustify, FaHeart } from "react-icons/fa";
import { BsCart } from "react-icons/bs";
import Logo from '../../assets/images/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';
import { GrUserManager } from 'react-icons/gr';
import Swal from 'sweetalert2'


export default function Navbar() {

    const [smallNav, setSmallNav] = useState(false)
    
    const [dropDown, setDropDown] = useState(false)

    let {userData ,setUserData}=useContext(UserContext)
    let {cartItems,animationCart}=useContext(CartContext)
    let {wishlistCount,animationWishlist}=useContext(WishlistContext)
      
    let navigate=useNavigate()

    function logOut() {
      localStorage.removeItem('user-token')
      setUserData(null)
      navigate('/login')
    }

    function toggleButton() {
      setSmallNav(!smallNav)
      setDropDown(false)
    }

    function handelLogout() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, Logout !"
      }).then( (result) => {
        if (result.isConfirmed) {
          logOut()
          Swal.fire({
            title: "Done!",
            text: "You will be logged out now.",
            icon: "success"
          });
        }
      });  
    }
  

  return (<>

    <nav className='fixed top-0 inset-x-0 bg-gray-200 text-slate-700 font-medium pt-4 md:py-2 z-10 font-sans'>
      <div className="container flex flex-col md:flex-row justify-start md:justify-between items-center gap-2 px-2">
        <div className='min-w-full md:min-w-min flex flex-col md:flex-row md:items-center gap-2'>
        <div className='flex justify-between items-center'>
          <img src={Logo} width={160} alt="" />
          <button onClick={()=>toggleButton()} className={`block md:hidden duration-500 ${smallNav ? "text-green-400" : "text-slate-700"}`}><FaAlignJustify className='text-3xl'/></button>
        </div>
        {userData&&
                <ul onClick={()=>toggleButton()} className={`${smallNav ? "max-h-screen": "max-h-0 overflow-hidden"} font-semibold md:max-h-full duration-500 md:flex flex-col md:flex-row md:gap-5`}>
                  <li><NavLink className='px-2 py-2' to=''>Home</NavLink></li>
                  <li><NavLink className='px-2 py-2' to='products'>Products</NavLink></li>
                  <li><NavLink className='px-2 py-2' to='categories'>Categories</NavLink></li>
                  <li><NavLink className='px-2 py-2' to='brands'>Brands</NavLink></li>
                </ul>      
        }
        </div>
        
        <div className={`${smallNav ? "max-h-screen":"max-h-0"} overflow-hidden flex justify-center items-center md:max-h-full duration-500 min-w-full md:min-w-min`}>
        {userData&&
        <>
        <div className='flex items-center justify-between md:gap-5'>
        <div className='relative '>
          <button onClick={()=>setDropDown(!dropDown)} className={`${dropDown&&'text-main'} duration-500 text-3xl`}><GrUserManager /></button>
          <div className={`${dropDown?'max-h-full max-w-full':'max-h-0 max-w-0'} overflow-hidden duration-500 fixed mt-3 bg-main rounded-lg`}>
            <ul className='p-2 whitespace-nowrap'>
              <li><NavLink to='address'>Your Address</NavLink></li>
              <li><NavLink to='updatePassword'>Change Your Password</NavLink></li>
              <li><NavLink to='updateUserData'>Change Your Information Data</NavLink></li>
              <li></li>
            </ul>
          </div>
        </div>
          <div onClick={()=>toggleButton()} className='flex justify-center items-center gap-3 md:gap-5'>
          <NavLink className={({ isActive }) =>`${isActive ? 'text-red-600' : 'text-slate-700'} px-1 py-2 duration-300`} to='wishlist'>
            <div className='flex items-center gap-2'>
              <span className='text-base'>Wishlist</span>
              <span className={`${animationWishlist?'text-red-600 animate-bounce':''} relative duration-150`}><FaHeart/>
              <span className='absolute -top-4 -right-3'>{wishlistCount ? wishlistCount : 0}</span>
              </span>
            </div>
          </NavLink>
          <Link to='cart'>
          <div className={`${animationCart?'animate-bounce':''} flex me-5 text-main relative`}>
            <span className='text-4xl'><BsCart/></span>
            <span className='absolute right-3 top-1'>{cartItems?.numOfCartItems ? cartItems?.numOfCartItems : 0}</span>
          </div>
            </Link>    
          </div>
        </div>
        </>        
        }
        <ul onClick={()=>toggleButton()} className='flex flex-row md:items-center gap-2 md:gap-5 cursor-pointer py-1 items-center'>
            <li><FaFacebook /></li>
            <li><FaTwitter/></li>
            <li><FaLinkedin /></li>
            <li><FaInstagram /></li>
            <li><FaYoutube/></li>
            {userData?
            <li><span onClick={()=>handelLogout()} className='font-semibold hover:text-red-600 duration-200'>Logout</span></li>
            :<>
            <li><NavLink className='px-2 py-1' to='login'>Login</NavLink></li>
            <li><NavLink className='px-2 py-1' to='register'>Register</NavLink></li>            
            </>
            }
          </ul>
        </div>
      </div>
    </nav>

  </>
  )
}
