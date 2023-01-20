import React from 'react'
import { Link } from 'react-router-dom'


const SignInBtn = ({ setHamburgerOpen }) => {

  return (
    <div>

    <Link onClick={()=>{setHamburgerOpen(false)}} className='signinBtn' to="/signup">Sign in</Link>

    </div>
  )
}

export default SignInBtn