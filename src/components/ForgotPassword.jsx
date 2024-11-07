import React, { useState } from 'react';
import '../App.css';
import { useNavigate, Link } from 'react-router-dom';
import Alert from '../components/Alert'

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false); 
  const [alertType, setAlertType] = useState(''); 
  
  const [alertMessage, setAlertMessage] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://localhost:7289/api/Auth/ForgotPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            Email: email,
            ResetUrl: 'http://localhost:5173/reset-password'  }),
      });

      if (response.ok) {
        setAlertMessage('Se ha enviado un correo electrónico para restablecer la contraseña a su dirección de correo electrónico.');
      } else {
        throw new Error('No se pudo enviar el correo electrónico para restablecer la contraseña.');
      }
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
        <div className='illus'>
          <img/>
        </div>
      <form onSubmit={handleForgotPassword} className='padre2'>
        <h2 className='title'>Recuperar Acceso</h2>
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
          <button type="submit" className='iniciar login'>Resetear</button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
