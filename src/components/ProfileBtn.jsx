import React from 'react'
import { Link } from 'react-router-dom'
import profileIcon from '../assets/image.png'

const ProfileBtn = () => {
    
  return (

    <div className='profileBtn'>

    <Link className='navBtn' to="/profile">

    <img src={profileIcon} alt="pic" height="20px" width="20px"/>

    </Link>

    </div>
  )
}

export default ProfileBtn