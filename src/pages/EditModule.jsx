import EditModuleForm from '../components/EditModuleForm'
import { useEffect, useState, React } from 'react';
import { useParams } from 'react-router-dom'
import { getModule } from '../api/services';

const EditModule = () => {
    const { moduleId } = useParams(); 
    const [module, setModule] = useState({})


    useEffect(() => {
        getModule(moduleId)
        .then(res => {
            console.log(res)
            setModule(res)
        })
        .catch(err => console.log(err))
        // eslint-disable-next-line
    } ,[]) 


    if (Object.values(module).length === 0){
        return <p>Loading...</p>
    }

    return (
    <div className="editModuleContainer">
    
    <EditModuleForm {...module}/>
    </div>
  )
}

export default EditModule