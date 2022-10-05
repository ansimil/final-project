import { Link } from 'react-router-dom'
import { formatProductPrice } from '../api/services'
import AddToCartBtn from '../components/AddToCartBtn'
import { AuthContext } from '../contexts/auth'
import { useContext } from 'react'
import './ModuleCard.css'


const ModuleCard = ({_id, sku, name, category, shortDescription, price, currency, tagline, primaryImageUrl }) => {
  const module = {price, currency}
  const moduleForCart = {sku, name, price, currency}
  const {user} = useContext(AuthContext)
  const newPrice = formatProductPrice(module)
  // console.log(moduleForCart)
  return (
    <div className="moduleCardContainer">
    
        <div className="moduleCardInner">

            <h2>{name}</h2>
            <div>
            <img src={primaryImageUrl} alt="Error loading pic" height="200px" />
            </div>

            <div className='tagline'>
              {tagline &&<p>{tagline}</p>}
              <p>{newPrice}</p>
            </div>

            <div className='addAndDetailsBtns'>

            <div>
              <AddToCartBtn id={_id} user={user} moduleForCart={moduleForCart}/>
            </div>
            <div>
              <Link to={`/module/${_id}`}>Details</Link>
            </div>

            </div>
        </div>

    </div>
  )
}

export default ModuleCard