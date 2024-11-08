import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Navbar from './Navbar';

const ProtectedLayout = ({ isLoggedIn, onLogout }) => {
   // Redirect to login if not logged in
    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <Navbar onLogout={onLogout} />
            <Outlet /> {/* Render the child routes here */}
        </>
    );
};

export default ProtectedLayout;