import { useContext, useEffect, useState } from 'react'
import { useShoppingCart } from 'use-shopping-cart';
import { formatProductPrice } from '../../api/services';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import CheckoutBtn from '../../components/CheckoutBtn';
import { ModuleContext } from '../../contexts/modules';
import './Cart.css'




const Cart = () => {
    const [stockShortage, setStockShortage] = useState()
    const {modules} = useContext(ModuleContext)
    const { cartDetails, removeItem, formattedTotalPrice, cartCount, incrementItem, decrementItem } = useShoppingCart()
    const navigate = useNavigate()


    useEffect(() => {
        let arr = []
        Object.keys(cartDetails).map(key => {
            return modules.forEach(module => {
                if (cartDetails[key].id === module.id && cartDetails[key].quantity > module.inStock) {
                    let mod = cartDetails[key].name
                    let inSt = module.inStock
                    arr.push([mod, inSt])
                }
            })
        })
        setStockShortage(arr)
        // eslint-disable-next-line
    }, [])


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

    const handleIncrementCount = (id, module) => {
        if ((cartDetails[id]?.quantity < module.inStock)){
        incrementItem(id)}
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

    const handleDecrementCount = (id, module) => {
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
        <div className="cartContainer">
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
            <table className="productsTable">
            <thead>
            <tr>
            <th className="imgHeader"></th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            </tr>
            </thead>
            <tbody>
            {Object.keys(cartDetails).map((key, i)=> {
                return (
                    <tr key={i}>
                    <td className='cartImage'><img src={cartDetails[key].image} alt="err" height='50px'/></td>
                    <td>{cartDetails[key].name}</td>
                    <td>{cartDetails[key].quantity}</td>
                    <td>{formatPrice(cartDetails[key].value, cartDetails[key].currency)}</td>
                    <td className='addBtn'><button className='cartTableBtns' onClick={() => handleIncrementCount(cartDetails[key].id, cartDetails[key])}>+</button></td>
                    <td className='minusBtn'><button className='cartTableBtns' onClick={() => handleDecrementCount(cartDetails[key].id, cartDetails[key])}>-</button></td>
                    <td className='removeBtn'><button className='cartTableBtns' onClick={() => handleRemoveItems(cartDetails[key], cartDetails[key].quantity)}>x</button></td>
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
        <CheckoutBtn outOfStock={stockShortage}/> 
        </div>

    </div>
  )
}

export default Cart