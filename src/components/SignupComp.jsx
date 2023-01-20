import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/auth'
import { toast } from 'react-hot-toast';
import { useForm } from "react-hook-form";
import loadingIcon from '../assets/giphy.gif'
import axios from 'axios'


const SignupComp = ({ isLoading, setIsLoading }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { storeToken, authenticateUser } = useContext(AuthContext);
    
    const navigate = useNavigate();
  
    const handleSignupSubmit = (data, e) => {
      e.preventDefault()
      reset()
      setIsLoading(true)
        axios.post(`${process.env.REACT_APP_API_URL}/signup`, data)
        .then( async (response) => {
            storeToken(response.data.authToken)
            await authenticateUser() 
            setIsLoading(false)
            navigate('/profile');
            toast.success('Account created successfully', {
              style: {
                      border: '2px solid black',
                      backgroundColor: 'white',
                      borderRadius: '0px',
                      padding: '5px 10px',
                      color: 'black',
             },
             iconTheme: {
                      primary: '#000',
                      secondary: '#fff',
            },
            })
        })
        .catch((error) => console.log(error))
    };
  
  if (isLoading) {
    return (
        <div className="loadingIcon">
          <img src={loadingIcon} alt="loading..." height="400px"/>
        </div>
    )
  }
 
  
  return (
    
    <div className="signupPage">
      
      <h2>Sign Up</h2>
    
      <form className="signupForm" onSubmit={handleSubmit(handleSignupSubmit)}>
        <label>First Name:</label>
        <input 
        className={errors.firstName ? "signupFormRed" : "regular"}
        type="text"
        name="firstName"
        {...register("firstName", { required: true,  minLength: {value: 2, message: "Name must be at least two characters long"}})}
        />
        { errors.firstName && <p className="error-message">{errors.firstName.message}</p> }


        <label>Surname:</label>
        <input 
          className={errors.surname ? "signupFormRed" : "regular"}
          type="text"
          name="surname"
          {...register("surname", { required: true,  minLength: {value: 2, message: "Name must be at least two characters long"}})}
        />
        { errors.surname && <p className="error-message">{errors.surname.message}</p> }

      
      
        <label>Email:</label>
        <input 
          className={errors.email ? "signupFormRed" : "regular"} 
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
          <button className='signupLoginBtn' type="submit">Sign Up</button>
        </div>
      </form>
 
    </div>
  )
}

export default SignupComp