import React, { useState } from 'react';
import '../App.css';
import { useNavigate, Link } from 'react-router-dom';
import Alert from '../components/Alert'

const Register = () => {
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [cedula, setCedula] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false); 
  const [alertType, setAlertType] = useState(''); 
  const [alertMessage, setAlertMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://localhost:7289/api/Auth/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Name: name,
          LastName: lastname,
          Cedula: cedula, 
          Email: email,
          Password: password,
        }),
      });

      if (!response.ok) {
        setAlertMessage('No se pudo registrar el usuario');
        setAlertType('error');
      }
      setAlertMessage('¡Usuario registrado con exito!');
      setAlertType('success');
      setShowAlert(true);
      
      setTimeout(() => {
        navigate('/Login');
      }, 2000);
    } catch (error) {
      if(error.message == 'Failed to fetch'){
        setAlertMessage('Lo sentimos, error en la conexión');
        setAlertType('error');
      } else {
        setAlertMessage(error.message);
        setAlertType('error');
      }
      setShowAlert(true);
    }
  }

  const handleCloseAlert = () => {
    setShowAlert(false);
    setAlertMessage('');
  };

  return (
    <div className='register-container'>

      {showAlert && (
      <Alert 
      type={alertType} 
      message={alertMessage} 
      onClose={handleCloseAlert}/>)}

      <Link to="/Login"><button className='volver'>volver</button></Link>

      <form onSubmit={handleRegister}  className='padre2'>
        <h2 className='title'>Crear nueva cuenta</h2>
        <div className='Inputs'>
          <input
            type="text"
            placeholder='Nombre'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder='Apellido'
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder='Cédula'
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder='Correo electrónico'
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
      </form>
    </div>
  );
};

export default Register;
