import React from "react";
import { Link } from "react-router-dom";
import '../../assets/styles/stylesCiudadanos/navbarCiudadano.css';

const Navbar = ({ username, onLogout }) => {
  return (
    <header className="header">
      <div className="logo"> </div>
      <nav className="nav">
        <Link to="/home">
          <button className="nav-button">INICIO</button>
        </Link>
        <Link to="/multas">
          <button className="nav-button">MULTAS</button>
        </Link>
        <Link to="/vehiculos">
          <button className="nav-button">VEHICULOS</button>
        </Link>
        <Link to="/disputas">
          <button className="nav-button">DISPUTAS</button>
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

export default Navbar;