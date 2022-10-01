import { Link } from 'react-router-dom'
import { formatProductPrice } from '../api/services'

const ModuleCard = ({_id, sku, name, category, shortDescription, price, currency, tagline, primaryImageUrl }) => {
  const module = {price, currency}

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
              <button>Cart</button>
              <Link to={`/module/${_id}`}>Details</Link>
            </div>

        </div>

    </div>
  )
}

export default ModuleCard