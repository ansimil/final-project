import { Link } from 'react-router-dom'
import { addToCart } from '../api/services'
import { useShoppingCart } from 'use-shopping-cart'
import toast from 'react-hot-toast'

const AddToCartBtn = ({id, user, moduleForCart }) => {
    const { addItem, cartDetails } = useShoppingCart()
    const {sku, name, price, currency } = moduleForCart
    const module = {
        name,
        id: sku,
        price,
        currency
    }

    const handleAddToCart = async () => {
        await addItem(module)
        toast.success(`${module.name} has been added to your cart`)
        console.log({cartDetails})
    } 

  return (
    <div>

        <Link onClick={handleAddToCart}>Add to cart</Link>

    </div>
  )
}

export default AddToCartBtn