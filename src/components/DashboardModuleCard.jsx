import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ModuleContext } from '../contexts/modules'
import { AuthContext } from '../contexts/auth'
import axios from 'axios'


const DashboardModuleCard = ({ modulesList }) => {
    const { user } = useContext(AuthContext) 
    const { getModules } = useContext(ModuleContext)
    const [open, setOpen] = useState(false)
  

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
      <div className="dashboardModuleContainer">
    
        {modulesList.map((module, i) => {
      const {_id, sku, name, category, price, currency, description, shortDescription, tagline, inStock, primaryImageUrl, secondaryImageUrl} = module
      return (
          <div key={_id}>
            <details open={open}>
                <summary>{`${i+1}. ${name}`}</summary>
                {/* <p>Sku: {sku}</p>
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
                })} */}
                <table>
                  <tr>
                    <td>Sku</td>
                    <td>{sku}</td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td>{name}</td>
                  </tr>
                  <tr>
                    <td>Category</td>
                    <td>{category}</td>
                  </tr>
                  <tr>
                    <td>Price</td>
                    <td>{price}</td>
                  </tr>
                  <tr>
                    <td>Currency</td>
                    <td>{currency}</td>
                  </tr>
                  <tr>
                    <td>Description</td>
                    <td>{description}</td>
                  </tr>
                  <tr>
                    <td>Short description</td>
                    <td>{shortDescription}</td>
                  </tr>
                  <tr>
                    <td>Tagline</td>
                    <td>{tagline}</td>
                  </tr>
                  <tr>
                    <td>In Stock</td>
                    <td>{inStock}</td>
                  </tr>
                  <tr>
                    <td>Primary Image</td>
                    <td><a href={primaryImageUrl}>Link</a></td>
                  </tr>
                  {secondaryImageUrl && secondaryImageUrl.map((url, i) => {
                  return (
                    <tr>
                    <td>Secondary Image {i+1}</td>
                    <td><a key={i} href={url}>Link</a></td>
                    </tr> 
                    )
                })}

                </table>
            </details>
            <div className="dashboardBtns">
                <button onClick={() => setOpen(!open)}>{!open ? 'View' : 'Close'}</button>
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