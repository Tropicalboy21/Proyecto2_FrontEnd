import React from 'react';
import '../assets/styles/home.css'; 

function Home() {
    return (
        <div className="home">
            <header className="Navbar">
            </header>
            <main className="content">
                <div className="intro">
                    <h1>¡Bienvenido a Transito Inteligente!</h1>
                    <p>Nuestro objetivo es facilitar el pago y gestion de multas de transito 
                      para tanto ciudadanos como para oficiales de transito
                      facilitando  asi el proceso de una manera mas rapilla y sencilla.</p>
                    <button className="more-info">Mas Informacion</button>
                </div>
                <section className="intro">
                <h1>¿Por qué pagar tus multas a tiempo?</h1>
                <ul>
                    <p>Evita recargos y multas adicionales.</p>
                    <p>Mantén tu historial de conducción limpio.</p>
                    <p>Contribuye a la seguridad vial.</p>
                </ul>
            </section>
                <div className="illustration">
                </div>
            </main>
        </div>
    );
}

export default Home;