import React from 'react'
import { Link } from 'react-router-dom'


const SignInBtn = () => {

  return (
    <div>

    <Link className='signinBtn' to="/signup">Sign in</Link>

    </div>
  )
}

export default SignInBtn