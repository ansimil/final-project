import { Link } from 'react-router-dom'
import SignInBtn from '../SignInBtn'
import HomeBtn from '../HomeBtn'
import LogoutBtn from '../LogoutBtn'
import ProfileBtn from '../ProfileBtn'
import DashboardBtn from '../DashboardBtn'
import CartBtn from '../CartBtn'
import { AuthContext } from '../../contexts/auth'
import { useContext } from 'react'
import { useShoppingCart } from 'use-shopping-cart';
import './Navbar.css'





const Navbar = () => {
 
  const { cartCount } = useShoppingCart()
  const { isLoggedIn, user } = useContext(AuthContext)
  // console.log(isLoggedIn)

  return (
    <div className="navbar">
    
        <HomeBtn/>

        <div className={isLoggedIn ? 'navMiddle' : 'navMiddleLoggedOut'}>
        <div className="navBarMiddleInnerLink">
          <Link className="navBtn modulesBtn" to="/modules">Modules</Link>
        </div>
        <div className="navBarMiddleInnerLink">
        <Link className="navBtn modulesBtn" to="/contact">Contact</Link>
        </div>
        <div className="navBarMiddleInnerLink">
        <Link className="navBtn modulesBtn" to="/about">About</Link>
        </div>
        {isLoggedIn && user.isAdmin && <DashboardBtn />}
        
        </div>

        <div className='cartSigninLogout'>
        {isLoggedIn && cartCount > 0 && <CartBtn/>}
        {isLoggedIn && <ProfileBtn />}
        {!isLoggedIn && <SignInBtn/>}
        {isLoggedIn && <LogoutBtn />}
        </div>

    </div>
  )
}

export default Navbar