import { React, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { editModule } from '../../api/services'
import { ModuleContext } from '../../contexts/modules'
import { AuthContext } from '../../contexts/auth'
import PrimaryFileUploadBtn from '../PrimaryFileUploadBtn'
import SecondaryFileUploadBtn from '../SecondaryFileUploadBtn'
import './EditModuleForm.css'

const EditModuleForm = ({_id, sku, name, category, price, currency, description, shortDescription, tagline, inStock, primaryImageUrl, secondaryImageUrl}) => {
    const { user } = useContext(AuthContext) 
    const { getModules } = useContext(ModuleContext)
    const moduleId = _id
    const navigate = useNavigate()
    const initValues = {
        sku,
        name,
        category,
        price,
        currency,
        description,
        shortDescription,
        tagline,
        inStock,
        count: 1,
        primaryImageUrl,
        secondaryImageUrl,
    }

    const [allValues, setAllValues] = useState(initValues)

    useEffect(() => {
        setAllValues(initValues)
        // eslint-disable-next-line
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()
        const { sku, name, category, price, currency, description, shortDescription, tagline, inStock, primaryImageUrl, secondaryImageUrl} = allValues
        const newModule = { sku, name, category, price, currency, description, shortDescription, tagline, inStock, primaryImageUrl, secondaryImageUrl}
        
        await editModule(newModule, moduleId, user)
        getModules()
        navigate("/dashboard")

    }

    const changeHandler = e => {
        setAllValues( prevValues => {
        return { ...prevValues,[e.target.name]: e.target.value}
     })
     }

    const addFileUploadBtn = (e) => {
          e.preventDefault()
          if(allValues.count <= 3){
          setAllValues({...allValues, count: allValues.count+1})
        }
    }

    const removeFileUploadBtn = (e) => {
          e.preventDefault()
          setAllValues({...allValues, count: allValues.count-1})
    }

    const primaryImageUrlFunc = (imageUrl) => {
          setAllValues({...allValues, primaryImageUrl: imageUrl})
    }

    const secondaryImageUrlFunc = (imageUrl) => {
      const copy = [...allValues.secondaryImageUrl]
      copy.push(imageUrl)
      setAllValues({...allValues, secondaryImageUrl: copy})
    }

  return (
    <div className='addModuleFormContainer'>
        <div>
        <form className="addModuleForm" onSubmit={handleSubmit}>
            <label>Sku:</label>
            <input
              type="text"
              name="sku" 
              value={allValues.sku}
              onChange={changeHandler}
            />

            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={allValues.name}
              onChange={changeHandler}
            />

            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={allValues.category}
              onChange={changeHandler}
            />

            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={allValues.price}
              onChange={changeHandler}
            />

            <label>Currency:</label>
            <select
              type="text"
              name="currency"
              onChange={changeHandler}
            >
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
            <option value="AUD">AUD</option>
            </select>

            <label>Description:</label>
            <textarea
              type="text"
              name="description"
              value={allValues.description}
              onChange={changeHandler}
            />

            <label>Short description:</label>
            <input
              type="text"
              name="shortDescription"
              value={allValues.shortDescription}
              onChange={changeHandler}
            />

            <label>Tagline:</label>
            <input
              type="text"
              name="tagline"
              value={allValues.tagline}
              onChange={changeHandler}
            />

            <label>In Stock:</label>
            <input
              type="number"
              name="inStock"
              default
              value={allValues.inStock}
              onChange={changeHandler}
            />
            

            

            <button type="submit">Edit Module</button>
          </form>
          </div>

          <div>
              <h3>Edit {allValues.name}</h3>
              <h5>Primary Image</h5>
              
                <PrimaryFileUploadBtn primaryImageUrlFunc={primaryImageUrlFunc}/>

              <h5>Secondary Images</h5> 
              
                <SecondaryFileUploadBtn secondaryImageUrlFunc={secondaryImageUrlFunc}/>
                <SecondaryFileUploadBtn secondaryImageUrlFunc={secondaryImageUrlFunc}/>
                {allValues.count >= 2 && <SecondaryFileUploadBtn secondaryImageUrlFunc={secondaryImageUrlFunc}/>}
                {allValues.count >= 3 && <SecondaryFileUploadBtn secondaryImageUrlFunc={secondaryImageUrlFunc}/>}
                {allValues.count >= 4 && <SecondaryFileUploadBtn secondaryImageUrlFunc={secondaryImageUrlFunc}/>}
              <div>
                <button onClick={addFileUploadBtn}>+</button>
                {allValues.count >= 2 && <button onClick={removeFileUploadBtn}>-</button>}
              </div>
          </div>
    </div>
  )
}

export default EditModuleForm