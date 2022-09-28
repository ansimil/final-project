import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from '../src/pages/Home'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import ModulesList from './pages/ModulesList';

function App() {
  return (
    <div className="App">

    <Navbar/>

    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
      <Route path='/modules' element={<ModulesList/>}></Route> 
    </Routes>

    <Footer/>
    </div>
  );
}

export default App;
