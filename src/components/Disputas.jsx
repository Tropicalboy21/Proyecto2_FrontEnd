import React from 'react';
import '../App.css'
import '../assets/styles/multas.css'
import {Link} from "react-router-dom"
const Disputas = ({username}) =>{

    return(<div className='view-container'> 
        <main className="main-content">
        <h1 className='title'>Disputas</h1>
        <table className="fines-table">
          <thead>
            <tr>
              <th>MULTAS</th>
              <th>RAZON</th>
              <th>MONTO</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>MULTA1</td>
              <td>RAZON</td>
              <td>MONTO</td>
            </tr>
            <tr>
              <td>MULTA2</td>
              <td>RAZON</td>
              <td>MONTO</td>
            </tr>
            <tr>
              <td>MULTA3</td>
              <td>RAZON</td>
              <td>MONTO</td>
            </tr>
          </tbody>
        </table>
        <div className='Buttons'>
        <Link to="/home"><button className="iniciar login" >Regresar</button></Link> 
        </div>
      </main>
    </div>);
}

export default Disputas;