import {useEffect, React, useState, useContext} from 'react'
import { AuthContext } from '../contexts/auth'

const Profile = () => {

  const [loggedInUser, setLoggedInUser] = useState([])
  const { user } = useContext(AuthContext)

  useEffect (() =>{
      setLoggedInUser(user)
      console.log(user)
  },[])


  return (
    <div className="profileContainer"> 
        
        <p>Hi {loggedInUser.firstName}!</p>

    </div>
  )
}

export default Profile