import React from 'react';
import '../assets/styles/home.css';
import PersonIcon from '@mui/icons-material/Person';

function HomeAdmi() {
    return (
        <div className="view-container" >
            <div className='dashboard'>
                <h1 className='saludo'>Bienvenido Admin</h1>
                <div className='row'>
                    <div className='box-component'></div>
                    <div className='box-component'>
                        <div className='component-head'>
                            <h2>Usuarios internos</h2>
                            <span className='circle'><PersonIcon fontSize="medium" sx={{ color: 'black' }} /></span>
                        </div>
                        <p className='number'>11</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='box-component2'></div>
                </div>
            </div>
        </div>
    );
}

export default HomeAdmi;