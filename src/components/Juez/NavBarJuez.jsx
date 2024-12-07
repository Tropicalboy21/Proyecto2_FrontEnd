import React,  {useState} from "react";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import "../../assets/styles/stylesCiudadanos/navbarCiudadano.css";

const NavBarJuez = ({ username, onLogout }) => {
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
      <nav  className={`nav ${menuOpen ? "open" : ""}`}>
        <Link to="/homeJuez">
          <button className="nav-button">Inicio</button>
        </Link>
        <Link to="/MultasJuez">
          <button className="nav-button">Multas</button>
        </Link>
        <Link to="/disputasJuez">
          <button className="nav-button">Disputas</button>
        </Link>
        <Link to="/reglamentoJuez">
          <button className="nav-button">Reglamentos</button>
        </Link>
        <Link to="/cuentaJuez">
          <button className="nav-button">Cuenta</button>
        </Link>
        <button className="nav-button" onClick={onLogout}>Salir</button>
      </nav>

    </header>
  );
}

export default NavBarJuez;