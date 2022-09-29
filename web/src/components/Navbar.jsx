import React from 'react'
import SignInBtn from '../components/SignInBtn'
import HomeBtn from './HomeBtn'
import LogoutBtn from './LogoutBtn'
import ProfileBtn from './ProfileBtn'
import DashboardBtn from './DashboardBtn'


import { AuthContext } from '../contexts/auth'
import { useContext } from 'react'




const Navbar = () => {
  const { isLoggedIn, user } = useContext(AuthContext)
  return (
    <div className="navbar">
    
    <HomeBtn/>
    {!isLoggedIn && <SignInBtn/>}
    {isLoggedIn && user.isAdmin && <DashboardBtn/>}
    {isLoggedIn && <ProfileBtn/>}
    {isLoggedIn && <LogoutBtn/>}
    
    </div>
  )
}

export default Navbar