import { ModuleContext } from "../contexts/modules"
import { AuthContext } from "../contexts/auth"
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { formatProductPrice } from '../api/services'
import AddToCartBtn from "../components/AddToCartBtn"
import loadingIcon from '../assets/giphy.gif'
import Footer from "../components/Footer"
import './ModuleDetailsPage.css'


const ModuleDetailsPage = () => {
    const { user } = useContext(AuthContext)
    const { module, getModule } = useContext(ModuleContext)
    const { moduleId } = useParams()
    const [mainImage, setMainImage] = useState(null)
    const [bool, setBool] = useState(false)

    useEffect(() => {
            const fetchData = async () => {
            await getModule(moduleId)  
        }
        fetchData()
        // eslint-disable-next-line      
    },[])

    const updateImage = (image) => {
        setMainImage(image)
        setBool(true)
    }

    if (Object.keys(module).length === 0) {
        return (<div className="loadingIcon">
                <img src={loadingIcon} alt="loading..." height="400px"/>
                </div>)
    }

  return (
    <div className="moduleDetailsContainer">

        <div className="moduleDetailsInnerDiv">

            <div className="imagesDiv">
                <img className="mainImage" src={bool ? mainImage : module.primaryImageUrl} alt="error loading pic" height="400px" />
                <div className="secondaryImageContainer">
                <img onClick={() => {setMainImage(module.primaryImageUrl)}} src={module.primaryImageUrl} alt="error loading pic" height="50px"/>
                {module?.secondaryImageUrl?.length > 0 && module?.secondaryImageUrl.map((image, i) => {
                    return (
                    <img onClick={() => {updateImage(image)}} key={i+1} src={image} alt="error loading pic" height="50px" />
                    )
                })}
                </div>
            </div>

            <div className="detailsContainer">
            <div>
            <h2>{module.name}</h2>
            </div>
            <div>
                <p>{module.tagline}</p>
                <p>{Object.keys(module).length !== 0 && formatProductPrice({price: module.price, currency: module.currency})}</p>
            </div>

            <div className="moduleDescription">
                <p>{module.description}</p>
            </div>

            <div>
                <AddToCartBtn id={module._id} user={user} moduleForCart={module}/>
            </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default ModuleDetailsPage