import React from 'react'
import fbIcon from '../../assets/fb-logo.png'
import twIcon from '../../assets/tw-logo.png'
import ytIcon from '../../assets/yt-logo.png'
import scIcon from '../../assets/sc-logo.png'
import emIcon from '../../assets/em-logo.png'
import './Footer.css'

const Footer = () => {
  const height = "30px"
  const width = "30px"
  
  return (
    <div className="footer">

      <div className="socialsContainer">

        <div><img src={emIcon} alt="email" height={height} width={width}/></div>
        <div><img src={fbIcon} alt="facebook" height={height} width={width}/></div>
        <div><img src={twIcon} alt="twitter" height={height} width={width}/></div>
        <div><img src={ytIcon} alt="youtube" height={height} width={width}/></div>
        <div><img src={scIcon} alt="soundcloud" height={height} width={width}/></div>
    
      </div>
    
    </div> 
  )
}

export default Footer