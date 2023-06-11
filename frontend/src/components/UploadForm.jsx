import React, { useState } from 'react'
import axiosInstance from '../../utils/axiosInstance'

const UploadForm = () => {
  const [file,setFile] = useState(null)

  const handleSubmit = async(e,token) =>{
    e.preventDefault()

    try {
      const formData = new FormData();
      formData.append('file', file)
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };  

      const response = await axiosInstance.post('/upload', formData, config)

      console.log('File uploaded');
      console.log('Code:', response.data.code);
    } catch (error) {
        console.error('Error uploading file:', error);
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input type='file' onChange={(e) => setFile(e.target.value)} />
      <button type='submit'>Upload</button>
    </form>
  )
}

export default UploadForm