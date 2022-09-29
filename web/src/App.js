import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from '../src/pages/Home'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import ModulesList from './pages/ModulesList';
import IsUser from './components/IsUser';
import IsAdmin from './components/IsAdmin';
import Dashboard from './pages/Dashboard';
import AddModule from './pages/AddModule';

function App() {
  return (
    <div className="App">

    <Navbar/>

    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/modules' element={<ModulesList/>}></Route> 
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/profile' element={<IsUser> <Profile/> </IsUser>}></Route>
      <Route path='/dashboard' element={<IsAdmin> <Dashboard/> </IsAdmin>}></Route>
      <Route path='/dashboard/add' element={<IsAdmin><AddModule/></IsAdmin>}></Route>

    </Routes>

    <Footer/>
    </div>
  );
}

export default App;
