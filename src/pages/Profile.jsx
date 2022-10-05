import {useEffect, React, useState, useContext} from 'react'
import { AuthContext } from '../contexts/auth'
import { useShoppingCart } from 'use-shopping-cart'

const Profile = () => {
  const { cartDetails } = useShoppingCart()
  const [loggedInUser, setLoggedInUser] = useState([])
  const { user } = useContext(AuthContext)

  useEffect (() =>{
      setLoggedInUser(user)
       
      console.log(cartDetails)
      console.log(user)
      // eslint-disable-next-line
  },[])


  return (
    <div className="profileContainer"> 
        
        <p>Hi {loggedInUser.firstName}!</p>

    </div>
  )
}

export default Profile