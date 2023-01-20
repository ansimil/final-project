import {Link} from 'react-router-dom'

const HomeBtn = ({ setHamburgerOpen }) => {
  return (
    <div className="homeBtn">

    <Link onClick={()=>{setHamburgerOpen(false)}} to="/">MDI</Link>

    </div>
  )
}

export default HomeBtn