import React from 'react'
import SignupComp from '../components/SignupComp'
import LoginComp from '../components/LoginComp'

const Signup = () => {
  return (
    <div className="signupContainer">
        <SignupComp/>
        <LoginComp/>
    </div>
  )
}

export default Signup