import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import "./ForgotPassword.css"
import loadingIcon from '../../assets/giphy.gif'

const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const [emailSent, setEmailSent] = useState(false)
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false)


    const handleForgotPassword = (data, e) => {
        e.preventDefault();
        console.log(data.email)
        setIsLoading(true)

        axios.post(`${process.env.REACT_APP_API_URL}/forgotpassword`, data)
        .then(() => {
          reset()
          setEmailSent(true)
          setIsLoading(false)
        })
        .catch((error) => {
          const errorDescription = error.response.data;
          setIsLoading(false)
          setErrorMessage(errorDescription);
        })
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
        <h5>Please check your emails</h5>
      </div>
    )
  }

  return (
    <div className="forgotPasswordPage">
      <h2>Reset Password</h2>
      <form className="loginForm" onSubmit={handleSubmit(handleForgotPassword)}>
        <label>Enter your email address:</label>
        <input 
        className={errors.email ? "signupFormRed" : "regular"} 
        name="email"
        {...register("email", { required: true,  pattern: {value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, message: "Please enter a valid email address"}})}
        />
        { errors.email && <p className="error-message">{errors.email.message}</p> }

        <button className='signupLoginBtn' type="submit">Send password reset email</button>
          
      </form>
        { errorMessage && <p className="error-message-large">{errorMessage}</p> }
    </div>
  )
}

export default ForgotPassword