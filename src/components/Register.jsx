import React, { useState } from 'react';
import '../App.css';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://localhost:7289/api/Auth/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserName: username,
          Email: email,
          Password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      setMessage('Registration successful!');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    
    <form onSubmit={handleRegister}>
        <h2>Registrarse</h2>
      <div className='Inputs'>
        <input
          type="text"
          placeholder='usuario'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
      <div className='Buttons'>
        <button className='iniciar' type="submit">Registrarse</button>
        <Link to="/Login">
            <button>Iniciar Sesion</button>
          </Link>
      </div>
      {message && <p>{message}</p>}
    </form>
  );
};

export default Register;
