import { createContext, useState, useEffect } from "react";
import axios from "axios";

const ModuleContext = createContext();
    

function ModuleProviderWrapper(props) {

    const [modules, setModules] = useState([])

    const getModules = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/modules`)
        .then((res) => {
            console.log(res.data)
            setModules(res.data)
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        getModules()
        console.log(modules)
    }, [])



    return (
        <ModuleContext.Provider value={{ modules, getModules }}>
          {props.children}
        </ModuleContext.Provider>
      )
}

export { ModuleProviderWrapper, ModuleContext };
