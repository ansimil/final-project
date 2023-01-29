import {useEffect, useState, useContext} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart';
import { updateCart, updateStock } from '../../api/services';
import { AuthContext } from '../../contexts/auth'
import Footer from '../../components/Footer/Footer';
import loadingIcon from '../../assets/giphy.gif'
import './PaymentSuccess.css'


const PaymentSuccess = () => {
    const { user } = useContext(AuthContext)
    const { cartDetails, clearCart, cartCount } = useShoppingCart()
    const [sessionDetails, setSessionDetails] = useState(null)
    const [orderedModules, setOrderedModules] = useState({})
    const {sessionId} = useParams()

    useEffect(() => {
      setOrderedModules(JSON.parse(localStorage.getItem("cart")))
      updateCart(cartDetails, user)
      updateStock(cartDetails)      
      axios.get(`${process.env.REACT_APP_API_URL}/checkout-session/${sessionId}`)
      .then(res => {
        console.log(res.data)
        setSessionDetails(res.data)
        clearCart()
      })
      .catch(err => console.log(err))

    // eslint-disable-next-line
    }, [cartCount])
    
    if (!sessionDetails) {
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
        {Object.keys(orderedModules).map((item) => {
          return <p>{orderedModules[item].name}</p>
        })}
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