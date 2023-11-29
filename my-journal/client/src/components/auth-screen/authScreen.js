import React, { useState } from 'react';
import apiService from '../../apiService';
import './authScreen.css';

const AuthComponent = ({setIsAuthenticated}) => {
  const [isRegisterScreen, setIsRegisterScreen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repPassword, setRepPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await apiService.login(username, password);
      console.log(response);
      if (response.token) {
        localStorage.setItem('authToken', response.token);
        setIsAuthenticated(true);
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('Error during login');
    }
  };

  const handleRegister = async () => {
    try {
      if (password !== repPassword) {
        setError('Passwords do not match');
        return;
      }
      const response = await apiService.register(username, password);
      if (response.token) {
        localStorage.setItem('authToken', response.token);
        setIsAuthenticated(true);
      } else {
        setError('Username already exists');
      }
    } catch (error) {
      setError('Error during registration');
    }
  };

  return (
    <div className='container'>
      {!isRegisterScreen ? (
        <div className='box'>
          <h2>Welcome back</h2>
          <div className='input-fields'>
            <input className='input-item' placeholder='Username' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

            <input className='input-item' placeholder='Password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <button className='input-item' onClick={handleLogin}>Login</button>

            <p>Don't have an account yet? </p>
            <button className='redirect-btn' onClick={() => setIsRegisterScreen(true)}>Register here</button>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      ) : (
          <div className='box'>
            <h2>Hello there</h2>
            <div className='input-fields'>
              <input className='input-item' placeholder='Username' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
     
              <input className='input-item' placeholder='Password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    
              <input className='input-item' placeholder='Password'  type="password" value={repPassword} onChange={(e) => setRepPassword(e.target.value)} />
            
              <button className='input-item' onClick={handleRegister}>Register</button>

              <p>Already have an account?</p>
              <button className='redirect-btn' onClick={() => setIsRegisterScreen(false)}>Login here</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
      )}
    </div>
  );
};

export default AuthComponent;
