import React, { useState, useEffect } from 'react';
import '../App.css';
import '../assets/styles/multas.css';

const Multas = ({ email }) => {
  const [fines, setFines] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFines = async () => {
      try {
        
        const response = await fetch(`http://localhost:7289/api/fines/${email}`);
        
        
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        
        const data = await response.json();

       
        if (Array.isArray(data) && data.length > 0) {
          setFines(data); 
        } else {
          setFines([]);  
        }
      } catch (err) {
        setError(err.message); 
      }
    };

    
    if (email) {
      fetchFines();
    }
  }, [email]); 

  return (
    <div className="view-container">
      <main className="main-content">
        <h1 className="title">Multas</h1>

        
        {error ? (
          <p className="error-message">Error al cargar las multas: {error}</p>
        ) : (
          <table className="fines-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Razón</th>
                <th>Monto</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              
              {fines.length > 0 ? (
                fines.map((fine) => (
                  <tr key={fine.Id}>
                    <td>{fine.Id}</td>
                    <td>{fine.Description}</td>
                    <td>${fine.Amount}</td>
                    <td>{new Date(fine.IssuedDate).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No se encontraron multas.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        <div className="Buttons">
          <button className="iniciar login">Disputar multa</button>
        </div>
      </main>
    </div>
  );
};

export default Multas;