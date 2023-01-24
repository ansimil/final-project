import { useContext, useEffect, useState } from 'react'
import { ModuleContext } from '../contexts/modules'
import { useShoppingCart } from 'use-shopping-cart'
import { useMediaQuery } from 'react-responsive'
import CartModal from './CartModal/CartModal'
import logo from "../assets/cart-icon-inverted.png"
import { useLocation, useNavigate } from 'react-router-dom'

const CartBtn = () => {
    const [stockShortage, setStockShortage] = useState()
    const location = useLocation()
    const { cartCount, cartDetails } = useShoppingCart()
    const [isOpen, setOpen] = useState(false)
    const {modules} = useContext(ModuleContext)
    const noModal = useMediaQuery({query: "(max-width: 658px)"})
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


    const toggleModal = () => {
      console.log(noModal)
      if (noModal) {
        navigate("/cart")
      }

      if(location.pathname !== '/cart'){
      setOpen(!isOpen)
    }
    }

    return (
    <>
    <button className="cartBtn" onClick={toggleModal}>
    <span>
          <img className="cartLogo" src={logo} alt="error" height="20px" width="20px"/>
          <span>  </span>
          <span>{cartCount}</span>
    </span>
    </button>
    {location.pathname !== '/cart' && <CartModal isOpen={isOpen} toggleModal={toggleModal} setOpen stockShortage={stockShortage} />}
    </>
  )
}

export default CartBtn