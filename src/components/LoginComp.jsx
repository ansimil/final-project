import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../contexts/auth'
import { useShoppingCart } from 'use-shopping-cart'

const LoginComp = () => {
    const { loadCart } = useShoppingCart()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const [emailCheck, setEmailCheck] = useState(true);
    const [passwordCheck, setPasswordCheck] = useState(true);
    
    const navigate = useNavigate();
    const { storeToken, authenticateUser } = useContext(AuthContext);


    useEffect(() => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

      if (!emailRegex.test(email)){
        setEmailCheck(false)    
      }
      
      if (!passwordRegex.test(password)){
          setPasswordCheck(false)    
      }
        
      if (email.length === 0){
          setEmailCheck(true)
      }

      if (password.length === 0){
        setPasswordCheck(true)
      }

    }, [email, password])
   
    const handleEmail = (e) => {
        setEmail(e.target.value)
    };

    const handlePassword = (e) => {
        setPassword(e.target.value)   
    };
   
    
    const handleLoginSubmit = (e) => {
      e.preventDefault();
      const requestBody = { email, password };
   
      axios.post(`${process.env.REACT_APP_API_URL}/login`, requestBody)
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
   
        <form className="loginForm" onSubmit={handleLoginSubmit}>
          <label>Email:</label>
          <input 
            className={!emailCheck ? "signupFormRed" : "regular"} 
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
          />
          
   
          <label>Password:</label>
          <input
            className={!passwordCheck ? "signupFormRed" : "regular"} 
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />
        
  
          <br/>
          
          <div>
          <button className='signupLoginBtn' type="submit">Login</button>
          </div>
        </form>
        { errorMessage && <p className="error-message">{errorMessage}</p> }
      </div>
    )
}

export default LoginComp