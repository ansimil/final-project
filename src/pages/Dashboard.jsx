import { React, useContext } from 'react'
import { ModuleContext } from '../contexts/modules'
import { Link } from 'react-router-dom'
import DashboardModuleCard from '../components/DashboardModuleCard'


const Dashboard = () => {
  const { modules } = useContext(ModuleContext)
  return (
    <div className='dashboardContainer'>
    <h3>Admin dashboard</h3> 
    <Link to="/dashboard/add">Add module</Link>
    
    <DashboardModuleCard modulesList={modules}/>

    </div>
  )
}

export default Dashboard