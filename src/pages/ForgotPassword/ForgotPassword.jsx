import { useState, useEffect } from 'react'
import axios from 'axios'
import "./ForgotPassword.css"
import loadingIcon from '../../assets/giphy.gif'

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [emailCheck, setEmailCheck] = useState(true);
    const [emailSent, setEmailSent] = useState(false)
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false)



    useEffect (() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        if (!emailRegex.test(email)){
            setEmailCheck(false)    
          }

        else if (email.length === 0){
            setEmailCheck(true)
        }

    },[email])

    const handleEmail = (e) => {
        setEmail(e.target.value)
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)
        axios.post(`${process.env.REACT_APP_API_URL}/forgotpassword`, { email })
        .then((res) => {
          setEmail("")
          setEmailSent(true)
        })
        .catch((error) => {
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
        })
        // const requestBody = { email };

    }
  
  if (isLoading && !emailSent) {
    return (
        <div className="loadingIcon">
          <img src={loadingIcon} alt="loading..." height="400px"/>
        </div>
    )
  }

  if (emailSent) {
    return (
      <div className="forgotPasswordPage">
        <h2>Password reset email sent successfully</h2>
      </div>
    )
  }

  return (
    <div className="forgotPasswordPage">
      <h2>Reset Password</h2>
      <form className="loginForm" onSubmit={handleLoginSubmit}>
        <label>Enter your email address:</label>
        <input 
        className={!emailCheck ? "signupFormRed" : "regular"} 
        type="email"
        name="email"
        value={email}
        onChange={handleEmail}
        />
        <button className='signupLoginBtn' type="submit">Send password reset email</button>
          
      </form>
        { errorMessage && <p className="error-message">{errorMessage}</p> }
    </div>
  )
}

export default ForgotPassword