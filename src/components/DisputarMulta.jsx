import React from 'react';
import '../App.css'
import '../assets/styles/general.css'
import {Link} from "react-router-dom"
const DisputarMulta = ({username}) =>{

    return(<div className='view-container'> 
        <main className="main-content">
        <h1 className='title'>Disputar Multa</h1>

        <form   className='padre2'>
            <h2 className='title'>Disputar Multa</h2>
            <div className='Inputs'>
                <input
                    type="text"
                    placeholder='Nombre'
                />
                   <input
                    type="text"
                    placeholder='Nombre'
                />
                   <input
                    type="text"
                    placeholder='Nombre'
                />
                   <input
                    type="text"
                    placeholder='Nombre'
                />
            </div>
            <div className='Buttons'>
             <button className='btn-general' type="submit">Disputar</button>
            </div>
        </form>
        
        <div  className='title'></div>
        <div className='Buttons'>
        <Link to="/home"><button className="iniciar login" >Regresar</button></Link> 
        </div>
      </main>
    </div>);
    
}

export default DisputarMulta;