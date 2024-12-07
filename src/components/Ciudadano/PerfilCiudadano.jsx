import React, { useState, useEffect } from 'react';
import '../../assets/styles/app.css';
import '../../assets/styles/stylesCiudadanos/perfilCiudadano.css';
import ImagenLogo from '../../assets/imgs/logo.png';
import MoptLogo from '../../assets/imgs/mopt.png';
import { useNavigate } from 'react-router-dom';

const PerfilCiudadano = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    // Obtiene el nombre de usuario del localStorage
    const username = localStorage.getItem('username');
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await 
                fetch(`https://localhost:7289/api/Auth/GetProfile/profile?userin=$
                {username}`, {
                        method: 'GET',
                        headers: {
                    'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                setProfile(data);
                } catch (err) {
                setError(err.message);
                }
            };
            if (username) {
                fetchUserProfile();
            }
        }, [username]);

    // Función para editar el perfil
    const handleEditProfile = () => {
        console.log('Redirigiendo a la página de edición de perfil');
        navigate('/editarPerfil', { state: { profile } });
    };
    return (
        <div className="view-container">
        <main className="main-content">
            <h1 className="title">Perfil del Ciudadano</h1>
            {error ? (
            <p className="error-message">Error: {error}</p>
            ) : profile ? (
            <div className="profile-section">
                <div className="profile-header">
                <img src={ImagenLogo} alt="Logo" className="imagen1" />
                <img src={MoptLogo} alt="MOPT Logo" className="imagen2"/>
                </div>
                <div className="profile-info">
                <p><strong>Nombre:</strong> {profile.firstName} 
                {profile.lastName}</p>
                <p><strong>Cédula:</strong> {profile.idDocument}</p>
                <div className="profile-pictures">
                    <div className="profile-image">
                    <p><strong>Foto de Perfil:</strong></p>
                    {profile.profilePicture ? (
                        <img
                        src={`data:image/png;base64,$
    {profile.profilePicture}`}
                        alt="Foto de Perfil"
                        className="profile-picture"
                        />
                    ) : (
                        <p>No se ha cargado una foto de perfil.</p>
                    )}
                    </div>
                    <div className="document-image">
                    <p><strong>Foto de Documento:</strong></p>
                    {profile.documentPicture ? (
                        <img
                        src={`data:image/png;base64,$
    {profile.documentPicture}`}
                        alt="Foto de Documento"
                        className="document-picture"
                        />
                    ) : (
                        <p>No se ha cargado una foto de documento.</p>
                    )}
                    </div>
                </div>
                </div>
            </div>
            ) : (
            <p>Cargando información del perfil...</p>
            )}
        </main>
        </div>
    );
};

export default PerfilCiudadano;