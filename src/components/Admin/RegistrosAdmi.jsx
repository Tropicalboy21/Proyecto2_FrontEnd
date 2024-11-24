import React, { useState, useEffect } from 'react';
import '../../assets/styles/stylesAdmin/registrosAdmi.css'
import Alert from '../Alert'

const RegistrosAdmi = () => {
    
    const [showAlert, setShowAlert] = useState(false); 
    const [alertType, setAlertType] = useState(''); 
    const [alertMessage, setAlertMessage] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('https://localhost:7289/api/Auth/InternalRegister', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userName: username,
            email: email,
            password: password,
            firstName: firstname,
            lastName: lastname,
            idDocument: Iddocument,
            role: role 
          }),
        });
  
        if (!response.ok) {
          setAlertMessage('No se pudo registrar el usuario');
          setAlertType('error');
        }
        setAlertMessage('¡Usuario registrado con exito!');
        setAlertType('success');
        setShowAlert(true);

        setUserName('');
        setFirstName('');
        setLastName('');
        setIdDocument('');
        setEmail('');
        setPassword('');
        setRole('');
        
      } catch (error) {
        if(error.message == 'Failed to fetch'){
          setAlertMessage('Lo sentimos, error en la conexión');
          setAlertType('error');
        } else {
          setAlertMessage(error.message);
          setAlertType('error');
        }
        setShowAlert(true);
      }
    }
  
    const handleCloseAlert = () => {
      setShowAlert(false);
      setAlertMessage('');
    };

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          
          const response = await fetch('https://localhost:7289/api/Auth/GetAllUsers', {
            
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
            setUsers(data);
          } else {
            setUsers([]); 
          }
        } catch (err) {
          setError(err.message);
        }
      };

        fetchUsers();
    });

    
return (
        <div className="view-container" >
            {showAlert && (
                <Alert 
                type={alertType} 
                message={alertMessage} 
                onClose={handleCloseAlert}/>
            )}
            <div className='view-port'>
                <div className='register-sct'>
                <h2 className='title'>Registros</h2>
                </div>
            </div>
        </div>
    )
}

export default RegistrosAdmi;


