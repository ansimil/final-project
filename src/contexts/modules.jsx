import { createContext, useState, useEffect } from "react";
import { editModule, createModule } from '../api/services'
import axios from "axios";

const ModuleContext = createContext();

function ModuleProviderWrapper(props) {
    const [module, setModule] = useState({})
    const [modules, setModules] = useState([])

    const getModules = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/modules`)
        .then((res) => {
            setModules(res.data)
        })
        .catch(err => console.log(err));
    }

    const getModule = async (moduleId) => {
        await axios.get(`${process.env.REACT_APP_API_URL}/module/${moduleId}`)
        .then((res) => {
            setModule(res.data)
            return res.data

        })
        .catch(err => console.log(err));
      };

    useEffect(() => {
        getModules()
    }, [])



    return (
        <ModuleContext.Provider value={{ modules, module, setModule, getModules, getModule, editModule, createModule }}>
          {props.children}
        </ModuleContext.Provider>
      )
}

export { ModuleProviderWrapper, ModuleContext };
