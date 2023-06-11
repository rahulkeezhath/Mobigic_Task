import React from "react"
import RegistrationForm from "./components/RegistrationForm"
import LoginForm from "./components/LoginForm"
import UploadForm from "./components/UploadForm"
import FileList from "./components/FileList"
import FileRemoval from "./components/FileRemoval"
import FileDownload from "./components/FileDownload"

function App() {
  return (
    <div>
      <h1>User Registration</h1>
      <RegistrationForm />

      <h1>User Login</h1>
      <LoginForm />

      <h1>File Upload</h1>
      <UploadForm />

      <h1>File List</h1>
      <FileList />

      <h1>File Removal</h1>
      <FileRemoval />

      <h1>File Download</h1>
      <FileDownload />
    </div>
  );
}

export default App
