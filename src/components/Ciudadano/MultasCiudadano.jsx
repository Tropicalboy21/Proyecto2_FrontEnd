import React, { useState, useEffect } from 'react';
import '../../assets/styles/app.css';
import '../../assets/styles/stylesCiudadanos/multasCiudadano.css';
import ImagenLogo from '../../assets/imgs/logo.png'
import MoptLogo from '../../assets/imgs/mopt.png'
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';

const Multas = () => {
  const [fines, setFines] = useState([]);
  const [error, setError] = useState(null);
  const [expandedFineId, setExpandedFineId] = useState(null);
  const [filter, setFilter] = useState('all'); // Filter state: 'all' or 'active'
  const navigate = useNavigate();


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
        setFines(Array.isArray(data) ? data : []);

      } catch (err) {
        setError(err.message);
      }
    };

    if (username) {
      fetchFines();
    }
  }, [username]);

  // Calculate total balance
  const totalBalance = fines  
    .filter((fine) => fine.estado == false)
    .reduce((sum, fine) => sum + fine.amount, 0);

  // Handle filtering
  const filteredFines = filter === 'active' ? fines.filter((fine) => fine.estado == false) : fines;

  // Function to handle expansion
  const toggleExpand = (fineId) => {
    setExpandedFineId(expandedFineId === fineId ? null : fineId);
  };

  // Function to handle payment
  const handlePay = (fineId, amount) => {
    console.log(`Paying fine with ID: ${fineId} and amount: ${amount}`);
    navigate('/pagoCiudadano', { state: { fineId, amount } });
  };

  // Function to handle dispute
  const handleDispute = (fineId) => {
    console.log(`Disputing fine with ID: ${fineId}`);
    // Add functionality to open a dispute form or call an API
  };

  const getFineStatus = (fine) => {

    console.log(fine.estado);

    if (fine.estado == true) {
      return 'Resuelta'; // Acvtiva
    }
    return 'Activa'; // Pending
  }

  return (
    <div className="view-container">
      <main className="main-content">
        <h1 className="title">Multas</h1>

        {/* Balance Section */}
        <div className="balance-section">
          <p>Saldo Actual: ₡{totalBalance.toLocaleString()}</p>
        </div>

        {/* Filter Section */}
        <div className="filter-section">
          <label htmlFor="filter">Filtrar:</label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-dropdown"
          >
            <option value="all">Todas</option>
            <option value="result">Resueltas</option>
            <option value="active">Activas</option>
          </select>
        </div>

        {error ? (
          <p className="error-message">No se encontraron Multas Registradas</p>
        ) : (
          <div className="lista-multas">
            {filteredFines.length > 0 ? (
              filteredFines.map((fine) => (
                <div
                  className={`m-item ${expandedFineId === fine.id ? 'expanded' : ''}`}
                  key={fine.id}
                  onClick={() => toggleExpand(fine.id)}
                >

                  {expandedFineId === fine.id ? (
                    // Expanded Layout
                    <div className='wrap'>  
                      <div className='close'>                  
                    <CloseIcon 
                    className="toggle-arrow-up" 
                    onClick={() => toggleExpand(fine.id)} 
                  />
                  </div>  
            
                    <div className="expanded-layout">
                    <p className='title'>Detalles de la Multa</p>
                      <div className='logos'>
                      <img src={ImagenLogo} alt="imagelogo" className="imagen1" />
                      <img src={MoptLogo} alt="imagelogo" className="imagen2" />
                      </div>
                      <div className='HeadMulta'>
                        <table>
                          <thead>
                            <tr>
                              <td>ID</td>
                              <td>FECHA</td>
                              <td>HORA</td>
                              <td>ESTADO</td>
                            </tr>
                          </thead>
                          <tbody>
                          <tr>
                              <td>{fine.id}</td>
                              <td>{new Date(fine.issuedDate).toLocaleString('en-US', {
                                  timeZone: 'America/Costa_Rica',
                                  year: 'numeric',
                                  month: '2-digit',
                                  day: '2-digit',
                                  hour12: false,
                                })
                                .replace(',', '')}
                                </td>
                                <td>{new Date(fine.issuedDate).toLocaleString('en-US', {
                                  timeZone: 'America/Costa_Rica',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  second: '2-digit',
                                  hour12: false,
                                })
                                .replace(',', '')}
                                </td>
                              <td>{getFineStatus(fine)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p><strong>Inspector:</strong> {fine.inspector}</p>
                      <p><strong>N° Zona:</strong> {fine.place}</p>
                      <p><strong>Categoria:</strong> {fine.category}</p>
                      <p><strong>Ley de transito:</strong> {fine.article}</p>
                      <p><strong>Conducta</strong></p>
                      <p><i>{fine.conduct}</i></p>
                      <p><strong>Observaciones:</strong> </p>
                      <p>{fine.description}</p>
                      <p><strong>Monto:</strong> ₡{fine.amount.toLocaleString()}</p>
                      <hr />
                        <button
                        className="edit-button"
                        onClick={() => handlePay(fine.id, fine.amount)}
                        disabled={fine.estado == true}
                      >
                        Pagar
                      </button>

                      <button
                        className="edit-button"
                        onClick={() => handleDispute(fine.id)}
                        disabled={fine.estado == true}
                      >
                        Disputar
                      </button>

                      <button className="edit-button" onClick={() => handleDispute(fine.id)}>PDF</button>
    
                      
                    </div>
                    </div>
                    
                  ) : (
                    // Collapsed Layout
                    <div className="collapsed-layout">
                      <div>{fine.id}</div>
                      <div className="d-item">{fine.category}</div>
                      <div className="a-item">₡{fine.amount.toLocaleString()}</div>
                      <div className="f-item">{new Date(fine.issuedDate).toLocaleDateString()}</div>
                      <div className="e-item"><strong>Estado:</strong> {getFineStatus(fine)}</div>
                      <KeyboardArrowDownIcon
                      className={`toggle-arrow ${expandedFineId === fine.id ? 'rotated' : ''}`}
                    />
                    </div>
                  )} 
                </div>
              ))
            ) : (
              <p>No se encontraron multas.</p>
            )}
          </div>
        )} 
      </main>
    </div>
  );
};

export default Multas;
