import { React, useState } from 'react'
import { createModule } from '../api/services'
import PrimaryFileUploadBtn from './PrimaryFileUploadBtn'
import SecondaryFileUploadBtn from './SecondaryFileUploadBtn'

const AddModuleForm = () => {
    const [sku, setSku] = useState("")
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState()
    const [currency, setCurrency] = useState("EUR")
    const [description, setDescription] = useState("")
    const [shortDescription, setShortDescription] = useState("")
    const [tagline, setTagline] = useState("")
    const [inStock, setInStock] = useState()
    const [count, setCount] = useState(1)
    const [primaryImageUrl, setPrimaryImageUrl] = useState('')
    const [secondaryImageUrl, setSecondaryImageUrl] = useState([])
    const secondaryImages = []

    const handleSubmit = (e) => {
        e.preventDefault()

        const newModule = {sku, name, category, price, currency, description, shortDescription, tagline, inStock, primaryImageUrl, secondaryImageUrl}
        createModule(newModule)
        setSku('')
        setName('')
        setCategory('')
        setPrice('')
        setCurrency('EUR')
        setDescription('')
        setShortDescription('')
        setTagline('')
        setInStock('')
        setPrimaryImageUrl('')
        setSecondaryImageUrl('')

    }

    const addFileUploadBtn = (e) => {
          e.preventDefault()
          if(count <= 3){
          setCount(count+1)
        }
    }

    const removeFileUploadBtn = (e) => {
          e.preventDefault()
          setCount(count-1)
    }

    const primaryImageUrlFunc = (imageUrl) => {
          setPrimaryImageUrl(imageUrl)
    }

    const secondaryImageUrlFunc = (imageUrl) => {
      const copy = [...secondaryImageUrl]
      copy.push(imageUrl)
      setSecondaryImageUrl(copy)
    }

  return (
    <div className='addModuleFormContainer'>
        <div>
        <form className="addModuleForm" onSubmit={handleSubmit}>
            <label>Sku:</label>
            <input
              type="text"
              name="sku"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
            />

            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />

            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <label>Currency:</label>
            <select
              type="text"
              name="currency"
              onChange={(e) => setCurrency(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label>Short description:</label>
            <input
              type="text"
              name="shortDescription"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
            />

            <label>Tagline:</label>
            <input
              type="text"
              name="tagline"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
            />

            <label>In Stock:</label>
            <input
              type="number"
              name="inStock"
              value={inStock}
              onChange={(e) => setInStock(e.target.value)}
            />
            

            

            <button type="submit">Add Module</button>
          </form>
          </div>

          <div>
              <h5>Primary Image</h5>
              
                <PrimaryFileUploadBtn primaryImageUrlFunc={primaryImageUrlFunc}/>

              <h5>Secondary Images</h5> 
              
                <SecondaryFileUploadBtn secondaryImageUrlFunc={secondaryImageUrlFunc}/>
                <SecondaryFileUploadBtn secondaryImageUrlFunc={secondaryImageUrlFunc}/>
                {count >= 2 && <SecondaryFileUploadBtn secondaryImageUrlFunc={secondaryImageUrlFunc}/>}
                {count >= 3 && <SecondaryFileUploadBtn secondaryImageUrlFunc={secondaryImageUrlFunc}/>}
                {count >= 4 && <SecondaryFileUploadBtn secondaryImageUrlFunc={secondaryImageUrlFunc}/>}
              <div>
                <button onClick={addFileUploadBtn}>+</button>
                {count >= 2 && <button onClick={removeFileUploadBtn}>-</button>}
              </div>
          </div>
    </div>
  )
}

export default AddModuleForm