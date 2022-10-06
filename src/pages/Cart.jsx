import { useShoppingCart } from 'use-shopping-cart';
import { formatProductPrice } from '../api/services';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import CheckoutBtn from '../components/CheckoutBtn';
import Footer from '../components/Footer';
import './Cart.css'

const Cart = () => {

    const { cartDetails, removeItem, formattedTotalPrice, cartCount, incrementItem, decrementItem } = useShoppingCart()
    // console.log(cartDetails)
    const navigate = useNavigate()
   

    const handleRemoveItems = (product, amount) => {
        removeItem(product.id)
        toast.success('Items successfully removed from cart')
    }

    const handleIncrementCount = (id) => {
        incrementItem(id)
    }

    const handleDecrementCount = (id) => {
        if (cartDetails[id].quantity > 1){
            decrementItem(id)
            }
            else {
                removeItem(id)
            }
    }
    
    const formatPrice = (value, currency) => {
        const price = {
            price: value,
            currency
        }
        return formatProductPrice(price)
    }

  if (cartCount === 0) {
    return (
        <div>
        <h3>No items in your cart</h3>
        <button onClick={() => navigate(-1)}>Back</button>
        </div>
    )
  }  

  return (
    <div className="cartContainer">

        <div>
            <h3>Cart details</h3>
        </div>

        <div className="cartTable">
            <table>
            <thead>
            <tr>
            <th></th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            </tr>
            </thead>
            <tbody>
            {Object.keys(cartDetails).map((key, i)=> {
                console.log(cartDetails[key])
                return (
                    <tr key={i}>
                    <td className='cartImage'><img src={cartDetails[key].image} alt="err" height='50px'/></td>
                    <td>{cartDetails[key].name}</td>
                    <td>{cartDetails[key].quantity}</td>
                    <td>{formatPrice(cartDetails[key].value, cartDetails[key].currency)}</td>
                    <td><button className='cartTableBtns' onClick={() => handleIncrementCount(cartDetails[key].id)}>+</button></td>
                    <td><button className='cartTableBtns' onClick={() => handleDecrementCount(cartDetails[key].id)}>-</button></td>
                    <td><button className='cartTableBtns' onClick={() => handleRemoveItems(cartDetails[key], cartDetails[key].quantity)}>x</button></td>
                    </tr>
                )
            })}
            </tbody>
            
            </table> 

            <table>
            <tbody>
            <tr>
                <th>Total Price</th>
            </tr>

            <tr>
                <td>{formattedTotalPrice}</td>
            </tr>
            </tbody>
            </table>
        </div>

        <div className='cartCheckoutBtn'>
        <CheckoutBtn/> 
        </div>

        <Footer/>
    </div>
  )
}

export default Cart