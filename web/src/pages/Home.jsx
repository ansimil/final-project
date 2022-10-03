import {Link} from 'react-router-dom'

const apiURL = process.env.REACT_APP_API_URL

const Home = () => {

// const [user, setUser] = useState([])
    
// useEffect(() => {
// axios.get(apiURL)
// .then(response => {
//     setUser(response.data)
//     console.log(response.data)
// })
// .catch(err => console.log(err))
// }, [])

  return (
    <div className="homepage">
      <Link to="/modules">SEE ALL MODULES</Link>
    </div>
  )
}

export default Home