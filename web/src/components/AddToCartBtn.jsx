import { Link } from 'react-router-dom'
import { addToCart } from '../api/services'


const AddToCartBtn = ({id, user}) => {

    const handleAddToCart = () => {
        addToCart(id, user._id)
        console.log(id, user._id)
    } 

  return (
    <div>

        <Link onClick={handleAddToCart}>Add to cart</Link>

    </div>
  )
}

export default AddToCartBtn