import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ModuleContext } from '../contexts/modules'
import { AuthContext } from '../contexts/auth'
import axios from 'axios'


const DashboardModuleCard = ({ modulesList }) => {
    const { user } = useContext(AuthContext) 
    const { getModules } = useContext(ModuleContext)

    const handleDelete = async (moduleId) => {
          
          const storedToken = localStorage.getItem('authToken')
          console.log(user)
          console.log(storedToken)

          await axios.delete(`${process.env.REACT_APP_API_URL}/dashboard/${moduleId}/delete`, {data:{ user }, headers: { Authorization: `Bearer ${storedToken}`}})
                .then(res => {
                    // console.log(res.data)
                })
                .catch(err => console.log(err)); 
          getModules()
    }


    if (modulesList.length > 0){
      return (
      <div>
    
        {modulesList.map((module, i) => {
      const {_id, sku, name, category, price, currency, description, shortDescription, tagline, inStock, primaryImageUrl, secondaryImageUrl} = module
      
      return (
          <div className="dashboardModule" key={_id}>
            <details>
                <summary>{i+1} {name}</summary>
                <p>Sku: {sku}</p>
                <p>Name: {name}</p>
                <p>Category: {category}</p>
                <p>Price: {price}</p>
                <p>Currency: {currency}</p>
                <p>Description: {description}</p>
                <p>Short description: {shortDescription}</p>
                <p>Tagline: {tagline}</p>
                <p>In stock: {inStock}</p>
                <a href={primaryImageUrl}>Primary Image</a>
                {secondaryImageUrl && secondaryImageUrl.map((url, i) => {
                  return (<a key={i} href={url}>Secondary Image {i+1}</a>)
                })}
            </details>
            <div>
                <Link to={`/dashboard/${_id}/edit`}>Edit</Link>
                <button onClick={() => handleDelete(_id)}>Delete</button>
               
            </div>

          </div>
      )

    })}

    </div>
  )
}
}

export default DashboardModuleCard