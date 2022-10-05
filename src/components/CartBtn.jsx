import React from 'react'
import { useShoppingCart } from 'use-shopping-cart'
import CartModal from './CartModal'
import logo from "../assets/cart-icon-inverted.png"
import { useLocation } from 'react-router-dom'

const CartBtn = () => {
    const location = useLocation()
    const { cartCount } = useShoppingCart()
    const [isOpen, setOpen] = React.useState(false)
    const toggleModal = () => {
      if(location.pathname !== '/cart'){
      setOpen(!isOpen)
    }
    }
    console.log(location.pathname)
  return (
    <>
    <button className="cartBtn" onClick={toggleModal}>
    <span>
          <img className="cartLogo" src={logo} alt="error" height="20px" width="20px"/>
          <span>  </span>
          <span>{cartCount}</span>
    </span>
    </button>
    {location.pathname !== '/cart' && <CartModal isOpen={isOpen} toggleModal={toggleModal} />}
    </>
  )
}

export default CartBtn