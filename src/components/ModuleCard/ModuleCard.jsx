import { Link, useNavigate } from 'react-router-dom'
import { formatProductPrice } from '../../api/services'
import AddToCartBtn from '../../components/AddToCartBtn'
import { AuthContext } from '../../contexts/auth'

import { useContext } from 'react'
import './ModuleCard.css'
import { ModuleContext } from '../../contexts/modules'


const ModuleCard = ({_id, sku, name, category, shortDescription, price, currency, inStock, tagline, primaryImageUrl }) => {
  const { setModule } = useContext(ModuleContext)
  const module = {price, currency}
  const moduleForCart = {sku, name, price, currency, primaryImageUrl, inStock}
  const {user} = useContext(AuthContext)
  const newPrice = formatProductPrice(module)
  const navigate = useNavigate()

  const handleRedirect = () => {
      setModule({})
      navigate(`/module/${_id}`)
  }
  // console.log(moduleForCart)
  return (
    <div className="moduleCardContainer">
    
        <div className="moduleCardInner">

            <h2>{name}</h2>
            <div>
            <img onClick={handleRedirect} src={primaryImageUrl} alt="Error loading pic"/>
            </div>

            <div className='tagline'>
              {tagline &&<p>{tagline}</p>}
              <p>{newPrice}</p>
            </div>

          </div>

          <div className='addAndDetailsBtns'>

              {/* <div>
                <AddToCartBtn id={_id} user={user} moduleForCart={moduleForCart}/>
              </div> */}
              <div>
                <Link to={`/module/${_id}`}>Details</Link>
              </div>

          </div>
        

    </div>
  )
}

export default ModuleCard