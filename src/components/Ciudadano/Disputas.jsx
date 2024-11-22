import React from 'react';
import '../../assets/styles/app.css';
import {Link} from "react-router-dom"
const Disputas = ({username}) =>{

    return(<div className='view-container'> 
        <main className="main-content">
        <h1 className='title'>Disputas</h1>
        <table className="fines-table">
          <thead>
            <tr>
              <th>Disputa</th>
              <th>Estado</th>
              <th>Ver mas</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Disputa1</td>
              <td>Pending</td>
              <td><Link to="/home"><button className="btn-general" >Ver mas</button></Link></td>
            </tr>
            <tr>
              <td>Disputa2</td>
              <td>Declined</td>
              <td><Link to="/home"><button className="btn-general" >Ver mas</button></Link> </td>
            </tr>
            <tr>
              <td>Disputa3</td>
              <td>Accepted</td>
              <td><Link to="/home"><button className="btn-general" >Ver mas</button></Link>  </td>
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