import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar'

const ProtectedLayout = ({ isLoggedIn, onLogout }) => {
   // Redirect to login if not logged in
    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    const isAdminRoute = location.pathname.startsWith('/homeAdmi');

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