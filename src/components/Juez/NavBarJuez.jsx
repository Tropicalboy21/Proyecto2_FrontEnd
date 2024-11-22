import React from "react";
import { Link } from "react-router-dom";
import '../../assets/styles/stylesJuez/navbarJuez.css';

const NavBarJuez = ({ username, onLogout }) => {
  return (
    <header className="header">
      <div className="logo"> </div>
      <nav className="navBarJuez">
        <Link to="/homeJuez">
          <button className="nav-button">Prueba</button>
        </Link>
        <Link to="/multas">
          <button className="nav-button">Registrar MULTAS</button>
        </Link>
        <Link to="/vehiculos">
          <button className="nav-button">VEHICULOS</button>
        </Link>
        <Link to="/disputas">
          <button className="nav-button">Reglamentos</button>
        </Link>
        <Link to="/notificaciones">
          <button className="nav-button">Notificaciones</button>
        </Link>
        {/* <Link to="/historial">
          <button className="nav-button">HISTORIAL</button>
        </Link>
        <Link to="/mapa">
          <button className="nav-button">MAPA</button>
        </Link> */}
      </nav>
      <button className="nav-button" onClick={onLogout}>Salir</button>

    </header>
  );
}

export default NavBarJuez;