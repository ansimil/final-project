import React from 'react'
import { Link } from 'react-router-dom'
import { useShoppingCart } from 'use-shopping-cart'

const CartBtn = () => {
    const { cartCount } = useShoppingCart()

  return (
    <div>

    <Link to='/cart'>Cart: {cartCount}</Link> 

    </div>
  )
}

export default CartBtn