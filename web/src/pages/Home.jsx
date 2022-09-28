import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'


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
      <a href="/modules">See all modules</a>
    </div>
  )
}

export default Home