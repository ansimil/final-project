import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import loadingIcon from '../../assets/giphy.gif'


const ResetPassword = () => {
    const [isValid, setIsValid] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordCheck, setPasswordCheck] = useState(false)
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

    const handlePassword = (e) => {
        setPassword(e.target.value)
        const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if (!passwordRegex.test(password)){
            setPasswordCheck(false) 
        }
        else {
            setPasswordCheck(true) 
        }
    };

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        setPassword("")
        setConfirmPassword("")
        if (!passwordCheck) {
            setErrorMessage('Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.')
            return
        }
        else if (password !== confirmPassword){
            setErrorMessage('Passwords do not match')
            return
        }
        else {
        setIsLoading(true)
        axios.put(`${process.env.REACT_APP_API_URL}/reset/${resetId}`, { password })
        .then((res) => {
            if (res.data === 'good') {
                setIsValid(false)
                setIsLoading(false)
                setPasswordReset(true)
            }
            else {
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
        <form className="loginForm" onSubmit={handleResetPassword}>
        <label>New password:</label>
        <input 
        className="regular"
        type="password"
        name="password"
        value={password}
        onChange={handlePassword}
        />
        <label>Confirm password:</label>
        <input 
        className="regular" 
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={handleConfirmPassword}
        />
        <button className='signupLoginBtn' type="submit">Reset password</button>
          
      </form>
        { errorMessage && <p className="error-message">{errorMessage}</p> }
    </div>
  )
}

export default ResetPassword