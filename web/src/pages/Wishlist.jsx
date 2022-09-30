import {React, useEffect, useState} from 'react'
import { getWishlistModules } from '../api/services'

const Wishlist = () => {
    const [modules, setModules] = useState([])

  useEffect(() => {
    getWishlistModules()
    .then(res => console.log(res))
  }, [])  
  return (
    <div>Wishlist</div>
  )
}

export default Wishlist