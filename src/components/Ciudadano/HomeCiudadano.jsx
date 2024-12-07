import React from 'react';
import '../../assets/styles/stylesCiudadanos/homeCiudadano.css';
import Banner from '../../assets/imgs/banner-home.avif'

function Home() {
    return (
        <div className="home">
            <header className="Navbar">
            </header>
            <main className="content">
                <div className='sct-home'>
                <div className='sct-txt'>    
                <h1 className='title-home'>¡Bienvenido a Tránsito Inteligente!</h1>
                <p className='txt'>
                    Nuestro objetivo es facilitar el pago y gestion de multas de transito 
                    para tanto ciudadanos como para oficiales de transito
                    facilitando  asi el proceso de una manera mas rapilla y sencilla.
                </p>
                </div>
                <div className='sct-txt'>
                <h1>¿Por qué pagar tus multas a tiempo?</h1>
                <ul>
                    <p>Evita recargos y multas adicionales.</p>
                    <p>Mantén tu historial de conducción limpio.</p>
                    <p>Contribuye a la seguridad vial.</p>
                </ul>
                </div>
            </div>
            </main>
        </div>
    );
}

export default Home;