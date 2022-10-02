import React from 'react'
import { AuthContext } from '../contexts/auth'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const LogoutBtn = () => {
    const navigate = useNavigate()
    const { logOutUser, isLoggedIn, authenticateUser  } = useContext(AuthContext)

    const logOutRedirect = async () => {
      console.log(isLoggedIn)
      navigate('/')
    }

  return (
    <div>

    <button onClick={ async () => {
      await logOutUser()
      logOutRedirect()
    }}
    >Log out</button>

    </div>
  )
}

export default LogoutBtn