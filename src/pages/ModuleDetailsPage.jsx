import { ModuleContext } from "../contexts/modules"
import { AuthContext } from "../contexts/auth"
import { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { formatProductPrice, addToCart } from '../api/services'
import AddToCartBtn from "../components/AddToCartBtn"

const ModuleDetailsPage = () => {
    const [newPrice, setNewPrice] = useState('')
    const { user } = useContext(AuthContext)
    const { module, getModule } = useContext(ModuleContext)
    const { moduleId } = useParams()
    

    useEffect(() => {
            const fetchData = async () => {
            await getModule(moduleId)
            const moduleForPrice = {price: module.price, currency: module.currency}
            console.log(moduleForPrice)
            const price = (formatProductPrice(moduleForPrice))
            setNewPrice(price)
        }
        fetchData()      
    },[])


  return (
    <div>
    <h2>{module.name}</h2>
    <img src={module.primaryImageUrl} alt="error loading pic" height="400px" />
    

        <div>
            <p>{module.tagline}</p>
            <p>{newPrice}</p>
        </div>

        <div>
            <p>{module.description}</p>
        </div>

        <div>
            <AddToCartBtn id={module._id} user={user} moduleForCart={module}/>
        </div>


    </div>
  )
}

export default ModuleDetailsPage