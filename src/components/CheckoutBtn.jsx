import React from 'react'
import { useShoppingCart } from 'use-shopping-cart';
import axios from 'axios'
import { toast } from 'react-hot-toast'
import {loadStripe}  from '@stripe/stripe-js'

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC}`)

const CheckoutBtn = () => {
    
    const { cartDetails } = useShoppingCart()

    const handleCheckout = async () => {
        const stripe = await stripePromise;
        const session = await axios.post(`${process.env.REACT_APP_API_URL}/checkout-session`, cartDetails)
        .then(res => res.data)
        .catch(err => {
            toast.error("An error occurred during checkout")
            console.log("Error during checkout: ", err);
        })

        if (session) {
            const { id } = session
            console.log(session)
            stripe.redirectToCheckout({ sessionId: id });
        }

        return handleCheckout;
    }
    

  return (
    <div className='modalBtns'>

    <button onClick={handleCheckout}>Checkout</button>

    </div>
  )
}

export default CheckoutBtn