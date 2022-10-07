import {useEffect, useState, useContext} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart';
import { updateCart, updateStock } from '../api/services';
import { AuthContext } from '../contexts/auth'
import { ModuleContext } from '../contexts/modules';
import Footer from '../components/Footer';
import loadingIcon from '../assets/giphy.gif'
import './PaymentSuccess.css'


const PaymentSuccess = () => {
    const {getModules} = useContext(ModuleContext)
    const { user } = useContext(AuthContext)
    const { cartDetails, clearCart } = useShoppingCart()
    const [sessionDetails, setSessionDetails] = useState()
    const {sessionId} = useParams()

    useEffect(() => {
    const updateForPurchase = async () => {
    await updateCart(cartDetails, user)
    await updateStock(cartDetails)
    clearCart()
    getModules()
    axios.get(`${process.env.REACT_APP_API_URL}/checkout-session/${sessionId}`)
    .then(res => {
        console.log(res.data)
        setSessionDetails(res.data)
    })
    .catch(err => console.log(err))
    }
    updateForPurchase()
    // eslint-disable-next-line
    }, [])
    

    if (!sessionDetails){
        return (
          
            <div className="loadingIcon">
                <img src={loadingIcon} alt="loading..." height="400px"/>
            </div>
        )
    }

  return (
    <div className="successContainer">

      <div className='successInner'>

        <div>
        <h1>Thank you for your order!</h1>
        <h3>Payment successful!</h3>
        </div>

        <div>
        <p>Total amount: {formatCurrencyString({
        value: sessionDetails.amount_total,
        currency: sessionDetails.currency,
        })}</p>
        </div>

        <div>
          <p>Paid to MDI GmbH</p>
        </div>
      
      </div>

      <Footer/>

    </div>
  )
}

export default PaymentSuccess