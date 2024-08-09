import React, { useContext, useState } from 'react'
import style from './Navbar.module.css'
import { FaFacebook ,FaTwitter,FaLinkedin,FaInstagram,FaYoutube, FaAlignJustify,} from "react-icons/fa";
import Logo from '../../assets/images/freshcart-logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext';


export default function Navbar() {

    const [smallNav, setSmallNav] = useState(false)

    let {userData ,setUserData}=useContext(UserContext)
      
    let navigate=useNavigate()

    function logOut() {
      localStorage.removeItem('user-token')
      setUserData(null)
      navigate('/login')
    }

  return (<>

    <nav className='md:fixed top-0 inset-x-0 bg-gray-200 text-slate-700 font-medium pt-2 md:py-2 z-10 font-sans'>
      <div className="container flex flex-col md:flex-row justify-start md:justify-between items-center gap-2 px-2">
        <div className='min-w-full md:min-w-min flex flex-col md:flex-row md:items-center gap-2'>
        <div className='flex justify-between items-center'>
        <img src={Logo} width={160} alt="" />
        <button onClick={()=>setSmallNav(!smallNav)} className={`block md:hidden duration-500 ${smallNav ? "text-green-400" : "text-slate-700"}`}><FaAlignJustify className='text-3xl'/></button>
        </div>
        {userData&&
                  <ul className={`${smallNav ? "max-h-screen": "max-h-0 overflow-hidden"} font-semibold md:max-h-full duration-500 md:flex flex-col md:flex-row gap-5 p-2`}>
                  <li><NavLink to=''>Home</NavLink></li>
                  <li><NavLink to='cart'>Cart</NavLink></li>
                  <li><NavLink to='products'>Products</NavLink></li>
                  <li><NavLink to='categories'>Categories</NavLink></li>
                  <li><NavLink to='brands'>Brands</NavLink></li>
                </ul>      
        }
        </div>
        <div className={`${smallNav ? "max-h-screen":"max-h-0 overflow-hidden"} flex justify-center md:max-h-full duration-500 min-w-full md:min-w-min`}>
        <ul className='flex min-w-min flex-row md:items-center gap-4 cursor-pointer py-1 items-center'>
            <li><FaFacebook /></li>
            <li><FaTwitter/></li>
            <li><FaLinkedin /></li>
            <li><FaInstagram /></li>
            <li><FaYoutube/></li>
            {userData?
            <li><span onClick={logOut} className='font-semibold hover:text-red-600 duration-200'>Logout</span></li>
            :<>
            <li><NavLink to='login'>Login</NavLink></li>
            <li><NavLink to='register'>Register</NavLink></li>            
            </>
            }
          </ul>
        </div>
      </div>
    </nav>

  </>
  )
}
