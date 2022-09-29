import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='dashboardContainer'>
    
    <Link to="/dashboard/add">Add module</Link>
    
    </div>
  )
}

export default Dashboard