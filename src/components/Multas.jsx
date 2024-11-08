import React from 'react';
import '../App.css'
import '../assets/styles/multas.css'
const Multas = ({username}) =>{

    return(<div className='view-container'> 
        <main className="main-content">
        <h1 className='title'>Multas</h1>
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
        <button className="iniciar login">DISPUTAR MULTA</button>
        </div>
      </main>
    </div>);
}

export default Multas;