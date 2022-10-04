import axios from "axios";
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart'

const formatProductPrice = (product => {
  return formatCurrencyString({
    value: product.price,
    currency: product.currency,
    language: navigator.language
  })
})

const errorHandler = (err) => {
  throw err;
};

const getUsers = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}`)
  .then((res) => res.data)
  .catch(errorHandler);
}


const getModules = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/modules`)
    .then((res) => res.data)
    .catch(errorHandler);
};

const getModule = (moduleId) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/module/${moduleId}`)
    .then((res) => res.data)
    .catch(errorHandler);
};

const uploadImage = (file) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/upload`, file)
    .then(res => res.data)
    .catch(errorHandler);
};

const createModule = (newModule, user) => {
  const storedToken = localStorage.getItem('authToken')
  console.log(storedToken)
  return axios.post(`${process.env.REACT_APP_API_URL}/dashboard/add`, {newModule, user}, { 
    headers: { authorization: `Bearer ${storedToken}`},
  })
    .then(res => console.log(res.data))
    .catch(errorHandler);
};

const editModule = (newModule, moduleId, user) => {
  const storedToken = localStorage.getItem('authToken')
  return axios.put(`${process.env.REACT_APP_API_URL}/dashboard/${moduleId}/edit`, {newModule, user}, { headers: { Authorization: `Bearer ${storedToken}`}} )
  .then(res => res.data)
  .catch(errorHandler);
}

const deleteModule = (moduleId, user) => {
  const storedToken = localStorage.getItem('authToken')
  return axios.delete(`${process.env.REACT_APP_API_URL}/dashboard/${moduleId}/delete`, user, { headers: { Authorization: `Bearer ${storedToken}`}})
  .then(res => console.log(res.data))
  .catch(errorHandler); 
}

const getWishlistModules = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/wishlist`)
    .then(res => console.log(res.data))
    .catch(errorHandler);
};

const addToCart = (moduleId, userId) => {
  const storedToken = localStorage.getItem('authToken')
  return axios.put(`${process.env.REACT_APP_API_URL}/module/${moduleId}/addtocart`, {userId}, { headers: { Authorization: `Bearer ${storedToken}`}} )
  .then(res => res.status(200).json(res.data))
  .catch(err => console.log(err))
}

const updateCart = (cartDetails, user) => {
  const storedToken = localStorage.getItem('authToken')
  return axios.put(`${process.env.REACT_APP_API_URL}/update-cart`, {cartDetails, user}, { headers: { Authorization: `Bearer ${storedToken}`}}) 
  .then(res => res.status(200).json(res.data))
  .catch(err => console.log(err))
}

export {
  getModules,
  uploadImage,
  createModule,
  formatProductPrice,
  getUsers,
  getWishlistModules,
  editModule,
  getModule,
  deleteModule,
  addToCart,
  updateCart
};
