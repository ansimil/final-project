import React from 'react'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'
import { useShoppingCart } from 'use-shopping-cart' 
import { formatProductPrice } from '../api/services';
import { toast } from 'react-hot-toast'
import CheckoutBtn from './CheckoutBtn';
import './CartModal.css'

Modal.setAppElement("#root")

const CartModal = ({isOpen, toggleModal}) => {
    const { cartDetails, formattedTotalPrice, removeItem } = useShoppingCart()

    const formatPrice = (value, currency) => {
        const price = {
            price: value,
            currency
        }
        return formatProductPrice(price)
    } 

    const handleRemoveItems = (product, amount) => {
        removeItem(product.id)
        toast.success('Items successfully removed from cart', {
            style: {
                    border: '2px solid black',
                    backgroundColor: 'white',
                    borderRadius: '0px',
                    padding: '5px 10px',
                    color: 'black',
           },
           iconTheme: {
            primary: '#000',
            secondary: '#fff',
          },    
        })
    }

  return (

    <div className="modalContainer">
    <Modal 
        className="modal" 
        isOpen={isOpen} 
        onRequestClose={toggleModal}
    >

    <div>
    <h3>Cart summary</h3>
    </div>

    <div className='modalInnerDiv'>

    

    <table>
    <tr>
    <th>Item</th>
    <th>Quantity</th>
    <th>Price</th>
    </tr>

    {Object.keys(cartDetails).map((key, i)=> {
        console.log(cartDetails)
        console.log(localStorage.getItem('persist:root'))
        return (
            <tr>
            <td>{cartDetails[key].name}</td>
            <td>{cartDetails[key].quantity}</td>
            <td>{formatPrice(cartDetails[key].value, cartDetails[key].currency)}</td>
            <td><button className='xBtn' onClick={() => handleRemoveItems(cartDetails[key], cartDetails[key].quantity)}>x</button></td>
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

    </div>
    <Link onClick={toggleModal} to='/cart'>Go to cart</Link>
    <CheckoutBtn/>
    <button onClick={toggleModal}>Still shopping?</button>

    </Modal>


    </div>
  )
}

export default CartModal