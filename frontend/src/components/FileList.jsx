import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';

const FileList = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axiosInstance.get('/files')

        setFiles(response.data.files)
      } catch (error) {
         console.error("Error fetching files:", error);
      }
    }
    fetchFiles();
  }, [])
  return (
    <div>
      <h2>File List</h2>
      {files.map((file) => (
        <div key={file._id}>
          <p>Filename: {file.filename}</p>
          <p>Code: {file.code}</p>
          </div>
      ))}
    </div>
  )
}

export default FileList