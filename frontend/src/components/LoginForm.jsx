import React, { useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axiosInstance.post("/login", {username, password});

      console.log('Login Successgfull')
      console.log('Token:', response.data.token)
    } catch (error) {
      console.log('Error Logging in:', error)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      </form>
  )
}

export default LoginForm