import React from 'react'
import SignInBtn from '../components/SignInBtn'
import HomeBtn from './HomeBtn'
import LogoutBtn from './LogoutBtn'
import ProfileBtn from './ProfileBtn'


const Navbar = () => {
  return (
    <div className="navbar">
    
    <HomeBtn/>
    <SignInBtn/>
    <ProfileBtn/>
    <LogoutBtn/>
    
    </div>
  )
}

export default Navbar