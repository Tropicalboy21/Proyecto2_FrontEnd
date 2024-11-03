import React, { useState } from 'react';
import '../App.css';
import { useNavigate, Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://localhost:7289/api/Auth/ForgotPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            Email: email,  // Ensure this matches the case and name expected by the DTO
            ResetUrl: 'http://localhost:5173/reset-password'  }),
      });

      if (response.ok) {
        setMessage('Se ha enviado un correo electrónico para restablecer la contraseña a su dirección de correo electrónico.');
      } else {
        throw new Error('No se pudo enviar el correo electrónico para restablecer la contraseña.');
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>

      <form onSubmit={handleForgotPassword}>
        <h2>Olvide mi contraseña</h2>
        <div className='Inputs'>
          <input
            type="email"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='Buttons'>        
          <button type="submit" className='iniciar'>Recuperar Contraseña</button>
          <Link to="/Login">
            <button>Iniciar Sesion</button>
          </Link>
        </div>
      </form>
      {message && <p className='message'>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
