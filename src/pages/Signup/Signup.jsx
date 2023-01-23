import { useState } from 'react'
import SignupComp from '../../components/SignupComp'
import LoginComp from '../../components/LoginComp'
import loadingIcon from '../../assets/giphy.gif'
import './Signup.css'

const Signup = () => {
  const [signUp, setSignUp] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  if (isLoading) {
    return (
        <div className="loadingIcon">
          <img src={loadingIcon} alt="loading..." height="400px"/>
        </div>
    )
  }

  return (
    <div className="signupContainer">
        <div className="signupInnerDiv">
        <div className="signUpLoginBtns">
          {!isLoading && <button className={signUp && "selected"} onClick={()=>{setSignUp(true)}}>Sign up</button>}
          {!isLoading && <button className={!signUp && "selected"} onClick={()=>{setSignUp(false)}}>Login</button>}
        </div>
          {signUp && <SignupComp isLoading={isLoading} setIsLoading={setIsLoading}/>}
          {!signUp && <LoginComp isLoading={isLoading} setIsLoading={setIsLoading} />}
        </div>
    </div>
  )
}

export default Signup