import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/stylesAdmin/sidebar.css'; 
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import FolderIcon from '@mui/icons-material/Folder';
import SettingsIcon from '@mui/icons-material/Settings';
import GavelIcon from '@mui/icons-material/Gavel';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Sidebar = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Hamburger Button */}
      <button className="hamburger-button" onClick={toggleSidebar}>
        {isOpen ? <CloseIcon sx={{ color: 'white' }} /> : <MenuIcon sx={{ color: 'black' }} />}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="contenido">
          <div className="logo"></div>
          <h2>Perfil de Administrador</h2>
          <ul>
            <li>
              <HomeIcon fontSize="small" sx={{ color: 'white' }} />
              <Link to="/homeAdmi">Inicio</Link>
            </li>
            <li>
              <PersonIcon fontSize="small" sx={{ color: 'white' }} />
              <Link to="/usuariosAdmi">Usuarios</Link>
            </li>
            {/* <li>
              <FolderIcon fontSize="small" sx={{ color: 'white' }} />
              <Link to="/registrosAdmi">Registros</Link>
            </li>
            <li>
              <GavelIcon fontSize="small" sx={{ color: 'white' }} />
              <Link to="/disputasAdmi">Disputas</Link>
            </li> */}
            <li>
              <SettingsIcon fontSize="small" sx={{ color: 'white' }} />
              <Link to="/cuentaAdmi">Cuenta</Link>
            </li>
            <li>
              <button className="logout-button" onClick={onLogout}>
                Salir
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;