import React, { useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault()

    try {
      await axiosInstance.post('/signup', {username, password});
      console.log("Registration Successfull")
    } catch (error) {
      console.error('Error Registering:', error)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <input 
      type='text'
      placeholder='Enter Username'
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      />
      <input 
      type='password'
      placeholder='Enter Password'
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      />
      <button type='submit'>Register</button>
    </form>
  )
}

export default RegistrationForm