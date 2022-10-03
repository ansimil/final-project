import { useEffect, useState } from 'react'
import { useShoppingCart } from 'use-shopping-cart';
import { formatProductPrice } from '../api/services';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import CheckoutBtn from '../components/CheckoutBtn';

const Cart = () => {

    const { cartDetails, removeItem, formattedTotalPrice, cartCount, incrementItem, decrementItem } = useShoppingCart()
    console.log(cartDetails)
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
    <div>

    <h3>Cart details</h3>

    <table>
    <tr>
    <th>Item</th>
    <th>Quantity</th>
    <th>Price</th>
    </tr>

    {Object.keys(cartDetails).map((key, i)=> {
        return (
            <tr>
            <td>{cartDetails[key].name}</td>
            <td>{cartDetails[key].quantity}</td>
            <td>{formatPrice(cartDetails[key].value, cartDetails[key].currency)}</td>
            <td><button onClick={() => handleIncrementCount(cartDetails[key].id)}>+</button></td>
            <td><button onClick={() => handleDecrementCount(cartDetails[key].id)}>-</button></td>
            <td><button onClick={() => handleRemoveItems(cartDetails[key], cartDetails[key].quantity)}>x</button></td>
            </tr>
        )
    })}
        
    
    </table> 

    <table>
    <tr>
        <th>Total Price</th>
    </tr>

    <tr>
        <td>{formattedTotalPrice}</td>
    </tr>
    </table>

    <div>
    <CheckoutBtn/> 
    </div>
    </div>
  )
}

export default Cart