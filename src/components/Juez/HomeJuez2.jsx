import React, { useState, useEffect } from 'react';
import '../../assets/styles/stylesJuez/homeJuez2.css';
import '../../assets/styles/app.css';
const images = [
    'src/assets/imgs/img1.jpg',
    'src/assets/imgs/img2.jpg',
    'src/assets/imgs/img3.png',
    'src/assets/imgs/img4.png',
];
function Juez() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % 
images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    return (
        <div className="content">
            <div className="left-panel">
                <h1>¡Bienvenido Juez!</h1>
            </div>
            <div className="center-panel">
                <div className="martillo-container">
                    <img
                        src="src/assets/imgs/MARTILLO.png"
                        alt="Martillo animado"
                        className="martillo-image"
                    />
                    {/* <div className="effect-rays"></div> */}
                    {/* <img
                        src="src/assets/imgs/img1.jpg"
                        alt="Imagen im1"
                        className="static-image"
                    /> */}
                </div>
                <button className="btn-disputas">Disputas</button>
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