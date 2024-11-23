import React, { useState } from 'react';
import '../../assets/styles/stylesAdmin/usuarios.css'
import Alert from '../Alert'

const UsuariosAdmi = () => {
    const [username, setUserName] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [Iddocument, setIdDocument] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [showAlert, setShowAlert] = useState(false); 
    const [alertType, setAlertType] = useState(''); 
    const [alertMessage, setAlertMessage] = useState('');
    // const [isChecked, setIsChecked] = useState(false);
    const [activeTab, setActiveTab] = useState("Registrar");

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
  
    // const handleCheckboxChange = (event) => {
    //     setIsChecked(event.target.checked);
    // };

    const renderContent = () => {
        switch (activeTab) {
          case "Registrar":
            return <div className='tab-content'>
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
                  id="userRadio"
                  value="User"
                  checked={role === "User"}
                  onChange={(e) => setRole(e.target.value)}
                  name="optradio"
                />
                <label htmlFor="userRadio" className={`radio-inline ${role === "User" ? "selected" : ""}`}>
                  Usuario
                </label>
                
                <input 
                  type="radio"
                  id="officialRadio"
                  value="Officer"
                  checked={role === "Officer"}
                  onChange={(e) => setRole(e.target.value)}
                  name="optradio"
                />
                <label htmlFor="officialRadio" className={`radio-inline ${role === "Official" ? "selected" : ""}`}>
                  Official
                </label>
                
                <input 
                  type="radio"
                  id="judgeRadio"
                  value="Judge"
                  checked={role === "Judge"}
                  onChange={(e) => setRole(e.target.value)}
                  name="optradio"
                />
                <label htmlFor="judgeRadio" className={`radio-inline ${role === "Judge" ? "selected" : ""}`}>
                  Juez
                </label>
                </div>
                <div className='Buttons'>
                    <button className='iniciar crear' type="submit">Crear</button>
                </div>
            </form></div>;
          case "Usuarios":    
            return <div className='tab-content'>
              <table>
                <thead>
                  <tr>
                    <td>Nombre</td>
                    <td>Apellido</td>
                    <td>Usuario</td>
                    <td>Cedula</td>
                    <td>Correo</td>
                    <td>Rol</td>
                    <td>Estado</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>;
          default:
            return null;
        }
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
                      <a className={`tab ${activeTab === "Registrar" ? "active" : ""}`} onClick={() => setActiveTab("Registrar")}>Registrar</a>
                      <a className={`tab ${activeTab === "Usuarios" ? "active" : ""}`} onClick={() => setActiveTab("Usuarios")}>Usuarios</a>
                    </div>
                    <div className="tab-content">{renderContent()}</div>
                </div>
            </div>
        </div>
    )
}

export default UsuariosAdmi;


