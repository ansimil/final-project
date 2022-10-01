import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { deleteModule } from '../api/services'
import { ModuleContext } from '../contexts/modules'

const DashboardModuleCard = ({ modulesList }) => {
    const { getModules } = useContext(ModuleContext)

    const handleDelete = async (moduleId) => {
        console.log('yay!') 
        await deleteModule(moduleId)
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