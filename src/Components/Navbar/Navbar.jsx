import React, { useState } from 'react'
import style from './Navbar.module.css'
import { FaFacebook ,FaTwitter,FaLinkedin,FaInstagram,FaYoutube, FaGripLines,} from "react-icons/fa";
import Logo from '../../assets/images/freshcart-logo.svg'
import { NavLink } from 'react-router-dom'


export default function Navbar() {

    const [smallNav, setSmallNav] = useState(false)


  return (<>

    <nav className='md:fixed top-0 inset-x-0 bg-gray-200 text-slate-700 font-medium py-2'>
      <div className="container flex flex-col md:flex-row justify-start md:justify-between items-center gap-2 px-2">
        <div className='min-w-full md:min-w-min flex flex-col md:flex-row md:items-center gap-2'>
        <img src={Logo} width={160} alt="" />
          <ul className={`${smallNav ? "max-h-screen": "max-h-0 overflow-hidden"} md:max-h-full duration-500 md:flex flex-col md:flex-row gap-2`}>
            <li><NavLink to='home'>Home</NavLink></li>
            <li><NavLink to='cart'>Cart</NavLink></li>
            <li><NavLink to='products'>Products</NavLink></li>
            <li><NavLink to='categories'>Categories</NavLink></li>
            <li><NavLink to='brands'>Brands</NavLink></li>
          </ul>
        </div>
        <div className={`${smallNav ? "max-h-screen":"max-h-0 overflow-hidden"} md:max-h-full duration-500 min-w-full md:min-w-min`}>
        <ul className='flex min-w-min flex-col md:flex-row md:items-center gap-2 text-black'>
            <li><FaFacebook /></li>
            <li><FaTwitter/></li>
            <li><FaLinkedin /></li>
            <li><FaInstagram /></li>
            <li><FaYoutube/></li>
            <li><NavLink to='login'>Login</NavLink></li>
            <li><NavLink to=''>Register</NavLink></li>
            <li><span>Logout</span></li>
          </ul>
        </div>
        <button onClick={()=>setSmallNav(!smallNav)} className='block md:hidden'><FaGripLines /></button>
      </div>
    </nav>

  </>
  )
}
