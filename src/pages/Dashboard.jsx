import { Link } from 'react-router-dom'
import DashboardModuleCard from '../components/DashboardModuleCard/DashboardModuleCard'


const Dashboard = () => {
  return (
    <div className='dashboardContainer'>
    
    <div>
    <h3>Admin dashboard</h3> 
    </div>

    <div className="addModuleBtn">
    <Link to="/dashboard/add">Add module</Link>
    </div>

    <DashboardModuleCard />
    
    </div>
  )
}

export default Dashboard