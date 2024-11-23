import '../../assets/styles/stylesCiudadanos/vehiculosCiudadano.css';
import React, { useState } from "react";
import axios from "axios";

const VehiculosCiudadano = () => {
  const [registro, setRegistro] = useState({
    NumeroMotor: "",
    CantidadPuertas: "",
    Color: "",
    NumeroPlaca: "",
    TipoVehiculo: "",
  });

  const [registroErrores, setRegistroErrores] = useState({});
  const [consulta, setConsulta] = useState("");
  const [consultaError, setConsultaError] = useState("");
  const [vehiculoInfo, setVehiculoInfo] = useState(null);

  // Estados para la alerta
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

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
      await axios.post(
        "https://localhost:7289/api/Vehiculos",
        registro
      );
      setAlertType('success');
      setAlertMessage('Vehículo registrado exitosamente');
      setShowAlert(true);
      setRegistro({
        NumeroMotor: "",
        CantidadPuertas: "",
        Color: "",
        NumeroPlaca: "",
        TipoVehiculo: "",
      });
      setRegistroErrores({});
    } catch (error) {
      setAlertType('error');
      setAlertMessage('Error: Vehículo no registrado');
      setShowAlert(true);
    }
  };

  const handleConsultar = async (e) => {
    e.preventDefault();
  
    if (!consulta) {
      setConsultaError("Favor llenar este campo");
      return;
    }
  
    try {
      const response = await axios.get(
        `https://localhost:7289/api/Vehiculos/${consulta}`
      );
  
      // Validamos si la respuesta contiene datos
      if (response.data && Object.keys(response.data).length > 0) {
        setVehiculoInfo(response.data); // Asignamos los datos al estado
        setConsultaError("");
        setAlertType('success');
        setAlertMessage('Vehículo encontrado');
        setShowAlert(true);
      } else {
        throw new Error("Vehículo no encontrado");
      }
    } catch (error) {
      console.error("Error en la consulta:", error);
      setVehiculoInfo(null); // Limpiamos la información previa
      setAlertType('error');
      setAlertMessage('Vehículo no encontrado');
      setShowAlert(true);
    }
  };
  

  return (
    <div className="container">
      {/* Alerta */}
      {showAlert && (
        <>
          <div className="overlay" onClick={() => setShowAlert(false)}></div>
          <div className={`alert-container`}>
            <div className={`alert-box alert-${alertType}`}>
              <div className={`icon icon-${alertType}`}></div>
              <p>{alertMessage}</p>
              <button onClick={() => setShowAlert(false)}>Cerrar</button>
            </div>
          </div>
        </>
      )}

      {/* Columna de Registro */}
      <div className="cardRegistro">
        <h2>Registrar Vehículo</h2>
        <form onSubmit={handleRegistrar}>
          <label>Número de Motor</label>
          <input
            type="text"
            name="NumeroMotor"
            value={registro.NumeroMotor}
            onChange={handleChangeRegistro}
          />
          {registroErrores.NumeroMotor && (
            <p className="error-text">{registroErrores.NumeroMotor}</p>
          )}
          <label>Cantidad de Puertas</label>
          <input
            type="number"
            name="CantidadPuertas"
            value={registro.CantidadPuertas}
            onChange={handleChangeRegistro}
          />
          {registroErrores.CantidadPuertas && (
            <p className="error-text">{registroErrores.CantidadPuertas}</p>
          )}
          <label>Color</label>
          <input
            type="text"
            name="Color"
            value={registro.Color}
            onChange={handleChangeRegistro}
          />
          {registroErrores.Color && (
            <p className="error-text">{registroErrores.Color}</p>
          )}
          <label>Número de Placa</label>
          <input
            type="text"
            name="NumeroPlaca"
            value={registro.NumeroPlaca}
            onChange={handleChangeRegistro}
          />
          {registroErrores.NumeroPlaca && (
            <p className="error-text">{registroErrores.NumeroPlaca}</p>
          )}
          <label>Tipo de Vehículo</label>
          <input
            type="text"
            name="TipoVehiculo"
            value={registro.TipoVehiculo}
            onChange={handleChangeRegistro}
          />
          {registroErrores.TipoVehiculo && (
            <p className="error-text">{registroErrores.TipoVehiculo}</p>
          )}
          <button type="submit">Registrar</button>
        </form>
      </div>

      {/* Columna de Consulta */}
      <div className="cardConsulta">
        <h2>Consultar Vehículo</h2>
        <form onSubmit={handleConsultar}>
          <label>Número de Placa</label>
          <input
            type="text"
            value={consulta}
            onChange={(e) => {
              setConsulta(e.target.value);
              setConsultaError("");
            }}
          />
          {consultaError && <p className="error-text">{consultaError}</p>}
          <button type="submit">Consultar</button>
        </form>
        {vehiculoInfo && (
          <div className="wrapper">
            <h3>Información del Vehículo</h3>
            <p><strong>Número de Motor:</strong> {vehiculoInfo.numeroMotor || "No disponible"}</p>
            <p><strong>Cantidad de Puertas:</strong> {vehiculoInfo.cantidadPuertas || "No disponible"}</p>
            <p><strong>Color:</strong> {vehiculoInfo.color || "No disponible"}</p>
            <p><strong>Número de Placa:</strong> {vehiculoInfo.numeroPlaca || "No disponible"}</p>
            <p><strong>Tipo de Vehículo:</strong> {vehiculoInfo.tipoVehiculo || "No disponible"}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehiculosCiudadano;
