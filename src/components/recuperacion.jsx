import { useState } from 'react'
import appFirebase from '../assets/credenciales'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'

const auth = getAuth(appFirebase)

const Recuperacion = () => {
    const [email, setEmail] = useState("")

    const handlePasswordReset = async () => {
        if (!email) {
            alert("Por favor ingresa tu correo electrónico")
            return
        }
        try {
            await sendPasswordResetEmail(auth, email)
            alert("Se ha enviado un correo para restablecer la contraseña")
        } catch (error) {
            alert("Hubo un error al intentar restablecer la contraseña")
        }
    }

    return (
        <div className='container'>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card card-body shadow-lg mt-5">
                        <h3 className="text-center">Recuperación de Contraseña</h3>
                        <input
                            type="email"
                            placeholder="Ingresa tu correo electrónico"
                            className="form-control mt-3"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button className="btn btn-primary mt-3" onClick={handlePasswordReset}>
                            Enviar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Recuperacion
