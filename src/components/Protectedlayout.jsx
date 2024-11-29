import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Navbar from './Ciudadano/NavbarCiudadano';
import Sidebar from './Admin/Sidebar';
import NavbarOficial from './Oficial/NavbarOficial';
import NavbarJuez from './Juez/NavBarJuez';

const ProtectedLayout = ({ isLoggedIn, onLogout }) => {
   // Redirect to login if not logged in
    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    const isAdminRoute = ['/homeAdmi', '/usuariosAdmi', '/registrosAdmi', '/cuentaAdmi'].some(route =>
        location.pathname.startsWith(route)
    );

    const isOficialRoute = ['/homeOficial', '/creacionMulta', '/oficialMulta'].some(route =>
        location.pathname.startsWith(route)
    );

    const isJuezRoute = ['/homeJuez'].some(route =>
        location.pathname.startsWith(route)
    );


    return (
        <div className="protected-layout">
            {isAdminRoute ? (
            <Sidebar onLogout={onLogout} />
            ) : isOficialRoute? (
            <NavbarOficial onLogout={onLogout} />
            ) : isJuezRoute? (
                <NavbarJuez onLogout={onLogout} />
            ) : (
            <Navbar onLogout={onLogout} />
        )}
        <main>
            <Outlet />
        </main>
        </div>
    );
};

export default ProtectedLayout;