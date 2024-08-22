import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AddressContext } from '../../Context/AddressContext'
import Loading from '../Loading/Loading'

export default function Address() {

  let {getAddress,deleteAddress,loading} = useContext(AddressContext)

  const [addresses, setAddresses] = useState(null)

  async function showAddress() {
    let response=await getAddress()
    // console.log(response);
    setAddresses(response?.data)
  }


  const handleDelete = async (AddressId, e) => {
    e.preventDefault()
    await deleteAddress(AddressId)
    showAddress()
  };

    useEffect(() => {
      showAddress()
    }, [])
    
  return (<>
    <section>
      <div className="container my-6">
        {!loading ? (
          <>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-5'>
              {addresses?.map((address, index) => (
                <Link to={`/addressDetails/${address._id}`} className='bg-main text-white flex flex-col justify-center items-center p-3 gap-5 rounded-xl hover:scale-x-105 duration-300' key={index}>
                  <div className='text-3xl'>{address.name}</div>
                  <button className='bg-red-600 px-1 py1 rounded-md text-lg hover:scale-110 duration-200' onClick={(e) => handleDelete(address._id,e)}>Delete</button>
                </Link>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <button className="btn bg-main p-2 rounded-lg text-white">
                <Link to='/addAddress'>Add Your Address</Link>
              </button>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </section>  
  </>
  )
}
