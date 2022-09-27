import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'


const apiURL = process.env.REACT_APP_API_URL

const Home = () => {

const [user, setUser] = useState([])
    
useEffect(() => {
axios.get(apiURL)
.then(response => {
    setUser(response.data)
    console.log(response.data)
})
.catch(err => console.log(err))
}, [])

  return (
    <div>
    {user.length !== 0 ? <h2>{user[0].username}</h2> : <h3>Hello</h3>}
    </div>
  )
}

export default Home