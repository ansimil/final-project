import { useState, createRef, useContext } from 'react'
import { useQueryClient } from 'react-query'
import ModuleCard from '../components/ModuleCard/ModuleCard'
import { ModuleContext } from '../contexts/modules'
import loadingIcon from '../assets/giphy.gif'

const ModulesList = () => {
  const queryClient = useQueryClient()
  const moduleQuery = queryClient.getQueryData('modules')
  const { modules } = useContext(ModuleContext)
  const [isScrolling, setIsScrolling] = useState(false)
  const [clientX, setClientX] = useState(0)
  const [scrollX, setScrollX] = useState(0)
  const ref = createRef()

  console.log(moduleQuery)

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
    >
    
    {modules.map((module) => {
      return <ModuleCard key={module._id} {...module} onMouseUp={onMouseUp} />
    })}
    
    </div>
    </>
  )
}


export default ModulesList