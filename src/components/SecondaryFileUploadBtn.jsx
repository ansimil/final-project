import React from 'react'
import {uploadImage} from '../api/services'
import toast from 'react-hot-toast'

const SecondaryFileUploadBtn = ({secondaryImageUrlFunc}) => {

const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    const toastLoading = toast.loading('Loading...', {
      style: {
              border: '2px solid black',
              backgroundColor: 'white',
              borderRadius: '0px',
              padding: '5px 10px',
              color: 'black',
     },
     iconTheme: {
              primary: '#000',
              secondary: '#fff',
    },
    })
    uploadImage(uploadData)
    .then(response => {
      toast.dismiss(toastLoading)
      toast.success('File Uploaded', {
        style: {
                border: '2px solid black',
                backgroundColor: 'white',
                borderRadius: '0px',
                padding: '5px 10px',
                color: 'black',
       },
       iconTheme: {
                primary: '#000',
                secondary: '#fff',
      },
      })
      secondaryImageUrlFunc(response.fileUrl);
    })
    .catch(err => console.log("Error while uploading the file: ", err));
  };


  return (
    <div>
    
    <input type="file" onChange={(e) => handleFileUpload(e)} />

    </div>
  )
}

export default SecondaryFileUploadBtn