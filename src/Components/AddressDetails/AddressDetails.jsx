import React, { useContext, useEffect, useState } from 'react'
import style from './AddressDetails.module.css'
import { useParams } from 'react-router-dom'
import { AddressContext } from '../../Context/AddressContext'
export default function AddressDetails() {

 let {AddressDetails} = useContext(AddressContext)

 const [address, setAddress] = useState({})

  let {id}=useParams()
  // console.log(id);

  async function details(id) {
    let response = await AddressDetails(id)
    console.log(response);
    setAddress(response.data)
  }

  useEffect(() => {
    details(id)
  }, [])
  

  return (<>

  <section>
    <div className="container">
      <div>
        <h1>{address.name}</h1>
        <h1>{address.details}</h1>
        <h1>{address.phone}</h1>
        <h1>{address.city}</h1>
      </div>
    </div>
  </section>

  </>
  )
}
