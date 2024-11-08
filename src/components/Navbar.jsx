import React from "react";
import {Link} from "react-router-dom"
import '../assets/styles/navbar.css'
const Navbar = ({username}) =>{

return(<div>
     <header className="header">
        <div className="logo">LOGO</div>
        <nav className="nav">
          <Link to="/multas"><button >MULTAS</button></Link>
          <button>VEHICULOS</button>
          <button>DISPUTAS</button>
        </nav>
        <div className="user-info">Nombre de Usuario</div>
      </header>
</div>);
}

export default Navbar;