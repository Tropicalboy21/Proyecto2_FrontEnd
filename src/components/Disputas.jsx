import React from 'react';
import '../App.css'
import '../assets/styles/multas.css'
const Disputas = ({username}) =>{

    return(<div className='view-container'> 
        <main className="main-content">
        <h1 className='title'>Disputas</h1>
        <div className='Buttons'>
        <button className="iniciar login">Regresar</button>
        </div>
      </main>
    </div>);
}

export default Disputas;