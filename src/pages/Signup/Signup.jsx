import { useState } from 'react'
import SignupComp from '../../components/SignupComp'
import LoginComp from '../../components/LoginComp'
import './Signup.css'

const Signup = () => {
  const [signUp, setSignUp] = useState(true)
  return (
    <div className="signupContainer">
        <div className="signupInnerDiv">
        <div className="signUpLoginBtns">
          <button className={signUp && "selected"} onClick={()=>{setSignUp(true)}}>Sign up</button>
          <button className={!signUp && "selected"} onClick={()=>{setSignUp(false)}}>Login</button>
        </div>
          {signUp && <SignupComp/>}
          {!signUp && <LoginComp/>}
        </div>
    </div>
  )
}

export default Signup