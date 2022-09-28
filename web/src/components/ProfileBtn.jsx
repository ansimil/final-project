import React from 'react'
import { AuthContext } from '../contexts/auth'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

const ProfileBtn = () => {
    const { isLoggedIn } = useContext(AuthContext)
  return (

    <div>

    {isLoggedIn && <Link to="/profile">Profile</Link>}

    </div>
  )
}

export default ProfileBtn