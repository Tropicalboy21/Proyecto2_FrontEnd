import React from 'react';
import '../App.css'; 

function Alert({ type, message, onClose }) {
    const alertClass = type === 'success' ? 'alert-success' : 'alert-error';
    const iconClass = type === 'success'? 'icon-success': 'icon-error';
    const buttonClass = type === 'success'? 'button-success': 'button-error';

    return (
        <div className="alert-container">
            <div className={`alert-box ${alertClass}`}>
                <div className={`icon ${iconClass}`}></div>
                <p className='msj'>{message}</p>
                <button className={`close-button ${buttonClass}`} onClick={onClose}>ok</button>
            </div>
            <div className="overlay" onClick={onClose}></div>
        </div>
    );
}

export default Alert;
