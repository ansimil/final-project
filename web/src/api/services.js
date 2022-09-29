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

const getModules = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/modules`)
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

export {
  getModules,
  uploadImage,
  createModule,
  formatProductPrice
};
