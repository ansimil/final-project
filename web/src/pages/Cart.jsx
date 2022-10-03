import React from 'react'
import { useShoppingCart } from 'use-shopping-cart';
import { formatProductPrice } from '../api/services';
import { toast } from 'react-hot-toast';

const Cart = () => {
    const { cartDetails, removeItem, formattedTotalPrice } = useShoppingCart()
    console.log(cartDetails)
    // for (const item in cartDetails) {
    //     return cartDetails[item].value 
    // }

    const handleRemoveItems = (product, amount) => {
        removeItem(product.id)
        toast.success('Items successfully removed from cart')
    }
    
    const formatPrice = (value, currency) => {
        const price = {
            price: value,
            currency
        }
        return formatProductPrice(price)
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

    </div>
    </div>
  )
}

export default Cart