import { useState, useEffect, React } from 'react'
import { getModules } from '../api/services'
import ModuleCard from '../components/ModuleCard'


const ModulesList = () => {
  const [modules, setModules] = useState([])

  useEffect(()=>{
    getModules()
    .then(res => {
      console.log(res)
      setModules(res)
    })
    
  }, [])

  if(modules.length === 0){
    return <p>Loading...</p>
  }

  return (
    <div>

    {modules.map((module) => {
      return <ModuleCard key={module._id} {...module} />
    })}

    </div>
  )
}

export default ModulesList