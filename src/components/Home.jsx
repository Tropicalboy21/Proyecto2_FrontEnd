import React from 'react';
import '../App.css';
import ImageProfile from '../assets/imgs/imagen-perfil.jpg'
import { useNavigate } from 'react-router-dom';

const Home = ({ username }) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any user data if needed (e.g., localStorage, session storage)
    // localStorage.removeItem('user');
    
    // Navigate to the login page
    navigate('/login');
  };

  return (
    <div className='home'>
      <h2>Inicio</h2>
      <img src={ImageProfile} alt="profile" className='estilo-profile' />
      <div className='Buttons'>
      <button onClick={handleLogout} className='iniciar'>cerrar Sesion</button>
      </div>
      <h1>Bienvenido, {username}!</h1>
      <div className='multas'>      
        <h3>Multas</h3>
      </div>
    </div>
  );
};

export default Home;