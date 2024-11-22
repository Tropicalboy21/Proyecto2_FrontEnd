import React, { useState, useEffect } from 'react';
import '../assets/styles/app.css';
import '../assets/styles/stylesCiudadanos/multasCiudadano.css';


import HeatMap from '../components/HeatMap'

const Mapa = () => {

    return (
        <div className="view-container">
            <main className="main-content">
            <h1 className="title">Mapa</h1>
                <HeatMap/>
            </main>
        </div>
    );
}

export default Mapa;