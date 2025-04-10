import React, { useState } from 'react';
import axios from 'axios';

function FormularioEquipo({ isAdmin, onEquipoAgregado }) {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [nuevoEquipo, setNuevoEquipo] = useState({
        Nombre: '',
        Localidad: '',
        Entrenador: '',
        Capitan: '',
        Fundado: '',
        Contacto: '',
        Email: ''
    });
    const [imagenEquipo, setImagenEquipo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setNuevoEquipo({ ...nuevoEquipo, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Por favor, selecciona un archivo de imagen válido');
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                setError('La imagen no debe exceder los 2MB');
                return;
            }
            setError(null);
            setImagenEquipo(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!nuevoEquipo.Nombre || !nuevoEquipo.Localidad) {
            setError('Nombre y Localidad son campos requeridos');
            return;
        }
    
        setLoading(true);
        setError(null);
    
        const formData = new FormData();
        Object.keys(nuevoEquipo).forEach(key => {
            formData.append(key, nuevoEquipo[key]);
        });
        if (imagenEquipo) {
            formData.append('Img', imagenEquipo);
        }
    
        try {
            const response = await axios.post('http://localhost:3001/equipos/agregarEquipo', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            if (response.status === 200) {
                alert('Equipo agregado correctamente' + 
                    (response.data.message.includes('partidos generados') ? ' y partidos generados' : ''));
                setMostrarFormulario(false);
                setNuevoEquipo({
                    Nombre: '',
                    Localidad: '',
                    Entrenador: '',
                    Capitan: '',
                    Fundado: '',
                    Contacto: '',
                    Email: ''
                });
                setImagenEquipo(null);
                if (onEquipoAgregado) {
                    onEquipoAgregado();
                }
            }
        } catch (error) {
            console.error('Error al agregar equipo:', error);
            setError(error.response?.data?.error || error.response?.data?.details || 'Error al agregar equipo');
        } finally {
            setLoading(false);
        }
    };

    if (!isAdmin) return null;

    return (
        <div className="mb-3">
            <button 
                className="btn btn-primary"
                onClick={() => setMostrarFormulario(!mostrarFormulario)}
            >
                {mostrarFormulario ? 'Cancelar' : 'Agregar Nuevo Equipo'}
            </button>

            {mostrarFormulario && (
                <form onSubmit={handleSubmit} className="mt-3 p-3 border rounded">
                    <h4>Agregar Nuevo Equipo</h4>
                    {error && <div className="alert alert-danger">{error}</div>}
                    
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Nombre del Equipo*</label>
                                <input
                                    type="text"
                                    name="Nombre"
                                    className="form-control"
                                    value={nuevoEquipo.Nombre}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Localidad*</label>
                                <input
                                    type="text"
                                    name="Localidad"
                                    className="form-control"
                                    value={nuevoEquipo.Localidad}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Entrenador</label>
                                <input
                                    type="text"
                                    name="Entrenador"
                                    className="form-control"
                                    value={nuevoEquipo.Entrenador}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Capitán</label>
                                <input
                                    type="text"
                                    name="Capitan"
                                    className="form-control"
                                    value={nuevoEquipo.Capitan}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Año de Fundación</label>
                                <input
                                    type="text"
                                    name="Fundado"
                                    className="form-control"
                                    value={nuevoEquipo.Fundado}
                                    onChange={handleChange}
                                    placeholder="Ej: 1899"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Imagen del Equipo</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Contacto</label>
                                <input
                                    type="text"
                                    name="Contacto"
                                    className="form-control"
                                    value={nuevoEquipo.Contacto}
                                    onChange={handleChange}
                                    placeholder="Teléfono o contacto"
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="Email"
                                    className="form-control"
                                    value={nuevoEquipo.Email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-success"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Guardando...
                            </>
                        ) : 'Guardar Equipo'}
                    </button>
                </form>
            )}
        </div>
    );
}

export default FormularioEquipo;