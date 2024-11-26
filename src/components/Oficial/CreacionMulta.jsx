import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import "../../assets/styles/stylesOficial/CreacionMulta.css";
import Alert from '../../components/Alert';
import ImagenLogo from '../../assets/imgs/logo.png';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';


const CreacionMulta = ({ username }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [useremail, setUserEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [multaId, setMultaId] = useState('');
  const [boletaNum, setBoletaNum] = useState('');
  const [fechaInfraccion, setFechaInfraccion] = useState('');
  const [horaInfraccion, setHoraInfraccion] = useState('');
  const [placaVehiculo, setPlacaVehiculo] = useState('');
  const [codigoInfraccion, setCodigoInfraccion] = useState([]);
  const [montoMulta, setMontoMulta] = useState(0);
  const [observaciones, setObservaciones] = useState('');
  const [reclamos, setReclamos] = useState('');
  const [error, setError] = useState('');
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [showWarnings, setShowWarnings] = useState(false);
  const [inspector, setInspector] = useState('');

  const multas = {
    'Categoría-A': 363748.28,
    'Categoría-B': 227300,
    'Categoría-C': 113700,
    'Categoría-D': 62300,
    'Categoría-E': 26070.69,
  };

  useEffect(() => {
    const generateUniqueId = () => {
      const id = `MUL-${Math.floor(Math.random() * 10000)}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
      const num = `BOLETA-${Math.floor(Math.random() * 10000)}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
      setMultaId(id);
      setBoletaNum(num);
    };

    const now = new Date();
    setFechaInfraccion(now.toISOString().split('T')[0]);
    setHoraInfraccion(now.toTimeString().split(' ')[0]);
    generateUniqueId();
  }, []);

  const validateIdentification = (value) => {
    const regex = /^\d-\d{4}-\d{4}$/;
    return regex.test(value);
  };

  const registerFine = async (e) => {
    e.preventDefault();
    if (!validateIdentification(inspector)) {
      setError("El número de identificación debe poseer el siguiente formato 0-0000-0000.");
      return;
    }
    if (!placaVehiculo) {
      setError("La placa del vehículo es requerida.");
      return;
    }

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
          multaId: multaId,
          boletaNum: boletaNum,
          fechaInfraccion: fechaInfraccion,
          horaInfraccion: horaInfraccion,
          placaVehiculo: placaVehiculo,
          codigoInfraccion: codigoInfraccion,
          montoMulta: montoMulta,
          observaciones: observaciones,
          reclamos: reclamos,
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
      if (error.message === 'Failed to fetch') {
        setAlertMessage('Lo sentimos, error en la conexión');
        setAlertType('error');
      } else {
        setAlertMessage(error.message);
        setAlertType('error');
      }
      setShowAlert(true);
    }
  };

  const handleInfraccionChange = (e) => {
    const selectedValue = e.target.value;

    if (!selectedValue || selectedValue === "Seleccione") return;

    if (!codigoInfraccion.includes(selectedValue)) {
      setCodigoInfraccion((prev) => [...prev, selectedValue]);
      setMontoMulta((prev) => prev + (multas[selectedValue] || 0));
    }
  };

  const removeInfraccion = (tipo) => {
    setCodigoInfraccion((prev) => prev.filter((infraccion) => infraccion !== tipo));
    setMontoMulta((prev) => prev - (multas[tipo] || 0));
  };



  const handleCheckboxChange = () => {
    setPrivacyChecked(!privacyChecked);
    if (!privacyChecked) setShowWarnings(true);
  };

  const totalFormatted = montoMulta.toFixed(2);

  const crearFacturaPDF = () => {
    if (!handleValidations()) return; 

    const invoice = document.querySelector('.invoice'); 
    
    html2canvas(invoice, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('factura_multa.pdf'); 
    });
};




  function redirectToHomeOficial() {
    const history = useHistory();
    history.push('/HomeOficial'); 
}

