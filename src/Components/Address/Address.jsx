import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AddressContext } from '../../Context/AddressContext'

export default function Address() {

  let {getAddress,deleteAddress} = useContext(AddressContext)

  const [addresses, setAddresses] = useState(null)

  async function showAddress() {
    let response=await getAddress()
    // console.log(response);
    setAddresses(response?.data)
  }

    useEffect(() => {
      showAddress()
    }, [])
    
  return (<>
    <button><Link to='/addAddress'>Add Your Address</Link></button>
    <section>
      <div className="container my-6">
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          {addresses?.map((address,index)=>(
            <Link to={`/addressDetails/${address._id}`} className='flex flex-col justify-center items-center' key={index}>
              <div>{address.details}</div>
              <button onClick={()=>deleteAddress(address._id)}>delete</button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </>
  )
}
