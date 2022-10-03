import React from 'react'
import { Link } from 'react-router-dom'

const DashboardBtn = () => {
  return (
    <div>

    <Link className='navBtn' to="/dashboard">Dashboard</Link>

    </div>
  )
}

export default DashboardBtn