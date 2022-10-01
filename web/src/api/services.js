import axios from "axios";
import { formatCurrencyString } from 'use-shopping-cart'



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

const createModule = (newModule) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/dashboard/add`, newModule)
    .then(res => console.log(res.data))
    .catch(errorHandler);
};

const editModule = (newModule, moduleId) => {
  return axios.put(`${process.env.REACT_APP_API_URL}/dashboard/${moduleId}/edit`, newModule)
  .then(res => res.data)
  .catch(errorHandler);
}

const deleteModule = (moduleId) => {
  return axios.delete(`${process.env.REACT_APP_API_URL}/dashboard/${moduleId}/delete`)
  .then(res => console.log(res.data))
  .catch(errorHandler); 
}

const getWishlistModules = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/wishlist`)
    .then(res => console.log(res.data))
    .catch(errorHandler);
};

const addToCart = (moduleId) => {
  return axios.put(`${process.env.REACT_APP_API_URL}/module/${moduleId}/addtocart`)
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
  addToCart
};
