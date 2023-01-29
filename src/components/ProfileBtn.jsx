import { Link } from 'react-router-dom'
import profileIcon from '../assets/image.png'

const ProfileBtn = ({ setProfileMenuOpen, profileMenuOpen, setHamburgerOpen }) => {
    
  return (

    <div className='profileBtn'>

    <Link 
    onClick={()=>{
      setProfileMenuOpen(!profileMenuOpen)
      setHamburgerOpen(false)
      }} 
    className='navBtn' 
    >

    <img src={profileIcon} alt="pic" height="20px" width="20px"/>

    </Link>

    </div>
  )
}

export default ProfileBtn