import React from 'react'
import { AuthContext } from '../contexts/auth'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const LogoutBtn = () => {
    const navigate = useNavigate()
    const { logOutUser } = useContext(AuthContext)

    const logOutRedirect = () => {
      navigate('/')
    }

  return (
    <div>

    <button onClick={() => {
      logOutUser()
      logOutRedirect()
    }}
    >Log out</button>

    </div>
  )
}

export default LogoutBtn