import React from 'react'
import { AuthContext } from '../contexts/auth'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useShoppingCart } from 'use-shopping-cart';
import { updateCart } from '../api/services';

const LogoutBtn = () => {
    const { cartDetails, clearCart } = useShoppingCart()
    const navigate = useNavigate()
    const { logOutUser, user  } = useContext(AuthContext)

    const logOutRedirect = async () => {
      navigate('/')
    }

  return (
    <div>

    <button className='logoutBtn' onClick={ async () => {
      await updateCart(cartDetails, user)
      await logOutUser()
      await clearCart()
      await localStorage.removeItem('persist:root')
      logOutRedirect()
    }}
    >LOGOUT</button>

    </div>
  )
}

export default LogoutBtn