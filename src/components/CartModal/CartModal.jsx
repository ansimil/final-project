import Modal from 'react-modal'
import { Link } from 'react-router-dom'
import { useShoppingCart } from 'use-shopping-cart' 
import { formatProductPrice } from '../../api/services';
import { toast } from 'react-hot-toast'
import CheckoutBtn from '../CheckoutBtn';
import './CartModal.css'


Modal.setAppElement("#root")

const CartModal = ({isOpen, toggleModal, stockShortage}) => {
    const { cartDetails, formattedTotalPrice, removeItem } = useShoppingCart()

    const formatPrice = (value, currency) => {
        const price = {
            price: value,
            currency
        }
        return formatProductPrice(price)
    } 

    const handleRemoveItems = (product) => {
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

    <div className="modalTitle">
    <h3>Cart summary</h3>
    </div>

    <div className="modalBtns">
    <Link onClick={toggleModal} to='/cart'>Go to cart</Link>
    {stockShortage && stockShortage.length === 0 && <CheckoutBtn isOpen setOpen/>}
    <button onClick={toggleModal}>Still shopping?</button>
    </div>

    <div className='modalInnerDiv'>
        <table>
            <tbody>
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>

                {Object.keys(cartDetails).map((key, i)=> {
                    return (
                        <tr key={key}>
                        <td>{cartDetails[key].name}</td>
                        <td>{cartDetails[key].quantity}</td>
                        <td>{formatPrice(cartDetails[key].value, cartDetails[key].currency)}</td>
                        <td><button className='xBtn' onClick={() => handleRemoveItems(cartDetails[key])}>x</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table> 

        <table>
            <thead>
                <tr>
                    <th>Total Price</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{formattedTotalPrice}</td>
                </tr>
            </tbody>
        </table>

    </div>

    
    
    </Modal>


    </div>
  )
}

export default CartModal