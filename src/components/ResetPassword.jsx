import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import '../assets/styles/app.css';
import Alert from '../components/Alert';

const ResetPassword = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get('token');
  const email = query.get('email');
  const [showAlert, setShowAlert] = useState(false); 
  const [alertType, setAlertType] = useState(''); 
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');

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
        setAlertMessage('Error al restablecer la contraseña');
        setAlertType('error')
      }

      setAlertMessage('¡Restablecimiento de contraseña exitoso! Ahora puedes iniciar sesión con tu nueva contraseña.');
      setAlertType('success')
      setShowAlert(true);

      setTimeout(() => {
        navigate('/Login');
      }, 2000);
    } catch (error) {
      if(error.message == 'Failed to fetch'){
        setAlertMessage('Lo sentimos, error en la conexión');
      } else {
        setAlertMessage(error.message);
      }
      setShowAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    setAlertMessage('');
  };


  return (
    <div className='view-container'>
      {showAlert && (
        <Alert
          type={alertType}
          message={alertMessage}
          onClose={handleCloseAlert}
        />
      )}
        <Link to="/Login">
          <button className='volver'>volver</button>
        </Link>
      <form onSubmit={handleResetPassword} className='padre2'>
      <h2 className='title'>Restablecer acceso</h2>
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
          <button type="submit" className='iniciar login'>Recuperar Clave</button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
