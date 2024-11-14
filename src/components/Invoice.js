import React, { useState, useEffect, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import './styles/Invoice.css';
import logo from './imgs/logo.jpg';
import data from './data';

const Invoice = () => {
    const [Inspector, setInspector] = useState('');
    const [officerName, setOfficerName] = useState('');
    const [privacyChecked, setPrivacyChecked] = useState(false);
    const [showWarnings, setShowWarnings] = useState(false);
    const [multaId, setMultaId] = useState('');
    const [boletaNum, setBoletaNum] = useState('');
    const [lugarHechos, setLugarHechos] = useState('');
    const [placaVehiculo, setPlacaVehiculo] = useState('');
    const [codigoInfraccion, setCodigoInfraccion] = useState([]);
    const [montoMulta, setMontoMulta] = useState(0);
    const [observaciones, setObservaciones] = useState('');
    const [fechaInfraccion, setFechaInfraccion] = useState('');
    const [horaInfraccion, setHoraInfraccion] = useState('');
    const [reclamos, setReclamos] = useState('');
    const [error, setError] = useState('');
    const [province, setProvince] = useState('');
    const [canton, setCanton] = useState('');
    const [district, setDistrict] = useState('');

    const invoiceRef = useRef();

    useEffect(() => {
        const generateUniqueId = () => {
            const id = `MUL-${Math.floor(Math.random() * 10000)}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
            const num = `BOLETA-${Math.floor(Math.random() * 10000)}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
            setMultaId(id);
            setBoletaNum(num);
        };

        const now = new Date();
        setFechaInfraccion(now.toISOString().split('T')[0]);
        setHoraInfraccion(now.toTimeString().split(' ')[0]);
        generateUniqueId();
    }, []);

    const handleInspectorChange = (e) => {
        const value = e.target.value;
        const formattedValue = formatIdentification(value);
        setInspector(formattedValue);

        const regex = /^\d{0,1}-\d{0,4}-\d{0,4}$/;
        if (regex.test(formattedValue) || formattedValue === '') {
            setError('');
            if (formattedValue) {
                //  llamada a la API del Tribunal Supremo
                // ...
            } else {
                setOfficerName('');
            }
        } else {
            setError("El número de identificación debe poseer el siguiente formato 0-00000-0000, solamente permite el ingreso de números");
            setOfficerName('');
        }
    };

    const formatIdentification = (value) => {
        const numbers = value.replace(/\D/g, '');
        const match = numbers.match(/^(\d{0,1})(\d{0,4})(\d{0,4})$/);
        if (match) {
            return `${match[1]}-${match[2]}-${match[3]}`;
        }
        return value;
    };

    return (
        <div className="invoice" ref={invoiceRef}>
            <header className="invoice-header">
                <img src={logo} alt="Logo" className="invoice-logo" />
                <h2>Factura de Multa</h2>
            </header>
            <div className="form-group">
                <label htmlFor="Inspector">Identificación del Oficial
                    <span title="Formato: 0-00000-0000"> (i)</span>
                </label>
                <input
                    type="text"
                    id="Inspector"
                    name="Inspector"
                    value={Inspector}
                    onChange={handleInspectorChange}
                    placeholder="_-____-____"
                    maxLength="12"
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="lugarHechos">Ingrese el lugar de los hechos</label>
                <select id="lugarHechos" value={province} onChange={handleProvinceChange}>
                    <option value="">Seleccione una de las siguientes provincias</option>
                    {Object.keys(data).map((prov) => (
                        <option key={prov} value={prov}>{prov}</option>
                    ))}
                </select>
                {province && (
                    <select value={canton} onChange={handleCantonChange}>
                        <option value="">Seleccione un cantón</option>
                        {Object.keys(data[province]).map((cant) => (
                            <option key={cant} value={cant}>{cant}</option>
                        ))}
                    </select>
                )}
                {canton && (
                    <select value={district} onChange={(e) => setDistrict(e.target.value)}>
                        <option value="">Seleccione un distrito</option>
                        {data[province][canton].map((dist) => (
                            <option key={dist} value={dist}>{dist}</option>
                        ))}
                    </select>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="Placa_vehiculo">Placa del Vehículo</label>
                <input
                    type="text"
                    id="Placa_vehiculo"
                    name="Placa_vehiculo"
                    value={placaVehiculo}
                    onChange={(e) => setPlacaVehiculo(e.target.value)}
                    placeholder="Ingrese la placa del vehículo"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="Articulos_Infringidos">Código infracción</label>
                <select
                    id="Articulos_Infringidos"
                    name="Articulos_Infringidos"
                    multiple
                    value={codigoInfraccion}
                    onChange={handleInfraccionChange}
                    required
                >
                    <option value="Categoría-A">Categoría A (Fosas Múltiples)</option>
                    <option value="Categoría-B">Categoría B (Multas Moderadas)</option>
                    <option value="Categoría-C">Categoría C (Multimedia)</option>
                    <option value="Categoría-D">Categoría D (Multas Leves)</option>
                    <option value="Categoría-E">Categoría E (Multas de Menor Gravedad)</option>
                    <option value="Otras">Otras</option>
                </select>
            </div>

            <div className="invoice-details">
                <h3>Resumen de la Multa</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Tipo de Infracción</th>
                            <th>Monto</th>
                            <th>Observaciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{codigoInfraccion.join(', ')}</td>
                            <td>{montoMulta}</td>
                            <td>{observaciones}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="form-group">
                <label htmlFor="Observaciones">Observaciones del oficial</label>
                <input
                    type="text"
                    id="Observaciones"
                    name="Observaciones"
                    value={observaciones}
                    onChange={(e) => setObservaciones(e.target.value)}
                    placeholder="Observaciones del oficial"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="Reclamos">Reclamos</label>
                <select
                    id="Reclamos"
                    name="Reclamos"
                    value={reclamos}
                    onChange={(e) => setReclamos(e.target.value)}
                    required
                >
                    <option value="">Seleccione si el conductor realizó un reclamo</option>
                    <option value="si">Sí</option>
                    <option value="no">No</option>
                </select>
            </div>

            <footer className="invoice-footer">
                {showWarnings && privacyChecked && (
                    <div className="privacy-warning">
                        <h3>Advertencias de Ley al Infractor</h3>
                        <p>LEY DE TRÁNSITO POR VIAS PUBLICAS TERRESTRES Y SEGURIDAD VIAL N° 9078</p>
                        <p>Multa Fija: De no presentarse inconformidad dentro de un plazo improrrogable de diez días hábiles a partir del día siguiente a la fecha de la confección de la boleta, la sanción quedará en firmeza (artículos 163, 164, 165).</p>
                        <p>En caso de disconformidad podrá recurrir ante la Unidad de Impugnaciones de Boletas de Citación del COSEVI, dentro de los diez días hábiles posteriores a la fecha de confección.</p>
                        <p>Ante esta autoridad se debe personar obligatoriamente en los casos en que el vehículo fue retirado de circulación o detenido por las autoridades de tránsito.</p>
                        <p>De no pagar la multa o presentar inconformidad dentro de los diez días hábiles posteriores a la fecha de la boleta, el infractor asumirá las consecuencias legales.</p>
                        <p>A la persona que no presente inconformidad o no pague dentro del plazo establecido se le habilitará el cobro judicial correspondiente.</p>
                        <p>Esta infracción será motivo de cobro judicial en caso de no cancelar el monto máximo dentro de los términos de la ley.</p>
                        <p>El derecho a una defensa es un derecho fundamental de la persona humana. En caso de no presentarse dentro del plazo de veinte (20) días hábiles, se aplicará el Cobro Judicial (artículo 195).</p>
                    </div>
                )}
                <div className="signature-section" style={{ textAlign: 'center' }}>
                    <h3>Firma del Infractor</h3>
                    <div className="signature-line"></div>
                    <p>Nombre del infractor</p>
                </div>
                <div className="action-button">
                    <button type="button" onClick={handleGeneratePDF}>Crear Factura</button>
                </div>
            </footer>
        </div>
    );
};

export default Invoice;