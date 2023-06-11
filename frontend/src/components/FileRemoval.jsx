import React, { useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';

const FileRemoval = () => {
  const [fileId, setFileId] = useState('');

  const handleSubmit = async(e)=> {
    e.preventDefault()

    try {
      await axiosInstance.delete(`/files/${fileId}`)

      console.log("File removed");
    } catch (error) {
        console.error("Error removing file:", error);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
       type='text'
       placeholder='File ID'
       value={fileId}
       onChange={(e) => setFileId(e.target.value)}
       />
       <button type='submit'>Remove</button>
    </form>
  )
}

export default FileRemoval