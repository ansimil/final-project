import React from 'react'
import { Link } from 'react-router-dom'

const DashboardBtn = ({setProfileMenuOpen}) => {
  return (
    
    <div className='dashboardBtnContainer'>

    <Link className='navBtn dashboardBtn' to="/dashboard" onClick={()=>{setProfileMenuOpen(false)}}>Dashboard</Link>

    </div>

   
  )
}

export default DashboardBtn