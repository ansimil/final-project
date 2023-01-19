import React from 'react'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/auth'
import { useShoppingCart } from 'use-shopping-cart'
import { useForm } from "react-hook-form";

import axios from 'axios'


const LoginComp = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { loadCart } = useShoppingCart()
    const [errorMessage, setErrorMessage] = useState(undefined);
    
    const navigate = useNavigate();
    const { storeToken, authenticateUser } = useContext(AuthContext);
    
    const handleLoginSubmit = (data, e) => {
      e.preventDefault();
      reset()
      axios.post(`${process.env.REACT_APP_API_URL}/login`, data)
        .then(async (response) => {
          storeToken(response.data.authToken) 
          await authenticateUser()
          const newCartDetails = {...response.data.cart[0]}
          await loadCart(newCartDetails, false)
          navigate('/profile');            
        })
        .catch((error) => {
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
        })
    };
    
    return (
      <div className="LoginPage">
        <h2>Login</h2>
   
        <form className="loginForm" onSubmit={handleSubmit(handleLoginSubmit)}>
          <label>Email:</label>
          <input 
            className={errors.email ? "signupFormRed" : "regular"} 
            type="email"
            name="email"
            {...register("email", { required: true,  pattern: {value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, message: "Please enter a valid email address"}})}
          />
          { errors.email && <p className="error-message">{errors.email.message}</p> }
   
          <label>Password:</label>
          <input
            className={errors.password ? "signupFormRed" : "regular"} 
            type="password"
            name="password"
            {...register("password", { required: true, pattern: {value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/, message:  "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter."}})}
          />
          { errors.password && <p className="error-message">{errors?.password?.message}</p> }
        
  
          <br/>
          <div>
          <a href="/forgotpassword">Forgot your password?</a>
          </div>
          <div>
          <button className='signupLoginBtn' type="submit">Login</button>
          </div>
        </form>
        { errorMessage && <p className="error-message">{errorMessage}</p> }
      </div>
    )
}

export default LoginComp