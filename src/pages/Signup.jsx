import React from 'react'
import SignupComp from '../components/SignupComp'
import LoginComp from '../components/LoginComp'

const Signup = () => {
  return (
    <div className="signupContainer">
        <div className="signupInnerDiv">
        <SignupComp/>
        <LoginComp/>
        </div>
    </div>
  )
}

export default Signup