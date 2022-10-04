import React from 'react'
import { useShoppingCart } from 'use-shopping-cart'
import CartModal from './CartModal'
import logo from "../assets/cart-icon-inverted.png"


const CartBtn = () => {
    const { cartCount } = useShoppingCart()
    const [isOpen, setOpen] = React.useState(false)
    const toggleModal = () => setOpen(!isOpen)

  return (
    <>
    <button className="cartBtn" onClick={toggleModal}>
    <span>
          <img className="cartLogo" src={logo} alt="error" height="22px" width="22px"/>
          <span>  </span>
          <span>{cartCount}</span>
    </span>
    </button> 
    <CartModal isOpen={isOpen} toggleModal={toggleModal} />
    </>
  )
}

export default CartBtn