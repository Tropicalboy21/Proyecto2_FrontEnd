
import '../assets/styles/navbaroficial.css'; 
import '../assets/styles/app.css'; 
import React, { useState, useEffect } from 'react';

const images = [
    'src/assets/imgs/img1.jpg',
    'src/assets/imgs/img2.jpg',
    'src/assets/imgs/img3.png',
    'src/assets/imgs/img4.png',

];

function Juez() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="home">
            <header className="NavBarOficial"></header>
            <main className="content">
                <div className="intro">
                    <h1>¡Bienvenido Juez!</h1>

                    <div className="carousel-container">
                        <div className="carousel">
                            {images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Slide ${index + 1}`}
                                    className={`carousel-image ${currentIndex === index ? 'active' : ''}`}
                                />
                            ))}
                        </div>
                        <div className="indicators">
                            {images.map((_, index) => (
                                <span
                                    key={index}
                                    className={`indicator ${currentIndex === index ? 'active' : ''}`}
                                ></span>
                            ))}
                        </div>
                    </div>
                    <button className="btn-general">Más Información</button>
                </div>
                <section className="intro">
                    <h2>¿Listo para crear tus multas?</h2>
                    <h2>Iniciemos...</h2>
                    <a href="/crear-multas" className="btn-general">Crear Multas</a>
                    </section>
                <div className="illustration"></div>
            </main>
        </div>
    );
}

export default Juez;