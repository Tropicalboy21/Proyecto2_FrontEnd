import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword';
import Register from './components/Register';
import ResetPassword from './components/ResetPassword'; 
import Footer from './components/Footer';
import Multas from './components/Multas';
import Navbar from'./components/Navbar';
import ProtectedLayout from './components/ProtectedLayout';
import CodeVerification from './components/CodeVerification';
import CreacionMulta from './components/CreacionMulta';
import HomeAdmi from './components/HomeAdmi'
import Vehiculos from './components/Vehiculos';

const App = () => {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  const handleLoginSuccess = (user) => {
    setUsername(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <div className='app-container'>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/CodeVerification" element={<CodeVerification onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected Routes */}
          <Route element={<ProtectedLayout isLoggedIn={isLoggedIn} onLogout={handleLogout} />}>
            <Route path="/home" element={<Home username={username} />} />
            <Route path="/homeAdmi" element={<HomeAdmi username={username} />} />
            <Route path="/multas" element={<Multas />} />
            <Route path="/creacionMulta" element={<CreacionMulta/>} />
            <Route path="/vehiculos" element={<Vehiculos />} />
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
