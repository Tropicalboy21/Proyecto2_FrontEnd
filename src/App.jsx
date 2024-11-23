import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import HomeCiudadano from './components/Ciudadano/HomeCiudadano';
import ForgotPassword from './components/ForgotPassword';
import Register from './components/Register';
import ResetPassword from './components/ResetPassword'; 
import Footer from './components/Footer';
import MultasCiudadano from './components/Ciudadano/MultasCiudadano';
import ProtectedLayout from './components/ProtectedLayout';
import CodeVerification from './components/CodeVerification';
import CreacionMulta from './components/Oficial/CreacionMulta';
import HomeAdmi from './components/Admin/HomeAdmi';
import UsuariosAdmin from './components/Admin/UsuariosAdmi';
import VehiculosOficial from './components/Oficial/VehiculosOficial';
import DisputasCiudadano from './components/Ciudadano/DisputasCiudadano';
import HomeOficial from './components/Oficial/HomeOficial';
import HomeJuez from './components/Juez/HomeJuez';
import Mapa from  './components/Mapa';
import VehiculosCiudadano from './components/Ciudadano/VehiculosCiudadano';



const App = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLoginSuccess = (user) => {
    setUsername(user);
    setRole(role);
    setIsLoggedIn(true);

  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setRole('');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };

  return (
    <div className='app-container'>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/CodeVerification" element={<CodeVerification username={username} onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/creacionMulta" element={<CreacionMulta/>} />

          {/* Protected Routes */}
          <Route element={<ProtectedLayout isLoggedIn={isLoggedIn} onLogout={handleLogout} />}>
            <Route path="/homeCiudadano" element={<HomeCiudadano username={username} />} />
            <Route path="/homeAdmi" element={<HomeAdmi username={username} />} />
            <Route path="/usuariosAdmi" element={<UsuariosAdmin/>} />
            <Route path="/multasCiudadano" element={<MultasCiudadano username={username} />} />
  
            <Route path="/vehiculosOficial" element={<VehiculosOficial />} />
            <Route path="/vehiculosCiudadano" element={<VehiculosCiudadano />} />
            <Route path="/disputasCiudadano" element={<DisputasCiudadano />} />
            <Route path="/homeOficial" element={<HomeOficial />} />
            <Route path="/homeJuez" element={<HomeJuez />} />
            <Route path="/mapa" element={<Mapa />} />
          </Route>

          {/* Catch-all Route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
      <Footer></Footer>
    </div>
  );
};

export default App;
