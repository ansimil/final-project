import { Link } from 'react-router-dom'
import SignInBtn from '../SignInBtn'
import HomeBtn from '../HomeBtn'
import LogoutBtn from '../LogoutBtn'
import ProfileBtn from '../ProfileBtn'
import DashboardBtn from '../DashboardBtn'
import CartBtn from '../CartBtn'
import { AuthContext } from '../../contexts/auth'
import { useContext, useState } from 'react'
import { useShoppingCart } from 'use-shopping-cart';
import hamburgerIcon from '../../assets/hamburger-icon.png'
import closeIcon from '../../assets/close-icon.png'
import './Navbar.css'


const NavMiddle = ({isLoggedIn, user, classname}) => {
  let class1, class2
  if (classname === 'noHamburger') {
    class1 = 'navMiddle'
    class2 = 'navMiddleLoggedOut'
  }
  else if (classname === 'hamburger'){
    class1 = 'navMiddleHamburger'
    class2 = 'navMiddleHamburgerLoggedOut'
  }
  console.log(class1, class2)
  return (
    <div className={isLoggedIn ? class1 : class2}>
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
  )
}


const HamburgerMenu = ({ hamburgerOpen, setHamburgerOpen }) => {

    return (
      <div className='hamburgerIconContainer'>
      <div>
      {!hamburgerOpen && <img onClick={()=>{setHamburgerOpen(!hamburgerOpen)}} className='hamburgerIcon' src={hamburgerIcon} alt="hamburger" />}
      {hamburgerOpen && <img onClick={()=>{setHamburgerOpen(!hamburgerOpen)}} className='closeIcon' src={closeIcon} alt="hamburger" />}
      </div>
      </div>
    )
}


const Navbar = () => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false)
  const { cartCount } = useShoppingCart()
  const { isLoggedIn, user } = useContext(AuthContext)

  return (
    <div className="navbar">
    
        <HomeBtn/>
        <NavMiddle isLoggedIn={isLoggedIn} user={user} classname={'noHamburger'}/>
        <HamburgerMenu setHamburgerOpen={setHamburgerOpen} hamburgerOpen={hamburgerOpen}/>

        <div className='cartSigninLogout'>
          {isLoggedIn && cartCount > 0 && <CartBtn/>}
          {isLoggedIn && <ProfileBtn />}
          {!isLoggedIn && <SignInBtn/>}
          {isLoggedIn && <LogoutBtn />}
        </div>
        {hamburgerOpen && <NavMiddle isLoggedIn={isLoggedIn} user={user} classname={"hamburger"}/>}
    </div>
  )
}

export default Navbar