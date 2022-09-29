import React from 'react'
import { formatProductPrice } from '../api/services'

const ModuleCard = ({sku, name, category, shortDescription, price, currency, tagline, primaryImageUrl }) => {
  const module = {price, currency}

  const newPrice = formatProductPrice(module)

  return (
    <div>
    
    <div>

    <div>
    <h2>{name}</h2>
    <img src={primaryImageUrl} alt="Error loading pic" height="250px" />
    </div>

    <div>
      <p>{tagline}</p>
      <p>{newPrice}</p>
    </div>

    <div>
      <p>{shortDescription}</p>
    </div>

    <div>
      <button>Cart</button>
      <button>Details</button>
    </div>

    </div>

    </div>
  )
}

export default ModuleCard