import React, { useState } from 'react';
import '../../assets/styles/usuarios.css';

const UsuariosAdmi = () => {
    const [username, setUserName] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [Iddocument, setIdDocument] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false); 
    const [alertType, setAlertType] = useState(''); 
    const [alertMessage, setAlertMessage] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    const handleRegister = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('https://localhost:7289/api/Auth/Register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            UserName: username,
            Email: email,
            Password: password,
            FirstName: firstname,
            LastName: lastname,
            IdDocument: Iddocument, 
          }),
        });
  
        if (!response.ok) {
          setAlertMessage('No se pudo registrar el usuario');
          setAlertType('error');
        }
        setAlertMessage('¡Usuario registrado con exito!');
        setAlertType('success');
        setShowAlert(true);
        
        setTimeout(() => {
          navigate('/Login');
        }, 2000);
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
  
    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };



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
                    <div className='component-head'>
                        <a href="">Registrar</a>
                        <a href="">Usuarios</a>
                    </div>
                    <div className='tab-content'>
                        <div className='imagen'></div>
                        <form onSubmit={handleRegister}  className='pa'>
                            <h2 className='title'>Crear nuevo usuario</h2>
                            <div className='Inputs'>
                                <input
                                type="text"
                                placeholder='Nombre'
                                value={firstname}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                />
                                <input
                                type="text"
                                placeholder='Apellido'
                                value={lastname}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                />
                                <input
                                type="text"
                                placeholder='Usuario'
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                                />
                                <input
                                type="text"
                                placeholder='Cédula'
                                value={Iddocument}
                                onChange={(e) => setIdDocument(e.target.value)}
                                required
                                />
                                <input
                                type="email"
                                placeholder='Correo electrónico'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                />
                                <input
                                type="password"
                                placeholder='Contraseña'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                />
                            </div>
                            <h3>Seleccionar rol</h3>
                            <div className='select'>
                                <input 
                                    type="radio"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange} 
                                    name="optradio"/>
                                <label className="radio-inline">Usuario</label>
                                <input                                     
                                    type="radio"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange} 
                                    name="optradio"/>
                                <label className="radio-inline">Official</label>
                                <input
                                    type="radio"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}                                  
                                    name="optradio"
                                />
                                <label className="radio-inline">Juez</label>
                            </div>
                            <div className='Buttons'>
                                <button className='iniciar crear' type="submit">Crear</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UsuariosAdmi;


