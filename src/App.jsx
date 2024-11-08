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

const App = () => {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      {isLoggedIn && <Navbar onLogout={handleLogout} />} 
        <Routes>
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/home" element={isLoggedIn ? <Home username={username} /> : <Navigate to="/login" />} />
          <Route path="/multas" element = {<Multas/>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} /> {}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
      <Footer></Footer>
    </div>
  );
};

export default App;
