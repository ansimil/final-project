import {Link} from 'react-router-dom'
import Footer from '../components/Footer/Footer'

const Home = () => {

  return (
    <div className="homepage">
      <Link to="/modules">SEE ALL MODULES</Link>
      <Footer/>
    </div>
  )
}

export default Home