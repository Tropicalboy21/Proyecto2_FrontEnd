import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';
import ImagenLogo from '../assets/imgs/logo.png'
import Alert from '../components/Alert'

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false); 
  const [alertType, setAlertType] = useState(''); 
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

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

      onLoginSuccess(username);
      navigate('/home');


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
    <div className='login_section'>
       {showAlert && (
        <Alert
          type={alertType}
          message={alertMessage}
          onClose={handleCloseAlert}
        />
      )}
      <form onSubmit={handleLogin}  className='padre'>
        <img src={ImagenLogo} alt="imagelogo" className='tamano-imagen' />
        <h2 className='title'>Transito Inteligente</h2>
        <div className='wrapper'>
          <div className='Inputs'>
              <input
                type="text"
                placeholder='Usuario'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <Link to="/forgot-password" className='forgot'>Olvido su contraseña?</Link>
              <input
                type="password"
                placeholder='Contraseña'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
          </div>
          <div className='Buttons'>
            <button type="submit" className='iniciar login'>Iniciar sesion</button>
          </div>
          <p>No tiene cuenta? <Link to="/register" className='registrarse'>Registrarse</Link></p>
        </div>
        {/* {error && <p>{error}</p>} */}
      </form>
      <div className='illustration'></div>
    </div>
  );
};

export default Login;
