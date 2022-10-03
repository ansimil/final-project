import {useEffect, React, useState, useContext} from 'react'
import { AuthContext } from '../contexts/auth'
import { useShoppingCart } from 'use-shopping-cart'

const Profile = () => {
  const { loadCart } = useShoppingCart()
  const [loggedInUser, setLoggedInUser] = useState([])
  const { user } = useContext(AuthContext)

  useEffect (() =>{
      setLoggedInUser(user)
      const newCartDetails = {...user.cart[0]}
      loadCart(newCartDetails)
      console.log(newCartDetails)
      console.log(user)
      
  },[])


  return (
    <div className="profileContainer"> 
        
        <p>Hi {loggedInUser.firstName}!</p>

    </div>
  )
}

export default Profile