import { ModuleContext } from "../../contexts/modules"
import { AuthContext } from "../../contexts/auth"
import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { formatProductPrice } from '../../api/services'
import AddToCartBtn from "../../components/AddToCartBtn"
import loadingIcon from '../../assets/giphy.gif'
// import Footer from "../../components/Footer/Footer"
import './ModuleDetailsPage.css'


const ModuleDetailsPage = () => {
    const { user } = useContext(AuthContext)
    const { modules } = useContext(ModuleContext)
    const { moduleId } = useParams()
    const [mainImage, setMainImage] = useState(null)
    const [bool, setBool] = useState(false)

    const modulesFiltered = modules.filter((module) => {
        return (module._id === moduleId)
    })

    const updateImage = (image) => {
        setMainImage(image)
        setBool(true)
    }
    
    if (modulesFiltered.length === 0) {
        return (<div className="loadingIcon">
                <img src={loadingIcon} alt="loading..." height="400px"/>
                </div>)
    }

  return (
    <div className="moduleDetailsContainer">

        <div className="moduleDetailsInnerDiv">

            <div className="imagesDiv">
                <img className="mainImage" src={bool ? mainImage : modulesFiltered[0].primaryImageUrl} alt="error loading pic" />
                <div className="secondaryImageContainer">
                <img onClick={() => {setMainImage(modulesFiltered[0].primaryImageUrl)}} src={modulesFiltered[0].primaryImageUrl} alt="error loading pic" height="50px"/>
                {modulesFiltered[0]?.secondaryImageUrl?.length > 0 && modulesFiltered[0]?.secondaryImageUrl.map((image, i) => {
                    return (
                    <img onClick={() => {updateImage(image)}} key={i+1} src={image} alt="error loading pic" height="50px" />
                    )
                })}
                </div>
            </div>

            <div className="detailsContainer">
            <div>
            <h2>{modulesFiltered[0].name}</h2>
            </div>
            <div>
                <p>{modulesFiltered[0].tagline}</p>
                <p>{modulesFiltered.length !== 0 && formatProductPrice({price: modulesFiltered[0].price, currency: modulesFiltered[0].currency})}</p>
            </div>

            <div className="moduleDescription">
                <p>{modulesFiltered[0].description}</p>
            </div>
                <AddToCartBtn id={modulesFiltered[0]._id} user={user} moduleForCart={modulesFiltered[0]}/>
            </div>
        </div>
    </div>
  )
}

export default ModuleDetailsPage