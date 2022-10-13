import { React, useContext } from 'react'
import { ModuleContext } from '../contexts/modules'
import { Link } from 'react-router-dom'
import DashboardModuleCard from '../components/DashboardModuleCard/DashboardModuleCard'


const Dashboard = () => {
  const { modules } = useContext(ModuleContext)
  return (
    <div className='dashboardContainer'>
    
    <div>
    <h3>Admin dashboard</h3> 
    </div>

    <div className="addModuleBtn">
    <Link to="/dashboard/add">Add module</Link>
    </div>

    
    <DashboardModuleCard modulesList={modules}/>
    
    </div>
  )
}

export default Dashboard