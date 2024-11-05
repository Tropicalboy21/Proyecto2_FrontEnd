import React from 'react';

function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className='footer'>
            <p>Transito Inteligente | Derechos reservados ⓒ {currentYear}</p>
        </footer>
    );
}

export default Footer;