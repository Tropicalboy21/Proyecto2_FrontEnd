import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../assets/styles/app.css';
import ImagenLogo from '../../assets/imgs/logo.png';
import Alert from '../Alert';
import multas from '../../assets/data/multas.json'; // Import JSON file

const PagoMulta = ({ username }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [useremail, setUserEmail] = useState('');
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
          amount,
          description,
          userEmail: useremail,
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
      <form onSubmit={registerFine} className="padre2">
        <img src={ImagenLogo} alt="imagelogo" className="tamano-imagen" />
        <h2 className="title">Pago de Multa</h2>
        <div className="Inputs">

        <p>Id de Multa: </p>   
        <p>Fecha de Multa:</p>

        <p>Numero de la Tarjeta: </p>   
          <input
            type="text"
            placeholder="XXXX-XXXX-XXXX-XXXX"
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
          <p>Fecha de Caducidad: </p>   
            <input
            type="text"
            placeholder="MM/AA"
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
            <p>Titular de la Tarjeta: </p> 
            <input
            type="text"
            placeholder="Nombre Apellido"
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
            <p>CVV: </p> 
          <input
            type="text"
            placeholder="XXX"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
    

          <p>Monto a Pagar: ₡ {amount}</p>

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
