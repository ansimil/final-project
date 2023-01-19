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
import hamburgerHoverIcon from '../../assets/hamburger-hover-icon.png'
import closeIcon from '../../assets/close-icon.png'
import closeHoverIcon from '../../assets/close-hover-icon.png'
import './Navbar.css'


const NavMiddle = ({isLoggedIn, classname, setHamburgerOpen}) => {
  let class1, class2
  if (classname === 'noHamburger') {
    class1 = 'navMiddle'
    class2 = 'navMiddleLoggedOut'
  }
  else if (classname === 'hamburger'){
    class1 = 'navMiddleHamburger'
    class2 = 'navMiddleHamburgerLoggedOut'
  }
  return (
    <div className={isLoggedIn ? class1 : class2}>
      <div className="navBarMiddleInnerLink">
        <Link onClick={()=>{setHamburgerOpen(false)}} className="navBtn modulesBtn" to="/modules">Modules</Link>
      </div>
      <div className="navBarMiddleInnerLink">
      <Link onClick={()=>{setHamburgerOpen(false)}} className="navBtn modulesBtn" to="/contact">Contact</Link>
      </div>
      <div className="navBarMiddleInnerLink">
      <Link onClick={()=>{setHamburgerOpen(false)}} className="navBtn modulesBtn" to="/about">About</Link>
      </div>
    </div>
  )
}

const HamburgerMenu = ({ hamburgerOpen, setHamburgerOpen, setProfileMenuOpen }) => {
    const [isMouseOver, setIsMouseOver] = useState(false)
    
    return (
      <div className='hamburgerIconContainer'>
        <div>
          {!hamburgerOpen && 
          <img 
          onMouseOver={()=> setIsMouseOver(true)}
          onMouseLeave={()=> setIsMouseOver(false)}
          onClick={()=>{
            setProfileMenuOpen(false)
            setHamburgerOpen(!hamburgerOpen)
            }} 
          className='hamburgerIcon' src={isMouseOver? hamburgerHoverIcon : hamburgerIcon} alt="hamburger" />}

          {hamburgerOpen && 
          <img 
          onMouseOver={()=> setIsMouseOver(true)}
          onMouseLeave={()=> setIsMouseOver(false)}
          onClick={()=>{
            setProfileMenuOpen(false)
            setHamburgerOpen(!hamburgerOpen)
            }} 
          className='closeIcon' src={isMouseOver? closeHoverIcon : closeIcon} alt="hamburger" />}

        </div>
      </div>
    )
}

const ProfileMenu = ({ isLoggedIn, user, setProfileMenuOpen }) => {
  return (
    <div className="profileMenuContainer">
      <div className="navBarMiddleInnerLink" onClick={()=>{setProfileMenuOpen(false)}}>
        <Link className="navBtn" to="/profile" >Profile</Link>
      </div>
      {isLoggedIn && user.isAdmin && <DashboardBtn setProfileMenuOpen={setProfileMenuOpen} />}
      <LogoutBtn className="logoutBtnProfileMenu" setProfileMenuOpen={setProfileMenuOpen}/>
    </div>
  )
}

const Navbar = () => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false)
  const { cartCount } = useShoppingCart()
  const { isLoggedIn, user } = useContext(AuthContext)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)

  return (
    <div className="navbar">
    
        <HomeBtn/>
        <NavMiddle isLoggedIn={isLoggedIn} user={user} classname={'noHamburger'}/>
        <HamburgerMenu setHamburgerOpen={setHamburgerOpen} hamburgerOpen={hamburgerOpen} setProfileMenuOpen={setProfileMenuOpen}/>

        <div className='cartSigninLogout'>
          {isLoggedIn && cartCount > 0 && <CartBtn/>}
          {isLoggedIn && <ProfileBtn setProfileMenuOpen={setProfileMenuOpen} profileMenuOpen={profileMenuOpen} setHamburgerOpen={setHamburgerOpen} />}
          {!isLoggedIn && <SignInBtn/>}
        </div>

        {isLoggedIn && profileMenuOpen && <ProfileMenu isLoggedIn={isLoggedIn} user={user} setProfileMenuOpen={setProfileMenuOpen}/>}
        {hamburgerOpen && <NavMiddle setHamburgerOpen={setHamburgerOpen} isLoggedIn={isLoggedIn} user={user} classname={"hamburger"}/>}
    </div>
  )
}

export default Navbar