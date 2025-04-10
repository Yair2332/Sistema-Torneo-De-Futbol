import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = ({ setIsAdmin, torneoNombre }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(true); // Activado por defecto
    const navigate = useNavigate();

    // Verificar sesión existente al cargar el componente
    useEffect(() => {
        const storedSession = localStorage.getItem('userSession');
        if (storedSession) {
            const { token, user } = JSON.parse(storedSession);
            verifyToken(token);
        }
    }, []);

    // Función para verificar token JWT
    const verifyToken = async (token) => {
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:3001/auth/verifyToken', { token });

            if (response.data.valid) {
                setIsAdmin(true);
                navigate('/admin');
            } else {
                localStorage.removeItem('userSession');
            }
        } catch (err) {
            console.error("Error verificando token:", err);
            localStorage.removeItem('userSession');
        } finally {
            setLoading(false);
        }
    };

    // Manejar submit del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Validación básica
        if (!email || !password) {
            setError('Por favor completa todos los campos');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/auth/login', {
                correo: email,
                password
            });

            if (response.data.success) {
                setIsAdmin(true);

                // Guardar sesión si "Recordar sesión" está marcado
                if (rememberMe) {
                    const sessionData = {
                        user: response.data.usuario,
                        token: response.data.token
                    };
                    localStorage.setItem('userSession', JSON.stringify(sessionData));
                }

                navigate('/admin');
            }
        } catch (err) {
            setLoading(false);
            if (err.response) {
                switch (err.response.status) {
                    case 401:
                        setError('Credenciales incorrectas');
                        break;
                    case 400:
                        setError('Datos incompletos o inválidos');
                        break;
                    default:
                        setError('Error en el servidor');
                }
            } else {
                setError('No se pudo conectar con el servidor');
            }
        }
    };

    return (
        <div className="login-container">
            {/* Incluir recursos por CDN */}
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
            />
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css"
            />

            <div className="login-wrapper">
                {/* Sección de imagen decorativa */}
                <div className="login-image-section">
                    <div className="logo-container">
                        <h1>{torneoNombre}</h1>
                    </div>
                    <img
                        src="/assets/logo.jpg"
                        alt="Administrador de Torneo"
                        className="admin-image"
                    />
                    <div className="welcome-text">
                        <h3>Panel de Administración</h3>
                        <p>Gestiona tu torneo de forma profesional</p>
                    </div>
                </div>

                {/* Formulario de login */}
                <div className="login-card animate__animated animate__fadeIn">
                    <div className="text-center mb-4">
                        <h2 className="fw-bold text-light">Acceso Administrador</h2>
                        <p className="text-light">Ingresa tus credenciales</p>
                    </div>

                    {error && (
                        <div className="alert alert-danger animate__animated animate__shakeX">
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label text-light">
                                <i className="bi bi-envelope-fill me-2"></i>Correo Electrónico
                            </label>
                            <div className="input-group">
                                <span className="input-group-text bg-dark text-light border-dark">
                                    <i className="bi bi-person"></i>
                                </span>
                                <input
                                    type="email"
                                    className="form-control bg-dark text-light border-dark"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@torneo.com"
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label text-light">
                                <i className="bi bi-key-fill me-2"></i>Contraseña
                            </label>
                            <div className="input-group">
                                <span className="input-group-text bg-dark text-light border-dark">
                                    <i className="bi bi-lock"></i>
                                </span>
                                <input
                                    type="password"
                                    className="form-control bg-dark text-light border-dark"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    minLength="6"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div className="d-flex justify-content-between mb-4">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    id="rememberMe"
                                    disabled={loading}
                                />
                                <label className="form-check-label text-light" htmlFor="rememberMe">
                                    Recordar sesión
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100 py-2 mb-3 login-btn fw-bold"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                    Verificando...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-box-arrow-in-right me-2"></i>
                                    INGRESAR
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;