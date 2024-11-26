import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../assets/styles/app.css';
import ImagenLogo from '../../assets/imgs/logo.png'
import Alert from '../Alert'

const OficialMulta = ({username}) =>{
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [useremail, setuseremail] = useState('');
    const [showAlert, setShowAlert] = useState(false); 
  const [alertType, setAlertType] = useState(''); 
  const [alertMessage, setAlertMessage] = useState('');
    const registerFine = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('https://localhost:7289/api/Fines', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: amount,
              description: description,
              userEmail: useremail,
            }),
          });
    
          if (!response.ok) {
            setAlertMessage('No se pudo registrar la multa');
            setAlertType('error');
          }
          setAlertMessage('¡Multa registrada con exito!');
          setAlertType('success');
          setShowAlert(true);
          
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
    return(
    <div className='view-container'>
{showAlert && (
      <Alert 
      type={alertType} 
      message={alertMessage} 
      onClose={handleCloseAlert}/>)}
        <form onSubmit={registerFine} className='padre2'>
        <img src={ImagenLogo} alt="imagelogo" className='tamano-imagen' />
        <h2 className='title'>Registrar una multa</h2>
        <p>{username}</p>
        <div className='Inputs'>
        <input
          type= "number"
          placeholder="Monto"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          />
          <input
          type= "text"
          placeholder="Descripcion"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          />
          <input
            type="text"
            placeholder='Email'
            value={useremail}
            onChange={(e) => setuseremail(e.target.value)}
            required
          />
        
        </div>
        <div className='Buttons'>
          <button className='iniciar login' type="submit">Registrar</button>
        </div>
      </form>
    </div>
    );
}
export default OficialMulta;