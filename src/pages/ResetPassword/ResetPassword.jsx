import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import loadingIcon from '../../assets/giphy.gif'
import { useForm } from 'react-hook-form'


const ResetPassword = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const [isValid, setIsValid] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState(undefined)
    const [passwordReset, setPasswordReset] = useState(false)
    const {resetId} = useParams()

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/resetpassword/${resetId}`)
        .then((res) => {
            if (res.data === 'good') {
                setIsLoading(false)
                setIsValid(true)
            }
            else {
                setIsLoading(false)
            }
        })
        .catch(() => {
            setIsLoading(false)
            setIsValid(false)
        })
         // eslint-disable-next-line      
    }, [])

    const handleResetPassword = (data, e) => {
        e.preventDefault();
        if (data.password !== data.confirmPassword){
            setErrorMessage('Passwords do not match')
            return
        }
        else {
        setIsLoading(true)
        axios.put(`${process.env.REACT_APP_API_URL}/reset/${resetId}`, data)
        .then((res) => {
            if (res.data === 'good') {
                reset()
                setIsValid(false)
                setIsLoading(false)
                setPasswordReset(true)
            }
            else {
                reset()
               setIsLoading(false)
               setErrorMessage('Something went wrong, please go the login page and try resetting your password again') 
            }
        })
        .catch(err => console.log(err))
        }
    }

    

    if (passwordReset) {
        return (
        <div className="forgotPasswordPage">
            <h2>Password reset successfully</h2>
            <h2><a href="/signup">Go to login page</a></h2>
        </div>
      )
    }

    else if (isLoading) {
        return (
            <div className="loadingIcon">
                <img src={loadingIcon} alt="loading..." height="400px"/>
            </div>
            )
    }
    else if (!isLoading && !isValid) {
        return (
            <div className="error-message forgotPasswordPage">
                <h3>Reset link is not valid or has timed out.</h3>
                <h3><a href="/forgotpassword">Get new link</a></h3>
            </div>
        )
    }
   

  return (
    <div className="forgotPasswordPage">

        <form className="loginForm" onSubmit={handleSubmit(handleResetPassword)}>
        <label>New password:</label>
        <input 
        className="regular"
        type="password"
        name="password"
        {...register("password", { required: true, pattern: {value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/, message:  "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter."}})}
        />
        { errors.password && <p className="error-message">{errors?.password?.message}</p> }

        <label>Confirm password:</label>
        <input 
        className="regular" 
        type="password"
        name="confirmPassword"
        {...register("confirmPassword", { required: true, pattern: {value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/, message:  "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter."}})}
        />
        { errors.confirmPassword && <p className="error-message">{errors?.confirmPassword?.message}</p> }

        <button className='signupLoginBtn' type="submit">Reset password</button>
          
      </form>
        { errorMessage && <p className="error-message-large">{errorMessage}</p> }
    </div>
  )
}

export default ResetPassword