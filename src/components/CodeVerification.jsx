import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../assets/styles/app.css';
import ImagenLogo from '../assets/imgs/logo.png'
import Alert from '../components/Alert'

const CodeVerification = ({username}) =>{
  const [code, setCode] = useState('');
  const [showAlert, setShowAlert] = useState(false); 
  const [alertType, setAlertType] = useState(''); 
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  const handleVerification = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:7289/api/Auth/VerifyCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserName: username,
          code: code,
        }),
      });

      if (!response.ok) {
        throw new Error('Codigo Invalido');
      }

      const data = await response.json();
      console.log('Token:', data.token);
      localStorage.removeItem('tempToken');


      localStorage.setItem('token', data.token); 

      // Navigate based on the user's role
      if (data.role === 'Admin') {
        navigate('/homeAdmi');
      } else if (data.role === 'Officer') {
        navigate('/homeOficial');
      } else if (data.role === 'Judge') {
        navigate('/homeJuez');
      } else {
        navigate('/homeCiudadano');
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

    return(
    <div className='view-container'>
      {showAlert && (
        <Alert type="error" message={alertMessage} onClose={handleCloseAlert} />
      )}
        <form onSubmit={handleVerification} className='padre2'>
        <h2 className='title'>Confirmar Acceso</h2>
        <p>{username}</p>
        <div className='Inputs'>
          <input
            type="text"
            placeholder='Código de verificación'
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        <div className='Buttons'>
          <button className='iniciar login' type="submit">Verificar</button>
        </div>
      </form>
    </div>
    );
}

export default CodeVerification;