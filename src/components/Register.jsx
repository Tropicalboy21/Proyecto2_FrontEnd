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
        throw new Error('No se pudo registrar el usuario');
      }

      setMessage('Usuario registrado con exitosamente!');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className='register-container'>
            <Link to="/Login">
            <button className='volver'>volver</button>
          </Link>
    <form onSubmit={handleRegister}  className='padre2'>
        <h2 className='title'>Crear nueva cuenta</h2>
      <div className='Inputs'>
      <input
          type="password"
          placeholder='Cédula'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder='Usuario'
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
        <button className='iniciar login' type="submit">Registrarse</button>
      </div>
      {message && <p>{message}</p>}
    </form>
    </div>
  );
};

export default Register;
