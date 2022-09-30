import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='dashboardContainer'>
    <h3>Admin dashboard</h3> 
    <Link to="/dashboard/add">Add module</Link>
    
    </div>
  )
}

export default Dashboard