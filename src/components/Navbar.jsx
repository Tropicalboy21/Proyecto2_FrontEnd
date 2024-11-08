import React from "react";
const Navbar = ({username}) =>{

return(<div>
     <header className="header">
        <div className="logo">LOGO</div>
        <nav className="nav">
          <button>MULTAS</button>
          <button>VEHICULOS</button>
          <button>DISPUTAS</button>
        </nav>
        <div className="user-info">Nombre de Usuario</div>
      </header>
</div>);
}

export default Navbar;