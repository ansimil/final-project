import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ModuleContext } from '../../contexts/modules'
import { AuthContext } from '../../contexts/auth'
import axios from 'axios'
import  './DashboardModuleCard.css'


const DashboardModuleCard = () => {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext) 
    const { modules, getModules } = useContext(ModuleContext)
    const [open, setOpen] = useState(false)
    const [openId, setOpenId] = useState('')
  

    const handleDelete = async (moduleId) => {
          
          const storedToken = localStorage.getItem('authToken')

          await axios.delete(`${process.env.REACT_APP_API_URL}/dashboard/${moduleId}/delete`, {data:{ user }, headers: { Authorization: `Bearer ${storedToken}`}})
                .then(res => {
                })
                .catch(err => console.log(err)); 
          getModules()
    }

    const handleOpening = (id) => {
      const update = openId === '' ? id : ''
      setOpenId(update)
      setOpen(!open)     
    }


    if (modules.length > 0){
      return (
      <div className="dashboardModuleContainer">
    
        {modules.map((module, i) => {
      const {_id, sku, name, category, price, currency, description, shortDescription, tagline, inStock, primaryImageUrl, secondaryImageUrl} = module
      return (
          <div className='dashboardCard' key={_id}>
            <details onClick={() => handleOpening(_id)} open={open && _id === openId}>
                <summary className='summary'>{`${i+1}. ${name}`}</summary>
              
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
                <button onClick={() => handleOpening(_id)}>{openId !== _id ? 'View' : 'Close'}</button>
                <button onClick={() => navigate(`/dashboard/${_id}/edit`)}>Edit</button>
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