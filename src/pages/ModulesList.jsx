import { useState, useEffect, React } from 'react'
import { getModules } from '../api/services'
import ModuleCard from '../components/ModuleCard'


const ModulesList = () => {
  const [modules, setModules] = useState([])

  useEffect(()=>{
    console.log(localStorage.getItem('cartDetails'))
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
    <div className='modulesListContainer'>

    {modules.map((module) => {
      return <ModuleCard key={module._id} {...module} />
    })}

    </div>
  )
}

export default ModulesList