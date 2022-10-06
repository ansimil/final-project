import React from 'react'
import SignupComp from '../components/SignupComp'
import LoginComp from '../components/LoginComp'
import Footer from '../components/Footer'

const Signup = () => {
  return (
    <div className="signupContainer">
        <div className="signupInnerDiv">
          <SignupComp/>
          <LoginComp/>
        </div>
        <Footer/>
    </div>
  )
}

export default Signup