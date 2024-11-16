import React from 'react';
import '../assets/styles/home.css';
import PersonIcon from '@mui/icons-material/Person';
import {LineChart} from '@mui/x-charts/LineChart';

function HomeAdmi() {
    return (
        <div className="view-container" >
            <div className='dashboard'>
                <h1 className='saludo'>Bienvenido Admin</h1>
                <div className='row'>
                    <div className='box-component'>
                    <div className='component-head'>
                            <h2>Clientes activos</h2>
                            <span className='circle2'><PersonIcon fontSize="medium" sx={{ color: 'black' }} /></span>
                        </div>
                        <p className='number'>34</p>
                    </div>
                    <div className='box-component'>
                        <div className='component-head'>
                            <h2>Usuarios internos</h2>
                            <span className='circle'><PersonIcon fontSize="medium" sx={{ color: 'black' }} /></span>
                        </div>
                        <p className='number'>11</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='box-component2'>
                    <LineChart
                        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                        series={[
                            {
                            data: [2, 5.5, 2, 8.5, 1.5, 5],
                            area: true,
                            },
                        ]}
                        width={319}
                        height={157}
                    />
                    <h2 className='graph'>Cantidad de multas</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeAdmi;