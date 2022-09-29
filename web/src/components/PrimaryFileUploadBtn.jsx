import React from 'react'
import {uploadImage} from '../api/services'

const PrimaryFileUploadBtn = ({primaryImageUrlFunc}) => {

const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);

    uploadImage(uploadData)
    .then(response => {
      console.log("response is: ", response.fileUrl);
      primaryImageUrlFunc(response.fileUrl);
    })
    .catch(err => console.log("Error while uploading the file: ", err));
  };


  return (
    <div>
    
    <input type="file" onChange={(e) => handleFileUpload(e)} />

    </div>
  )
}

export default PrimaryFileUploadBtn