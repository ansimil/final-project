import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from '../src/pages/Home'
import Navbar from './components/Navbar/Navbar';
import Signup from './pages/Signup/Signup';
import Profile from './pages/Profile/Profile';
import ModulesList from './pages/ModulesList';
import IsAnon from './components/IsAnon';
import IsUser from './components/IsUser';
import IsAdmin from './components/IsAdmin';
import Dashboard from './pages/Dashboard';
import AddModule from './pages/AddModule/AddModule';
import Wishlist from './pages/Wishlist'
import EditModule from './pages/EditModule';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import ResetPassword from './pages/ResetPassword/ResetPassword';
import ModuleDetailsPage from './pages/ModuleDetailsPage/ModuleDetailsPage';
import EasterEgg from './pages/EasterEgg';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import { loadStripe } from '@stripe/stripe-js'
import { CartProvider} from 'use-shopping-cart'
import { Toaster } from 'react-hot-toast'
import Cart from './pages/Cart/Cart';
import PaymentSuccess from './pages/PaymentSuccess/PaymentSuccess';

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC}`)



function App() {
  return (
    <div className="App">
    <CartProvider
      mode='checkout-session'
      stripe={stripePromise}
      currency='EUR'
     >
    <Toaster className="toast" position="top-center"/>
    <Navbar/>

    <Routes>
      <Route path='/dashboard/:moduleId/edit' element={<IsAdmin> <EditModule/> </IsAdmin>}></Route> 
      <Route path='/module/:moduleId' element={<ModuleDetailsPage/>}></Route> 
      <Route path='/success/:sessionId' element={<IsUser> <PaymentSuccess/> </IsUser>}></Route>
      <Route path='/resetpassword/:resetId' element={<IsAnon> <ResetPassword/> </IsAnon>}></Route>
      <Route path='/' element={<Home />}></Route>
      <Route path='/forgotpassword' element={<IsAnon> <ForgotPassword/> </IsAnon>}></Route>
      <Route path='/modules' element={<ModulesList/>}></Route> 
      <Route path='/signup' element={<IsAnon> <Signup/> </IsAnon>}></Route>
      <Route path='/profile' element={<IsUser> <Profile/> </IsUser>}></Route>
      <Route path='/wishlist' element={<IsUser> <Wishlist/> </IsUser>}></Route>
      <Route path='/cart' element={<IsUser> <Cart/> </IsUser>}></Route> 
      <Route path='/dashboard' element={<IsAdmin> <Dashboard/> </IsAdmin>}></Route>
      <Route path='/dashboard/add' element={<IsAdmin> <AddModule/> </IsAdmin>}></Route>
      <Route path='/funtimes' element={<EasterEgg/>}></Route>
      <Route path='/contact' element={<Contact/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      
    </Routes>

    
    </CartProvider>
    </div>
  );
}

export default App;
