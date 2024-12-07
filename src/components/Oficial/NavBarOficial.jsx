import React,  {useState} from "react";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import "../../assets/styles/stylesCiudadanos/navbarCiudadano.css";

const NavBarOficial = ({ username, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="logo"> </div>
      <button className="hamburger" onClick={toggleMenu}>
      {menuOpen ? <CloseIcon sx={{ color: "white" }} /> : <MenuIcon sx={{ color: "white" }} />}
      </button>
      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <Link to="/homeOficial">
          <button className="nav-button">Inicio</button>
        </Link>
        <Link to="/multasOficial">
          <button className="nav-button">Multas</button>
        </Link>
        <Link to="/vehiculosOficial">
          <button className="nav-button">Vehiculos</button>
        </Link>
        <Link to="/mapa">
          <button className="nav-button">Mapa</button>
        </Link>
        <Link to="/cuentaOficial">
          <button className="nav-button">Cuenta</button>
        </Link>
        <button className="nav-button" onClick={onLogout}>Salir</button>
      </nav>

    </header>
  );
}

export default NavBarOficial;