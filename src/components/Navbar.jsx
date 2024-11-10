import React from "react";
import {Link} from "react-router-dom"
import '../assets/styles/navbar.css'
const Navbar = ({username}) =>{

return(<div>
     <header className="header">
        <div className="logo"></div>
        <nav className="nav">
          <Link to="/home"><button >HOME</button></Link> 
          <Link to="/multas"><button >MULTAS</button></Link>
          <button>VEHICULOS</button>
          <Link to="/disputas"><button >DISPUTAS</button></Link>
        </nav>
        <div className="user-info">Nombre de Usuario</div>
      </header>
</div>);
}

export default Navbar;