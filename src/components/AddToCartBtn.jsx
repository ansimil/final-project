import { Link } from 'react-router-dom'
import { useShoppingCart } from 'use-shopping-cart'
import toast from 'react-hot-toast'
import { AuthContext } from '../contexts/auth'
import { useContext } from 'react'

const AddToCartBtn = ({id, user, moduleForCart }) => {
    const { isLoggedIn } = useContext(AuthContext)
    const { addItem, cartDetails } = useShoppingCart()
    const {sku, name, price, currency, primaryImageUrl } = moduleForCart
    const module = {
        name,
        id: sku,
        price,
        currency,
        image: primaryImageUrl
    }
   
    const handleAddToCart = async () => {
        await addItem(module)
        toast.success(`${module.name} has been added to your cart`, {
          style: {
                  border: '2px solid black',
                  backgroundColor: 'white',
                  borderRadius: '0px',
                  padding: '5px 10px',
                  color: 'black',
                  textAlign: 'center',
                  lineHeight: '20px'
         },
         iconTheme: {
                  primary: '#000',
                  secondary: '#fff',
        },
        })
        console.log(moduleForCart)
        console.log({cartDetails})
    } 

  return (
    <div>

        {!isLoggedIn && <Link to="/signup">Login to add to cart</Link>}
        {isLoggedIn && <Link onClick={handleAddToCart}>Add to cart</Link>}

    </div>
  )
}

export default AddToCartBtn