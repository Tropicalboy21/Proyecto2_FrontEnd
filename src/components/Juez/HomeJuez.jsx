import React, { useState, useEffect } from 'react';
import '../../assets/styles/stylesJuez/homeJuez.css';
import '../../assets/styles/app.css';

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
            <div className="left-panel">
                <h1>¡Bienvenido Juez!</h1>
            </div>
            <div className="center-panel">
                <img
                    src="src/assets/imgs/MARTILLO.png"
                    alt="Martillo giratorio"
                    className="rotating-image"
                />
                <button className="btn-disputas" href="../Disputas">Disputas</button>

            </div>
            <div className="right-panel">
    <div className="carousel-container">
        <div className="carousel">
            {images.map((img, index) => (
                <img
                    key={index}
                    src={img}
                    alt={`Slide ${index + 1}`}
                    className={`carousel-image ${
                        currentIndex === index ? 'active' : ''
                    }`}
                />
            ))}
        </div>
        <div className="indicators">
            {images.map((_, index) => (
                <span
                    key={index}
                    className={`indicator ${
                        currentIndex === index ? 'active' : ''
                    }`}
                ></span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Juez;


