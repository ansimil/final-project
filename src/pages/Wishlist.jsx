import {React, useEffect } from 'react'
import { getWishlistModules } from '../api/services'

const Wishlist = () => {

  useEffect(() => {
    getWishlistModules()
    .then(res => console.log(res))
    // eslint-disable-next-line
  }, [])  
  return (
    <div>Wishlist</div>
  )
}

export default Wishlist