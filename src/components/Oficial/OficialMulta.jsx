import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../assets/styles/app.css';
import ImagenLogo from '../../assets/imgs/logo.png';
import Alert from '../Alert';
import multas from '../../assets/data/multas.json'; // Import JSON file

const OficialMulta = () => {
  const [place, setPlace] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [useremail, setUserEmail] = useState('');
  const [plate, setPlate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLaw, setSelectedLaw] = useState('');
  const [filteredLaws, setFilteredLaws] = useState([]);
  const [conduct, setConduct] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const username = localStorage.getItem('username');

  useEffect(() => {
    // Filter laws based on selected category
    if (selectedCategory) {
      setFilteredLaws(multas.filter((multa) => multa.category === selectedCategory));
    } else {
      setFilteredLaws([]);
    }
    setSelectedLaw('');
    setConduct('');
    setAmount('');
  }, [selectedCategory]);

  useEffect(() => {
    // Populate conduct and amount based on selected law
    if (selectedLaw) {
      const multa = filteredLaws.find((multa) => multa.law === selectedLaw);
      if (multa) {
        setConduct(multa.conduct);
        setAmount(multa.price);
      }
    }
  }, [selectedLaw, filteredLaws]);

  const registerFine = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://localhost:7289/api/Fines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inspector: username, 
          userEmail: useremail,
          place: place, 
          licensePlate: plate,
          category: selectedCategory,
          article: selectedLaw,
          description: description,
          description: description,
          conduct: conduct,
          amount: amount,
        }),
      });

      if (!response.ok) {
        setAlertMessage('No se pudo registrar la multa');
        setAlertType('error');
      } else {
        setAlertMessage('¡Multa registrada con éxito!');
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

  const today = new Date();
  const currentDate = `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}/${today.getFullYear()}`;

  return (
    <div className="view-container">
      {showAlert && <Alert type={alertType} message={alertMessage} onClose={handleCloseAlert} />}
      <form onSubmit={registerFine} className="padre2">
        <img src={ImagenLogo} alt="imagelogo" className="tamano-imagen" />
        <h2 className="title">Registrar una multa</h2>
        <div className="Inputs">
        <p>Inspector: {username}</p>
        <p>Fecha: {currentDate}</p>

          <input
            type="text"
            placeholder="Email - test"
            value={useremail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
                    <input
            type="text"
            placeholder="N° Zona"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            required
          />
            <input
            type="text"
            placeholder="Placa Vehicular"
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
            required
          />
          {/* Category Select */}
          <select
            className='selector'
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="">Seleccione la Categoría</option>
            {[...new Set(multas.map((multa) => multa.category))].map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Law Select */}
          <select
            className='selector'
            value={selectedLaw}
            onChange={(e) => setSelectedLaw(e.target.value)}
            disabled={!selectedCategory}
            required
          >
            <option value="">Ley de Transito</option>
            {filteredLaws.map((multa) => (
              <option key={multa.id} value={multa.law}>
                {multa.law}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Observaciones"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <p>Conducta:</p>
          <p className='ley'><i>{conduct}</i></p>

          <p>Monto a Pagar: ₡ {amount}</p>

        </div>
        <div className="Buttons">
          <button className="iniciar login" type="submit">
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default OficialMulta;
