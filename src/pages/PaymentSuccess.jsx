import {useEffect, useState, useContext} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart';
import { updateCart } from '../api/services';
import { AuthContext } from '../contexts/auth'


const PaymentSuccess = () => {
    const { user } = useContext(AuthContext)
    const { cartDetails, clearCart } = useShoppingCart()
    const [sessionDetails, setSessionDetails] = useState()
    const {sessionId} = useParams()

    useEffect(() => {
    const updateForPurchase = async () => {
    await updateCart(cartDetails, user)
    clearCart()
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
            <p>Loading...</p>
        )
    }

  return (
    <div>
    <h1>Thank you for your order!</h1>
    <h3>Payment successful!</h3>

    <p>Total amount: {formatCurrencyString({
    value: sessionDetails.amount_total,
    currency: sessionDetails.currency,
    })}</p>

    <div>
    <p>Paid to MDI GmbH</p>
    </div>

    </div>
  )
}

export default PaymentSuccess