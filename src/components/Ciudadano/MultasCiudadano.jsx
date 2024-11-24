import React, { useState, useEffect } from 'react';
import '../../assets/styles/app.css';
import '../../assets/styles/stylesCiudadanos/multasCiudadano.css';

const Multas = () => {
  const [fines, setFines] = useState([]);
  const [error, setError] = useState(null);

  const username = localStorage.getItem('username');
  
  useEffect(() => {
    const fetchFines = async () => {
      try {
        
        const response = await fetch(`https://localhost:7289/api/Fines?userin=${username}`, {
          
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
          setFines(data);
        } else {
          setFines([]); 
        }
      } catch (err) {
        setError(err.message);
      }
    };

    
    if (username) {
      fetchFines();
    }
  }, [username]);


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
                  <tr key={fine.id}>
                    <td>{fine.id}</td>
                    <td>{fine.description}</td>
                    <td>₡{fine.amount}</td>
                    <td>{new Date(fine.issuedDate).toLocaleDateString()}</td>
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

}
export default Multas;