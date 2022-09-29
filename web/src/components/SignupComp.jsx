import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../contexts/auth'

const SignupComp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [surname, setSurname] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const [emailCheck, setEmailCheck] = useState(true);
    const [passwordCheck, setPasswordCheck] = useState(true);

    const { storeToken, authenticateUser } = useContext(AuthContext);

 
    const navigate = useNavigate();
  
  //   this.setState({value: event.target.value}, function () {
  //     console.log(this.state.value);
  // });
  
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



    const handleFirstName = (e) => setFirstName(e.target.value);
    const handleSurname = (e) => setSurname(e.target.value);
 
  
    const handleSignupSubmit = (e) => {
        e.preventDefault();
        // Create an object representing the request body
        const requestBody = { email, password, firstName, surname };
    
        // Make an axios request to the API
        // If POST request is successful redirect to login page
        // If the request resolves with an error, set the error message in the state
        axios.post(`${process.env.REACT_APP_API_URL}/signup`, requestBody)
        .then((response) => {
            console.log(response.data)
            storeToken(response.data.authToken) // store in my localStorage the authToken
            authenticateUser() 
            navigate('/profile');
        })
        .catch((error) => {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
        })
    };
 
  
  return (
    
    <div className="SignupPage">
      <h1>Sign Up</h1>
 
        <form className="signupForm" onSubmit={handleSignupSubmit}>
        <label>First Name:</label>
            <input 
            type="text"
            name="name"
            value={firstName}
            onChange={handleFirstName}
            />

        <label>Surname:</label>
        <input 
          type="text"
          name="name"
          value={surname}
          onChange={handleSurname}
        />
        
        
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
 
        <button type="submit">Sign Up</button>
      </form>
 
      { errorMessage && <p className="error-message">{errorMessage}</p> }
    </div>
  )
}

export default SignupComp