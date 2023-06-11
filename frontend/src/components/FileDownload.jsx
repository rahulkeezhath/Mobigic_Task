import React, { useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';

const FileDownload = () => {
  const [code, setCode] = useState('')

  const handleSubmit = async (e) =>{
    e.preventDefault();

    try {
      const response = await axiosInstance.get(`/download/${code}`, {params: {code}})

         console.log("File downloaded:", response);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button type="submit">Download</button>
    </form>
  );
}

export default FileDownload