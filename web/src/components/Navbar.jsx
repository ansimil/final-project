import { Link } from 'react-router-dom'
import SignInBtn from '../components/SignInBtn'
import HomeBtn from './HomeBtn'
import LogoutBtn from './LogoutBtn'
import ProfileBtn from './ProfileBtn'
import DashboardBtn from './DashboardBtn'
import CartBtn from './CartBtn'

import { AuthContext } from '../contexts/auth'
import { useContext } from 'react'
import { useShoppingCart } from 'use-shopping-cart';




const Navbar = () => {
  const { cartCount } = useShoppingCart()
  const { isLoggedIn, user } = useContext(AuthContext)
  console.log(isLoggedIn)
  return (
    <div className="navbar">
    
        <HomeBtn/>
        <Link to="/modules">Modules</Link>
        {!isLoggedIn && <SignInBtn/>}
        {isLoggedIn && user.isAdmin && <DashboardBtn/>}
        {isLoggedIn && <ProfileBtn/>}
        {isLoggedIn && cartCount > 0 && <CartBtn/>}
        {isLoggedIn && <LogoutBtn/>}
    
    </div>
  )
}

export default Navbar