import React, { useState } from 'react';
import axios from 'axios';
import '../../assets/styles/stylesOficial/vehiculosOficial.css';

const VehiculosOficial = () => {
  // Estados para la Lectura de Placas
  const [selectedFile, setSelectedFile] = useState(null);
  const [resultText, setResultText] = useState('');
  const [loading, setLoading] = useState(false);
  // Estados para el Registro y Consulta de Vehículos
  const [registro, setRegistro] = useState({
    Marca: '',
    CantidadPuertas: '',
    Color: '',
    NumeroPlaca: '',
    TipoVehiculo: '',
  });
  const [registroErrores, setRegistroErrores] = useState({});
  const [consulta, setConsulta] = useState('');
  const [consultaError, setConsultaError] = useState('');
  const [vehiculoInfo, setVehiculoInfo] = useState(null);
  // Estados para mensajes de alerta
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  // Función para mostrar alertas
  const handleShowAlert = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };
  // Manejo de eventos para la Lectura de Placas
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setResultText('');
  };
  const handleSubmitLectura = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      handleShowAlert('error', 'Por favor selecciona una imagen antesde enviar.');
      return;
    }
    setLoading(true);
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
      handleShowAlert('success', 'Lectura de placa realizada con éxito.');
    } catch (err) {
      handleShowAlert('error', 'Error al procesar la imagen. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };
  // Manejo de eventos para el Registro de Vehículos
  const handleChangeRegistro = (e) => {
    const { name, value } = e.target;
    setRegistro({ ...registro, [name]: value });
    setRegistroErrores({ ...registroErrores, [name]: '' });
  };
  const handleRegistrar = async (e) => {
    e.preventDefault();
    const errores = {};
    Object.keys(registro).forEach((campo) => {
      if (!registro[campo]) {
        errores[campo] = 'Favor llenar este campo';
      }
    });
    if (Object.keys(errores).length > 0) {
      setRegistroErrores(errores);
      return;
    }
    try {
      await axios.post('https://localhost:7289/api/Vehicles', 
registro);
      setRegistro({
        Marca: '',
        CantidadPuertas: '',
        Color: '',
        NumeroPlaca: '',
        TipoVehiculo: '',
      });
      setRegistroErrores({});
      handleShowAlert('success', 'Vehículo registrado con éxito.');
    } catch (error) {
      handleShowAlert('error', 'Hubo un error al registrar el vehículo.');
    }
  };
  // Manejo de eventos para la Consulta de Vehículos
  const handleConsultar = async (e) => {
    e.preventDefault();
  
    if (!consulta.trim()) {
      setConsultaError('Favor llenar este campo');
      return;
    }
  
    try {
      const response = await axios.get(
        `https://localhost:7289/api/Vehicles/by-plate/${consulta}`
      );
  
      if (response.data) {
        console.log('Datos recibidos:', response.data);
        setVehiculoInfo(response.data); // Asignar los datos al estado
        handleShowAlert('success', 'Vehículo encontrado.');
      } else {
        setVehiculoInfo(null);
        handleShowAlert('error', 'No se encontraron datos para esta placa.');
      }
    } catch (error) {
      console.error('Error al consultar el vehículo:', error);
      setVehiculoInfo(null);
      handleShowAlert('error', 'Error al consultar el vehículo.');
    }
  };
  
  return (
    <div className="contenedor-vehiculos-oficial">
      {/* Mensaje de alerta */}
      {showAlert && (
        <div className="alert-container">
          <div className={`alert-box alert-${alertType}`}>
            <div className={`icon icon-${alertType}`} />
            <p>{alertMessage}</p>
          </div>
          <div className="overlay"></div>
        </div>
      )}
      {/* Lectura de Placas */}
      <div className="card-vehiculos-oficial">
        <h2>Lectura de Placas</h2>
        <form className="form-vehiculos-oficial" 
onSubmit={handleSubmitLectura}>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Procesando...' : 'Subir y Leer Placa'}
          </button>
        </form>
        {resultText && (
          <div className="seccion-resultado-oficial">
            <h3>Resultado:</h3>
            <p>{resultText}</p>
          </div>
        )}
      </div>
      {/* Registro de Vehículos */}
      <div className="card-vehiculos-oficial">
        <h2>Registro de Vehículos</h2>
        <form className="form-vehiculos-oficial" 
onSubmit={handleRegistrar}>
          <label>Marca</label>
          <input
            type="text"
            name="Marca"
            value={registro.Marca}
            onChange={handleChangeRegistro}
          />
          {registroErrores.Marca && <p className="error-
mensaje">{registroErrores.Marca}</p>}
          <label>Cantidad de Puertas</label>
          <input
            type="number"
            name="CantidadPuertas"
            value={registro.CantidadPuertas}
            onChange={handleChangeRegistro}
          />
          {registroErrores.CantidadPuertas && <p className="error-
mensaje">{registroErrores.CantidadPuertas}</p>}
          <label>Color</label>
          <input
            type="text"
            name="Color"
            value={registro.Color}
            onChange={handleChangeRegistro}
          />
          {registroErrores.Color && <p className="error-
mensaje">{registroErrores.Color}</p>}
          <label>Número de Placa</label>
          <input
            type="text"
            name="NumeroPlaca"
            value={registro.NumeroPlaca}
            onChange={handleChangeRegistro}
          />
          {registroErrores.NumeroPlaca && <p className="error-
mensaje">{registroErrores.NumeroPlaca}</p>}
          <label>Tipo de Vehículo</label>
          <input
            type="text"
            name="TipoVehiculo"
            value={registro.TipoVehiculo}
            onChange={handleChangeRegistro}
          />
          {registroErrores.TipoVehiculo && <p className="error-
mensaje">{registroErrores.TipoVehiculo}</p>}
          <button type="submit">Registrar</button>
        </form>
      </div>
      {/* Consulta de Vehículos */}
      <div className="card-vehiculos-oficial">
        <h2>Consulta de Vehículos</h2>
        <form className="form-vehiculos-oficial" 
onSubmit={handleConsultar}>
          <label>Número de Placa</label>
          <input
            type="text"
            value={consulta}
            onChange={(e) => {
              setConsulta(e.target.value);
              setConsultaError('');
            }}
          />
          {consultaError && <p className="error-
mensaje">{consultaError}</p>}
          <button type="submit">Consultar</button>
        </form>
        {vehiculoInfo && (
          <div className="wrapper-vehiculos-oficial">
            <h3>Información del Vehículo</h3>
            <p>
              <strong>Marca:</strong> {vehiculoInfo.marca || 'No disponible'}
            </p>
            <p>
              <strong>Cantidad de Puertas:</strong> 
{vehiculoInfo.cantidadPuertas || 'No disponible'}
            </p>
            <p>
              <strong>Color:</strong> {vehiculoInfo.color || 'No disponible'}
            </p>
            <p>
              <strong>Número de Placa:</strong> 
{vehiculoInfo.numeroPlaca || 'No disponible'}
            </p>
            <p>
              <strong>Tipo de Vehículo:</strong> 
{vehiculoInfo.tipoVehiculo || 'No disponible'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default VehiculosOficial