import React, { useState } from 'react';
import axios from 'axios';
import '../assets/styles/vehiculos.css';


const Vehiculos = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [resultText, setResultText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Manejar cambio de archivo
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setResultText(''); // Limpia el resultado previo
    setError(null); // Limpia errores previos
  };

  // Enviar archivo al backend
  const handleSubmit = async (e) => {
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
      const response = await axios.post('https://localhost:7289/api/lecturaplaca', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResultText(response.data); 
    } catch (err) {
      setError('Error al procesar la imagen. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Lectura de Placas</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
          style={{ marginBottom: '10px', display: 'block' }}
        />
        <button type="submit" disabled={loading} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          {loading ? 'Procesando...' : 'Subir y Leer Placa'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {resultText && (
        <div>
          <h2>Numero de Placa:</h2>
          <p style={{ whiteSpace: 'pre-wrap', backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '5px' }}>
            {resultText}
          </p>
        </div>
      )}
    </div>
  );
};

export default Vehiculos;
