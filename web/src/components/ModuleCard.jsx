import { Link } from 'react-router-dom'
import { formatProductPrice } from '../api/services'
import AddToCartBtn from '../components/AddToCartBtn'
import { AuthContext } from '../contexts/auth'
import { useContext } from 'react'

const ModuleCard = ({_id, sku, name, category, shortDescription, price, currency, tagline, primaryImageUrl }) => {
  const module = {price, currency}
  const {user} = useContext(AuthContext)
  const newPrice = formatProductPrice(module)

  return (
    <div>
    
        <div>

            <div>
            <h2>{name}</h2>
            <img src={primaryImageUrl} alt="Error loading pic" height="250px" />
            </div>

            <div>
              <p>{tagline}</p>
              <p>{newPrice}</p>
            </div>

            <div>
              <p>{shortDescription}</p>
            </div>

            <div>
              <AddToCartBtn id={_id} user={user}/>
              <Link to={`/module/${_id}`}>Details</Link>
            </div>

        </div>

    </div>
  )
}

export default ModuleCard