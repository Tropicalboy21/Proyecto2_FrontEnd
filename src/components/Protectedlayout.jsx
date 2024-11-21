import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Navbar from './Ciudadano/NavbarCiudadano';
import Sidebar from './Admin/Sidebar'

const ProtectedLayout = ({ isLoggedIn, onLogout }) => {
   // Redirect to login if not logged in
    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    const isAdminRoute = ['/homeAdmi', '/usuariosAdmi'].some(route =>
        location.pathname.startsWith(route)
    );

    return (
        <div className="protected-layout">
            {isAdminRoute ? (
            <Sidebar onLogout={onLogout} />
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