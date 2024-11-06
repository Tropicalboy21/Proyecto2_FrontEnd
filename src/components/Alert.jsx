import React from 'react';
import '../App.css'; 

function Alert({ type, message, onClose }) {
    const alertClass = type === 'success' ? 'alert-success' : 'alert-error';

    return (
        <div className="alert-container">
            <div className={`alert-box ${alertClass}`}>
                <p>{message}</p>
                <button className="close-button" onClick={onClose}>X</button>
            </div>
            <div className="overlay" onClick={onClose}></div>
        </div>
    );
}

export default Alert;
