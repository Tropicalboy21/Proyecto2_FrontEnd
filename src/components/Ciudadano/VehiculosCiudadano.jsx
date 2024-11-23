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

  const [consulta, setConsulta] = useState("");
  const [vehiculoInfo, setVehiculoInfo] = useState(null);

  const handleChangeRegistro = (e) => {
    const { name, value } = e.target;
    setRegistro({ ...registro, [name]: value });
  };

  const handleRegistrar = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7289/api/Vehiculos",
        registro
      );
      alert("Vehículo registrado con éxito");
      setRegistro({
        NumeroMotor: "",
        CantidadPuertas: "",
        Color: "",
        NumeroPlaca: "",
        TipoVehiculo: "",
      });
    } catch (error) {
      console.error(error);
      alert("Hubo un error al registrar el vehículo");
    }
  };

  const handleConsultar = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://localhost:7289/api/Vehiculos/${consulta}`
      );
      console.log("Respuesta del servidor:", response.data); // Depuración
      setVehiculoInfo(response.data);
    } catch (error) {
      console.error("Error en la consulta:", error);
      alert("Vehículo no encontrado");
    }
  };
  

  return (
    <div className="container">
      {/* Columna de Registro */}
      <div className="card">
        <h2>Registrar Vehículo</h2>
        <form onSubmit={handleRegistrar}>
          <label>Número de Motor</label>
          <input
            type="text"
            name="NumeroMotor"
            value={registro.NumeroMotor}
            onChange={handleChangeRegistro}
            required
          />
          <label>Cantidad de Puertas</label>
          <input
            type="number"
            name="CantidadPuertas"
            value={registro.CantidadPuertas}
            onChange={handleChangeRegistro}
            required
          />
          <label>Color</label>
          <input
            type="text"
            name="Color"
            value={registro.Color}
            onChange={handleChangeRegistro}
            required
          />
          <label>Número de Placa</label>
          <input
            type="text"
            name="NumeroPlaca"
            value={registro.NumeroPlaca}
            onChange={handleChangeRegistro}
            required
          />
          <label>Tipo de Vehículo</label>
          <input
            type="text"
            name="TipoVehiculo"
            value={registro.TipoVehiculo}
            onChange={handleChangeRegistro}
            required
          />
          <button type="submit">Registrar</button>
        </form>
      </div>

      {/* Columna de Consulta */}
      <div className="card">
        <h2>Consultar Vehículo</h2>
        <form onSubmit={handleConsultar}>
          <label>Número de Placa</label>
          <input
            type="text"
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            required
          />
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
