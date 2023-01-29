import ProfileOrderHistory from "./ProfileOrderHistory"
import ProfileUserDetails from "./ProfileUserDetails"
import './ProfileContainer.css'

const ProfileContainer = ({ user, accountDetailsSelected }) => {
  return (
    <div className="profileDetailsContainer">
      {accountDetailsSelected && <ProfileUserDetails user={user}/>}
      {!accountDetailsSelected && <ProfileOrderHistory user={user}/>}
    </div>
  )
}

export default ProfileContainer