import React from 'react'
import { AuthContext } from '../contexts/auth'
import { useContext } from 'react'

const LogoutBtn = () => {

    const { logOutUser, isLoggedIn } = useContext(AuthContext)
  return (
    <div>

    {isLoggedIn && <button onClick={logOutUser}>Log out</button>}

    </div>
  )
}

export default LogoutBtn