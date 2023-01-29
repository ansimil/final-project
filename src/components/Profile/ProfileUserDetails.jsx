import { useForm } from "react-hook-form"
import { useState } from 'react'
import './ProfileUserDetails.css'

const ProfileUserDetails = ({ user }) => {
    const { register, handleSubmit, getValues } = useForm({
        defaultValues: {
            firstName: user.firstName,
            surname: user.surname
        }
    })
    const [firstMatching, setFirstMatching] = useState(true)
    const [surnameMatching, setSurnameMatching] = useState(true)

    const checkFirstMatching = (e) => {
        let firstName = e.target.value
        if (firstName !== user.firstName){
            setFirstMatching(false)
        }
        else {
            setFirstMatching(true)
        }
    }
    const checkSurnameMatching = (e) => {
        let surname = e.target.value
        if (surname !== user.surname){
            setSurnameMatching(false)
            console.log('surname no match')
        }
        else {
            setSurnameMatching(true)
        }
    }
    

  return (
    <div className="userDetailsContainer">
        {/* <h3 className='profileHeader'>Hi {user.firstName}!</h3> */}
        <form className="addModuleForm editProfileForm" onSubmit={handleSubmit}>
            <h2>Account details:</h2>
            <label>First Name:</label>
            <input
                type="text"
                name="firstName"
                {...register("firstName")}
                onChange={(e) => {checkFirstMatching(e)}}
            />

            <label>Surname:</label>
            <input
              type="text"
              name="surname"
              {...register("surname")}
              onChange={(e) => {checkSurnameMatching(e)}}
            />
            <button disabled={firstMatching && surnameMatching   ? true : ""} type="submit">Update Details</button>
          </form> 
    </div>
  )
}

export default ProfileUserDetails