import { useState, useEffect, React } from 'react'
import { getModules } from '../api/services'
import ModuleCard from '../components/ModuleCard'
import loadingIcon from '../assets/giphy.gif'


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
    return (
          <div className="loadingIcon">
              <img src={loadingIcon} alt="loading..." height="400px"/>
          </div>)
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