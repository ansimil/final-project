import React from 'react'
import { Link } from 'react-router-dom'
import { useShoppingCart } from 'use-shopping-cart'
import CartModal from './CartModal'


const CartBtn = () => {
    const { cartCount } = useShoppingCart()
    const [isOpen, setOpen] = React.useState(false)
    const toggleModal = () => setOpen(!isOpen)

  return (
    <>
    <button className="cartBtn" onClick={toggleModal}>
    <span>
          <img className="cartLogo" src="./icons8-warenkorb-50.png" alt="error" height="20px" width="20px"/>
          <span>{cartCount}</span>
    </span>
    </button> 
    <CartModal isOpen={isOpen} toggleModal={toggleModal} />
    </>
  )
}

export default CartBtn