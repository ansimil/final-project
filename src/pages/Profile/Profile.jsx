import { useEffect, useContext, useState } from 'react'
// import Footer from '../../components/Footer/Footer'
import './Profile.css'
import ProfileForm from '../../components/ProfileForm'
import { getUser } from '../../api/services'
import { AuthContext } from '../../contexts/auth'



const Profile = () => {
  const { setUser, user } = useContext(AuthContext)
  const [show, setShow] = useState(false)

  useEffect (() => {
     updateUser(user._id)
      // eslint-disable-next-line
  }, [])

  const updateUser = async (id) => {
     const user = await getUser(id)
     setUser(user)
     setShow(true)
  }

  return (
    <div className="profileContainer"> 
        
        {show &&<ProfileForm />}
        {/* <Footer/> */}

    </div>
  )
}

export default Profile