import React from 'react'
import Footer from '../components/Footer'

const EasterEgg = () => {
  return (
    <div className='easterEgg'>

        <video controls>
        <source src="https://res.cloudinary.com/dpkg7rmxr/video/upload/v1665133349/modules-gallery/E1FFB57A-5DD2-4937-B761-094D010526BB_emxuug.mp4" type="video/mp4"/>
        </video>
        
    <Footer/>
    </div>
  )
}

export default EasterEgg