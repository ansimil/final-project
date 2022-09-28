import React from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/auth'
import { useContext } from 'react'

const SignInBtn = () => {
  const { isLoggedIn } = useContext(AuthContext)
  return (
    <div>

    {!isLoggedIn && <Link to="/signup">Sign in</Link>}

    </div>
  )
}

export default SignInBtn