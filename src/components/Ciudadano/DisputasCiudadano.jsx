import React, { useState, useEffect } from 'react';
import '../../assets/styles/app.css';
import '../../assets/styles/stylesCiudadanos/multasCiudadano.css';
import ImagenLogo from '../../assets/imgs/logo.png';
import MoptLogo from '../../assets/imgs/mopt.png';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Disputas = () => {
  const [disputes, setDisputes] = useState([]);
  const [error, setError] = useState(null);
  const [expandedDisputeId, setExpandedDisputeId] = useState(null);

  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchDisputes = async () => {
      try {
        const response = await fetch(`https://localhost:7289/api/Disputes?userin=${username}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setDisputes(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      }
    };

    if (username) {
      fetchDisputes();
    }
  }, [username]);

  const toggleExpand = (disputeId) => {
    setExpandedDisputeId(expandedDisputeId === disputeId ? null : disputeId);
  };

  return (
    <div className="view-container">
      <main className="main-content">
        <h1 className="title">Disputas</h1>

        {error ? (
          <p className="error-message">Error: {error}</p>
        ) : disputes.length > 0 ? (
          <div className="lista-multas">
            {disputes.map((dispute) => (
              <div
                className={`m-item ${expandedDisputeId === dispute?.id ? 'expanded' : ''}`}
                key={dispute?.id}
                onClick={() => toggleExpand(dispute?.id)}
              >
                {expandedDisputeId === dispute?.id ? (
                  // Expanded View
                  <div className="wrap">
                    <div className="close">
                      <CloseIcon
                        className="toggle-arrow-up"
                        onClick={() => toggleExpand(dispute?.id)}
                      />
                    </div>

                    <div className="expanded-layout">
                      <h2>Detalles de la Disputa</h2>
                      <div className="logos">
                        <img src={ImagenLogo} alt="Logo" className="imagen1" />
                        <img src={MoptLogo} alt="Mopt" className="imagen2" />
                      </div>
                      <p><strong>ID:</strong> {dispute?.id || 'N/A'}</p>
                      <p>
                        <strong>Fecha de cración:</strong>{' '}
                        {dispute?.createdDate
                          ? new Date(dispute.createdDate).toLocaleDateString()
                          : 'N/A'}
                      </p>
                      <p><strong>Estado: </strong> 
                      {dispute?.isResolved
                            ? `Resuelta`
                            : 'Activa'}
                      </p>
                      {/* <p>
                        <strong>Monto: </strong>{' '}
                        {dispute?.amount
                          ? `₡${dispute.amount.toLocaleString()}`
                          : 'N/A'}
                      </p> */}
                      <p><strong>Razon:</strong> {dispute?.reason || 'N/A'}</p>
                    </div>
                  </div>
                ) : (
                  // Collapsed View
                  <div className="collapsed-layout">
                    <div>ID: {dispute?.id || 'N/A'}</div>
                    <div className="a-item">Fecha: 
                        {dispute?.createdDate
                        ? new Date(dispute.createdDate).toLocaleDateString()
                        : 'N/A'}
                    </div>
                    <div className="f-item">Estado: 
                          {dispute?.isResolved
                            ? `Resuelta`
                            : 'Activa'}
                    </div>
                    <KeyboardArrowDownIcon
                      className={`toggle-arrow ${
                        expandedDisputeId === dispute?.id ? 'rotated' : ''
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No se encontraron disputas.</p>
        )}
      </main>
    </div>
  );
};

export default Disputas;
