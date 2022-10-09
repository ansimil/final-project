import React from 'react'
import { useShoppingCart } from 'use-shopping-cart';
import axios from 'axios'
import { toast } from 'react-hot-toast'
import {loadStripe}  from '@stripe/stripe-js'

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC}`)

const CheckoutBtn = ({ outOfStock }) => {
    
    const { cartDetails } = useShoppingCart()

    const handleCheckout = async () => {
        if (outOfStock.length > 0) {
          let str = ''
          outOfStock.forEach((module, i) => {
            str = str + ` ${i+1}. Module: ${module[0]}(${module[1]})`
          })
          toast.error(<span>{`The following item(s) don't have enough stock:`}<ul>
            {outOfStock.map((module, i) => {
             return ( <li>{`${module[0]}(${module[1]})`}</li> )
            })}
          </ul>Please adjust your cart accordingly</span>, {
            duration: 7000,
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

        else if (outOfStock.length === 0) {

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