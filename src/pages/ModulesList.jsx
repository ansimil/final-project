import { useState, useEffect, createRef } from 'react'
import { getModules } from '../api/services'
import ModuleCard from '../components/ModuleCard/ModuleCard'
import loadingIcon from '../assets/giphy.gif'

const ModulesList = () => {
  const [modules, setModules] = useState([])
  const [isScrolling, setIsScrolling] = useState(false)
  const [clientX, setClientX] = useState(0)
  const [scrollX, setScrollX] = useState(0)
  const ref = createRef()

  useEffect(()=>{
    getModules()
    .then(res => {
      setModules(res)
    })
  }, [])

  const onMouseDown = (e) => {
    setIsScrolling(true); 
    setClientX(e.clientX);
  };

  const onMouseUp = () => {
    setIsScrolling(false);
  };

  const onMouseMove = (e) => {
    if (isScrolling) {
      e.preventDefault();
      e.stopPropagation();
      ref.current.scrollLeft = scrollX - e.clientX + clientX;
      setScrollX(scrollX - e.clientX + clientX);
      setClientX(e.clientX);
    }
  };

  const onDrag = (e) => {
    console.log(e)
  }

  if(modules.length === 0){
    return (
          <div className="loadingIcon">
              <img src={loadingIcon} alt="loading..." height="400px"/>
          </div>)
  }

  return (
    <>
    <div 
    className='modulesListContainer'
    ref={ref}
    onMouseDown={onMouseDown}
    onMouseUp={onMouseUp}
    onMouseMove={onMouseMove}
    onDrag={onDrag}
    >
    
    {modules.map((module) => {
      return <ModuleCard key={module._id} {...module} onMouseUp={onMouseUp} />
    })}
    
    </div>
    </>
  )
}


export default ModulesList