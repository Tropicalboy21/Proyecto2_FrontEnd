import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';
import ImagenLogo from '../assets/imgs/logo.png'
import Alert from '../components/Alert'

const CodeVerification = ({username}) =>{

    return(
    <div className='view-container'>

        <form  className='padre2'>
        <h2 className='title'>Confirmar Acceso</h2>
        <p>{username}</p>
        <div className='Inputs'>
          <input
            type="text"
            placeholder='Código de verificación'
            // value={firstname}
            // onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className='Buttons'>
          <button className='iniciar login' type="submit">Verificar</button>
        </div>
      </form>
    </div>
    );
}

export default CodeVerification;