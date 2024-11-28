import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../assets/styles/app.css';
import ImagenLogo from '../../assets/imgs/logo.png';
import Alert from '../Alert';

const PagoMulta = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardDate, setCardDate] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardCode, setCardCode] = useState('');

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const fineId = localStorage.getItem('username');

  const registerPayment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://localhost:7289/api/Payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fineId: "2525",
          amount: "1000",
          paymentDate: "2024-11-28", 
        }),
      });

      if (!response.ok) {
        setAlertMessage('Error al pagar la multa');
        setAlertType('error');
      } else {
        setAlertMessage('¡Multa pagada con éxito!');
        setAlertType('success');
      }
      setShowAlert(true);
    } catch (error) {
      setAlertMessage(error.message === 'Failed to fetch' ? 'Lo sentimos, error en la conexión' : error.message);
      setAlertType('error');
      setShowAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    setAlertMessage('');
  };

  return (
    <div className="view-container">
      {showAlert && <Alert type={alertType} message={alertMessage} onClose={handleCloseAlert} />}
      <form onSubmit={registerPayment} className="padre2">
        <img src={ImagenLogo} alt="imagelogo" className="tamano-imagen" />
        <h2 className="title">Pago de Multa</h2>
        <div className="Inputs">

        <p>Id de Multa: {fineId} </p>   
        <p>Fecha de Multa: {fineId}</p>

        <p>Numero de la Tarjeta: </p>   
          <input
            type="text"
            placeholder="XXXX-XXXX-XXXX-XXXX"
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
          <p>Fecha de Caducidad: </p>   
            <input
            type="text"
            placeholder="MM/AA"
            onChange={(e) => setCardDate(e.target.value)}
            required
          />
            <p>Titular de la Tarjeta: </p> 
            <input
            type="text"
            placeholder="Nombre Apellido"
            onChange={(e) => setCardName(e.target.value)}
            required
          />
            <p>CVV: </p> 
          <input
            type="text"
            placeholder="XXX"
            onChange={(e) => setCardCode(e.target.value)}
            required
          />
    

          <p>Monto a Pagar: ₡ {fineId}</p>

        </div>
        <div className="Buttons">
          <button className="iniciar login" type="submit">
            Pagar
          </button>
        </div>
      </form>
    </div>
  );
};

export default PagoMulta;