const handleValidations = () => {
  if (!inspector || !placaVehiculo || !useremail || !montoMulta) {
      setError("Todos los campos son obligatorios.");
      return false;
  }
  return true;
};

  return (
    <div className="invoice">
      {showAlert && (
        <Alert type={alertType} message={alertMessage} onClose={() => setShowAlert(false)} />
      )}
      <img src={ImagenLogo} alt="Logo" className="invoice-logo" />
      <h2>Factura de Multa</h2>
      <p>Id Multa: {multaId}</p>
      <p>No Boleta: {boletaNum}</p>

      <div className="form-group">
        <label>Fecha de la infracción</label>
        <p>{fechaInfraccion}</p>
      </div>
      <div className="form-group">
        <label>Hora de la infracción</label>
        <p>{horaInfraccion}</p>
      </div>
      <div className="form-group">
        <label>Identificación del Oficial</label>

        <input
          type="text"
          value={inspector}
          onChange={(e) => {
            const value = e.target.value;
            const formattedValue = value
              .replace(/[^\d]/g, '') 
              .replace(/^(\d{1})(\d{0,4})(\d{0,4}).*/, '$1-$2-$3') 
              .replace(/-$/, ''); 
            setInspector(formattedValue);
            if (!validateIdentification(formattedValue)) {
              setError('El formato debe ser 0-0000-0000.');
            } else {
              setError('');
            }
          }}
          placeholder="Ingrese identificación (0-0000-0000)"
          required
        />
        {error && <span className="error-message">{error}</span>}
      </div>

      <div className="form-group">
        <label>Placa del Vehículo</label>
        <input
          type="text"
          value={placaVehiculo}
          onChange={(e) => {
            const value = e.target.value.toUpperCase(); 
            const regex = /^[A-Z0-9]*$/; 
            if (regex.test(value) || value === '') {
              setPlacaVehiculo(value);
              setError('');
            } else {
              setError('La placa solo puede contener letras y números.');
            }
          }}
          placeholder="Ingrese la placa del vehículo"
          required
        />
        {error && <span className="error-message">{error}</span>}
      </div>
      <div className="form-group">
        <label>Código de infracción</label>
        <select onChange={handleInfraccionChange}>
          <option value="Seleccione">Seleccione un tipo de multa</option>
          <option value="Categoría-A">Categoría A (Fosas Múltiples)</option>
          <option value="Categoría-B">Categoría B (Multas Moderadas)</option>
          <option value="Categoría-C">Categoría C (Multimedia)</option>
          <option value="Categoría-D">Categoría D (Multas Leves)</option>
          <option value="Categoría-E">Categoría E (Multas de Menor Gravedad)</option>
          <option value="Otras">Otras</option>
        </select>
      </div>
      <div className="form-group">
        <label>Resumen de la Multa</label>
        <table>
          <thead>
            <tr>
              <th style={{ fontWeight: 'bold' }}>TIPO DE MULTA</th>
              <th style={{ fontWeight: 'bold' }}>VALOR</th>
              <th style={{ fontWeight: 'bold' }}>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {codigoInfraccion.map((tipo) => (
              <tr key={tipo}>
                <td>{tipo}</td>
                <td>{multas[tipo]}</td>
                <td>
                  <button
                    style={{
                      color: 'white',
                      backgroundColor: 'red',
                      border: 'none',
                      padding: '5px 10px',
                      cursor: 'pointer',
                    }}
                    onClick={() => removeInfraccion(tipo)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontWeight: 'bold' }}>Monto Total: {totalFormatted}</p>
      </div>
      <div className="form-group">
        <label>Observaciones del oficial</label>
        <input
          type="text"
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
          placeholder="Observaciones del oficial"
          required
        />
      </div>
      <div className="form-group">
        <label>Reclamos</label>
        <select onChange={(e) => setReclamos(e.target.value)} required>
          <option value="">Seleccione si el conductor realizó un reclamo</option>
          <option value="Sí">Sí</option>
          <option value="No">No</option>
        </select>
      </div>
      {showWarnings && privacyChecked && (
        <div className="privacy-warning">
          <h4>Advertencias de Ley al Infractor</h4>
          <p>LEY DE TRÁNSITO POR VIAS PUBLICAS TERRESTRES Y SEGURIDAD VIAL N° 9078...</p>
        </div>
      )}
      <div className="signature-section">
        <label>Firma del Infractor</label>
        <input type="text" placeholder="Nombre del infractor" />
      </div>
      <div className="form-group">
        <label>Correo electrónico del infractor</label>
        <input
          type="email"
          value={useremail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="Ingrese correo electrónico"
        />
      </div>
      <div className="action-button">
    <button onClick={crearFacturaPDF}>Crear Factura</button>
    <button onClick={registerFine}>Registrar Multa</button>
    <button onClick={redirectToHomeOficial}>Regresar</button>
</div>

    </div>
  );
};

export default CreacionMulta;