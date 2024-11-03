import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import '../App.css'

const ResetPassword = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get('token');
  const email = query.get('email');
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://localhost:7289/api/Auth/ResetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Email: email,
          Token: token,
          Password: newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al restablecer la contraseña');
      }

      setMessage('¡Restablecimiento de contraseña exitoso! Ahora puedes iniciar sesión con tu nueva contraseña.');
      setTimeout(() => {
        navigate('/Login');
      }, 2000);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleResetPassword}>
      <h2>Reset Password</h2>
        <div className='Inputs'>
        <input
          type="email"
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
          <input
            type="password"
            value={newPassword}
            placeholder='Nueva Constraseña'
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className='Buttons'>
          <button type="submit" className='iniciar'>Reset Password</button>
          <Link to="/Login">
            <button>Cancelar</button>
          </Link>
        </div>
      </form>
      {message && <p className='message'>{message}</p>}
    </div>
  );
};

export default ResetPassword;
