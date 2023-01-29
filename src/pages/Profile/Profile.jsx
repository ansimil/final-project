import { useEffect, useContext, useState } from 'react'
import './Profile.css'
import ProfileForm from '../../components/ProfileForm'
import ProfileSelectors from '../../components/Profile/ProfileSelectors'
import ProfileContainer from '../../components/Profile/ProfileContainer'
import { getUser } from '../../api/services'
import { AuthContext } from '../../contexts/auth'



const Profile = () => {
  const { setUser, user } = useContext(AuthContext)
  const [accountDetailsSelected, setAccountDetailsSelected] = useState(true)
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
      <div className="profileInner">
        <ProfileSelectors setAccountDetailsSelected={setAccountDetailsSelected} accountDetailsSelected={accountDetailsSelected}/>
        <ProfileContainer user={user} accountDetailsSelected={accountDetailsSelected}/>
        {/* {show &&<ProfileForm />} */}
      </div>  
    </div>
  )
}

export default Profile