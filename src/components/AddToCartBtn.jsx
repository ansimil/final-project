import { Link } from 'react-router-dom'
import { useShoppingCart } from 'use-shopping-cart'
import toast from 'react-hot-toast'
import { AuthContext } from '../contexts/auth'
import { useContext } from 'react'

const AddToCartBtn = ({id, user, moduleForCart }) => {
    const { isLoggedIn } = useContext(AuthContext)
    const { addItem, cartDetails } = useShoppingCart()
    const {sku, name, price, currency, primaryImageUrl, inStock } = moduleForCart
    const module = {
        name,
        id: sku,
        price,
        currency,
        image: primaryImageUrl,
        inStock
    }
   
    const handleAddToCart = async () => {
        
          if (!cartDetails[sku] || (cartDetails[sku]?.quantity < module.inStock)){
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
      }
    
    else {
      toast.error('Not enough items in stock', {
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
    }
    } 

  return (
    <div>
        {module.inStock <= 0 && <Link className='outOfStock' to="/">Out of stock</Link>}
        {!isLoggedIn && module.inStock > 0 && <Link to="/signup">Login to add to cart</Link>}
        {isLoggedIn && module.inStock > 0 && <Link onClick={handleAddToCart}>Add to cart</Link>}

    </div>
  )
}

export default AddToCartBtn