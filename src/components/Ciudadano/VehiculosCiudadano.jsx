
import '../../assets/styles/stylesCiudadanos/vehiculosCiudadano.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from '../Alert';

const VehiculosCiudadano = () => {
  const [marca, setMarca] = useState('');
  const [cantidadPuertas, setCantidadPuertas] = useState('');
  const [color, setColor] = useState('');
  const [numeroPlaca, setNumeroPlaca] = useState('');
  const [tipoVehiculo, settipoVehiculo] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState(null);

  const username = localStorage.getItem('username');

  const addVehicle = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://localhost:7289/api/Vehicles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: username, 
          marca: marca, 
          cantidadPuertas: cantidadPuertas,
          color: color,
          numeroPlaca: numeroPlaca, 
          tipoVehiculo: tipoVehiculo,
        }),
      });

      if (!response.ok) {
        setAlertMessage('No se pudo registrar el vehiculo');
        setAlertType('error');
      } else {
        setAlertMessage('¡Vehiculo registrada con éxito!');
        setAlertType('success');
      }
      setShowAlert(true);

      setMarca('');
      setCantidadPuertas('');
      setColor('');
      setNumeroPlaca('');
      settipoVehiculo('');

    } catch (error) {
      setAlertMessage(error.message === 'Failed to fetch' ? 'Lo sentimos, error en la conexión' : error.message);
      setAlertType('error');
      setShowAlert(true);
    }
  };

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        
        const response = await fetch(`https://localhost:7289/api/Vehicles?userin=${username}`, {
          
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        

        
        if (Array.isArray(data) && data.length > 0) {
          setVehicles(data);
        } else {
          setVehicles([]); 
        }
      } catch (err) {
        setError(err.message);
      }
    };

    
    if (username) {
      fetchVehicles();
    }
  }, [username]);

  const handleCloseAlert = () => {
    setShowAlert(false);
    setAlertMessage('');
  };

  return (
    <div className="contenedor-vehiculo-ciudadano">
      {/* Alerta */}
      {showAlert && <Alert type={alertType} message={alertMessage} onClose={handleCloseAlert} />}

      {/* Columna de Registro */}
      <div className="card-vehiculo-registro-ciudadano">
        <h2 className='title'>Registrar Vehiculo</h2>
        <form className="form-vehiculo-ciudadano" onSubmit={addVehicle}>
          <label>Marca</label>
          <input
            type="text"
            name="marca"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
          />
          <label>Cantidad de Puertas</label>
          <input
            type="number"
            name="CantidadPuertas"
            value={cantidadPuertas}
            onChange={(e) => setCantidadPuertas(e.target.value)}
          />
          <label>Color</label>
          <input
            type="text"
            name="Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <label>Número de Placa</label>
          <input
            type="text"
            name="NumeroPlaca"
            value={numeroPlaca}
            onChange={(e) => setNumeroPlaca(e.target.value)}
          />
          <label>Tipo de Vehículo</label>
          <input
            type="text"
            name="TipoVehiculo"
            value={tipoVehiculo}
            onChange={(e) => settipoVehiculo(e.target.value)}
          />
          <button type="submit">Registrar</button>
        </form>
      </div>

      {/* Columna de Consulta */}
      <div className="card-vehiculo-registro-ciudadano">
        <h2 className='title'>Vehiculos</h2>
        <form className="form-vehiculo-ciudadano">
        {vehicles.length > 0 ? (
                vehicles.map((v) => (
                  <div className='vehicle'>
                  <p key={v.id}>{v.marca}</p>
                  <ul>
                    <li>{v.cantidadPuertas}</li>
                    <li>{v.color}</li>
                    <li>{v.numeroPlaca}</li>
                    <li>{v.tipoVehiculo}</li>
                    </ul>
                    </div>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No se encontraron multas.</td>
                </tr>
              )}

        </form>
        {/* {vehiculoInfo && (
          <div className="wrapper-vehiculo-ciudadano">
            <h3>Información del Vehículo</h3>
            <p><strong>Número de Motor:</strong> {vehiculoInfo.numeroMotor || "No disponible"}</p>
            <p><strong>Cantidad de Puertas:</strong> {vehiculoInfo.cantidadPuertas || "No disponible"}</p>
            <p><strong>Color:</strong> {vehiculoInfo.color || "No disponible"}</p>
            <p><strong>Número de Placa:</strong> {vehiculoInfo.numeroPlaca || "No disponible"}</p>
            <p><strong>Tipo de Vehículo:</strong> {vehiculoInfo.tipoVehiculo || "No disponible"}</p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default VehiculosCiudadano;
    