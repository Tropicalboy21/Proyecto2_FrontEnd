import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';
import ImagenLogo from '../assets/logo.jpg'
import ImageProfile from '../assets/imagen-perfil.jpg'

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:7289/api/Auth/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserName: username,
          Password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Usuario o contraseña incorrectos');
      }

      const data = await response.json();
      console.log('Token:', data.token);
      localStorage.setItem('token', data.token);

      // Notify parent component and redirect
      onLoginSuccess(username);
      navigate('/home'); // Redirect to Home page
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleLogin}  className='padre'>
      <img src={ImagenLogo} alt="imagelogo" className='tamano-imagen' />
      <div className='wrapper'>
        <div className='Inputs'>
            <input
              type="text"
              placeholder='usuario'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder='Contraseña'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
        </div>
        <Link to="/forgot-password" className='forgot'>Olvido su contraseña?</Link>
        <div className='Buttons'>
          <button type="submit" className='iniciar'>Iniciar Session</button>
          <Link to="/register">
            <button>Registrarse</button>
          </Link>
        </div>
      </div>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;
