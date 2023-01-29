import { useState, useContext, useEffect } from 'react'
import { editUser } from '../api/services'
import toast from 'react-hot-toast'
import { AuthContext } from '../contexts/auth'

const ProfileForm = () => {
        const { user, setUser } = useContext(AuthContext)
        const initValues = {
        firstName: user.firstName,
        surname: user.surname
    }

    const [name, setName] = useState(user.firstName)
    const [allValues, setAllValues] = useState(initValues)

    useEffect(() => {
        setAllValues(user.firstName, user.surname)
    }, [user])

    

    const changeHandler = e => {
        setAllValues( prevValues => {
        return { ...prevValues,[e.target.name]: e.target.value}
     })
     }


     const handleSubmit = async (e) => {
        e.preventDefault()
        const { firstName, surname } = allValues
        const newUserDetails = { firstName, surname }        
        const userDetails = await editUser(newUserDetails, user)
        setUser(userDetails)
        setName(userDetails.firstName)
        toast.success(`Your details have been updated`, {
            style: {
                    border: '2px solid black',
                    backgroundColor: 'white',
                    borderRadius: '0px',
                    padding: '5px 10px',
                    color: 'black',
                    textAlign: 'center',
                    lineHeight: '20px'
           },
           iconTheme: {
                    primary: '#000',
                    secondary: '#fff',
          },
          })
    }


  return (
    <div className='editProfileInner'>
    <h3 className='profileHeader'>Hi {name}!</h3>
    <form className="addModuleForm editProfileForm" onSubmit={handleSubmit}>
            <h2>Profile details:</h2>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName" 
              value={allValues.firstName}
              onChange={changeHandler}
            />

            <label>Surname:</label>
            <input
              type="text"
              name="surname"
              value={allValues.surname}
              onChange={changeHandler}
            />
            <button type="submit">Edit Details</button>
          </form>

    </div>
  )
}

export default ProfileForm