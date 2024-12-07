import React, { useState, useEffect } from 'react';
import '../../assets/styles/app.css';
import '../../assets/styles/stylesCiudadanos/perfilCiudadano.css';
import ImagenLogo from '../../assets/imgs/logo.png';
import MoptLogo from '../../assets/imgs/mopt.png';
import { useNavigate } from 'react-router-dom';
import profileImg from '../../assets/imgs/progile_img.webp'

const CuentaJuez = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    // Obtiene el nombre de usuario del localStorage

    const username = localStorage.getItem('username');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await 
                fetch(`https://localhost:7289/api/Auth/GetProfile/profile?userin=${username}`, {
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
        <div className='cuenta-sct'>
        {error ? (
            <p className="error-message">Error: {error}</p>
            ) : profile ? (
                <><h2 className='title'>Cuenta</h2><div className='box-sct'>
                    <div className='content-wrapper'>
                        <div className='component-wrapper'>
                            <div className='profile-pic'>{profile.profilePicture ? (
                                <img src={`data:image/png;base64,${profile.profilePicture}`}
                                alt="Foto de Perfil"
                                className="profile-picture"/>
                                ) : (
                                    <img src={profileImg} alt=""/>

                                )}
                                    </div>
                                <div className='profile-info'>
                                    <h3>Usuario</h3>
                                    <p>rol</p>
                                </div>
                                </div>
                                <div><button className='edit-button'>edit</button></div>
                            </div>
                        </div><div className='box-sct'>
                                <div className='content-wrapper'>
                                    <div className='profile-info'>
                                        <h3>Nombre</h3>
                                        <p>{profile.firstName}</p>
                                        <h3>Correo</h3>
                                        <p>{profile.email}</p>
                                    </div>
                                    <div className='profile-info'>
                                        <h3>Apellido</h3>
                                        <p>{profile.lastName}</p>
                                        <h3>Cedula</h3>
                                        <p>{profile.idDocument}</p>
                                    </div>
                                    <div><button className='edit-button'>edit</button></div>
                                </div>
                            </div></>) : (
                        <p>Cargando información del perfil...</p>
                        )}
                </div>
        </div>
    );
};

export default CuentaJuez;