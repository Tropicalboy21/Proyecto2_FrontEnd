import React, { useState } from 'react';
import axios from 'axios';
import '../../assets/styles/stylesOficial/vehiculosOficial.css';

const VehiculosOficial = () => {
  // Estados para la Lectura de Placas
  const [selectedFile, setSelectedFile] = useState(null);
  const [resultText, setResultText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Estados para el Registro y Consulta de Vehículos
  const [registro, setRegistro] = useState({
    NumeroMotor: '',
    CantidadPuertas: '',
    Color: '',
    NumeroPlaca: '',
    TipoVehiculo: '',
  });
  const [consulta, setConsulta] = useState('');
  const [vehiculoInfo, setVehiculoInfo] = useState(null);

  // Manejo de eventos para la Lectura de Placas
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setResultText('');
    setError(null);
  };

  const handleSubmitLectura = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setError('Por favor selecciona una imagen antes de enviar.');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post(
        'https://localhost:7289/api/lecturaplaca',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      setResultText(response.data);
    } catch (err) {
      setError('Error al procesar la imagen. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // Manejo de eventos para el Registro de Vehículos
  const handleChangeRegistro = (e) => {
    const { name, value } = e.target;
    setRegistro({ ...registro, [name]: value });
  };

  const handleRegistrar = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://localhost:7289/api/Vehiculos', registro);
      alert('Vehículo registrado con éxito');
      setRegistro({
        NumeroMotor: '',
        CantidadPuertas: '',
        Color: '',
        NumeroPlaca: '',
        TipoVehiculo: '',
      });
    } catch (error) {
      alert('Hubo un error al registrar el vehículo');
    }
  };

  // Manejo de eventos para la Consulta de Vehículos
  const handleConsultar = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://localhost:7289/api/Vehiculos/${consulta}`
      );
      setVehiculoInfo(response.data);
    } catch (error) {
      alert('Vehículo no encontrado');
    }
  };

  return (
    <div className="contenedorVehOf">
      {/* Columna 1: Lectura de Placas */}
      <div className="cardVehOf">
        <h2>Lectura de Placas</h2>
        <form className="vehOf-form" onSubmit={handleSubmitLectura}>
  <input 
    className="VehOfform-input" 
    type="file" 
    accept="image/png, image/jpeg" 
    onChange={handleFileChange} 
  />
  <button 
    className="VehOfform-button" 
    type="submit" 
    disabled={loading}
  >
    {loading ? 'Procesando...' : 'Subir y Leer Placa'}
  </button>
</form>

        {error && <p className="resultado-error">{error}</p>}
        {resultText && (
          <div className="resultado-seccion">
            <h3>Resultado:</h3>
            <p>{resultText}</p>
          </div>
        )}
      </div>

      {/* Columna 2: Registro de Vehículos */}
      <div className="cardVehOf">
        <h2>Registro de Vehículos</h2>
        <form className= "vehOf-form" onSubmit={handleRegistrar}>
          <label className = "VehOfform-label">Número de Motor</label>
          <input className = "VehOfform-input"
            type="text"
            name="NumeroMotor"
            value={registro.NumeroMotor}
            onChange={handleChangeRegistro}
            required
          />
          <label className = "VehOfform-label">Cantidad de Puertas</label>
          <input className = "VehOfform-input"
            type="number"
            name="CantidadPuertas"
            value={registro.CantidadPuertas}
            onChange={handleChangeRegistro}
            required
          />
          <label className = "VehOfform-label" >Color</label>
          <input className = "VehOfform-input"
            type="text"
            name="Color"
            value={registro.Color}
            onChange={handleChangeRegistro}
            required
          />
          <label className = "VehOfform-label">Número de Placa</label>
          <input className = "VehOfform-input"
            type="text"
            name="NumeroPlaca"
            value={registro.NumeroPlaca}
            onChange={handleChangeRegistro}
            required
          />
          <label className = "VehOfform-label">Tipo de Vehículo</label>
          <input className = "VehOfform-input"
            type="text"
            name="TipoVehiculo"
            value={registro.TipoVehiculo}
            onChange={handleChangeRegistro}
            required
          />
          <button type="submit">Registrar</button>
        </form>
      </div>

      {/* Columna 3: Consulta de Vehículos */}
      <div className="cardVehOf">
        <h2>Consulta de Vehículos</h2>
        <form className= "vehOf-form" onSubmit={handleConsultar}>
          <label className = "VehOfform-label">Número de Placa</label>
          <input
            type="text"
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            required
          />
          <button type="submit">Consultar</button>
        </form>
        {vehiculoInfo && (
          <div className="alineadorwrapper">
            <h3>Información del Vehículo</h3>
            <p>
              <strong>Número de Motor:</strong>{' '}
              {vehiculoInfo.numeroMotor || 'No disponible'}
            </p>
            <p>
              <strong>Cantidad de Puertas:</strong>{' '}
              {vehiculoInfo.cantidadPuertas || 'No disponible'}
            </p>
            <p>
              <strong>Color:</strong> {vehiculoInfo.color || 'No disponible'}
            </p>
            <p>
              <strong>Número de Placa:</strong>{' '}
              {vehiculoInfo.numeroPlaca || 'No disponible'}
            </p>
            <p>
              <strong>Tipo de Vehículo:</strong>{' '}
              {vehiculoInfo.tipoVehiculo || 'No disponible'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehiculosOficial;
