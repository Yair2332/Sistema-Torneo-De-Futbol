import React, { useState } from 'react';
import axios from 'axios';

function FormularioJugador({ isAdmin, idEquipoSeleccionado, onJugadorAgregado }) {
    const [nuevoJugador, setNuevoJugador] = useState({ 
        nombre: '', 
        posicion: '', 
        numero: '' 
    });
    const [imagen, setImagen] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setNuevoJugador({ ...nuevoJugador, [e.target.name]: e.target.value });
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
            setImagen(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!idEquipoSeleccionado || !nuevoJugador.nombre || !nuevoJugador.posicion || !nuevoJugador.numero || !imagen) {
            setError('Todos los campos son requeridos');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('nombre', nuevoJugador.nombre);
            formData.append('posicion', nuevoJugador.posicion);
            formData.append('numero', nuevoJugador.numero);
            formData.append('equipo_id', idEquipoSeleccionado);
            formData.append('imagen', imagen);

            await axios.post('http://localhost:3001/jugadores/agregarJugador', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            // Limpiar formulario
            setNuevoJugador({ nombre: '', posicion: '', numero: '' });
            setImagen(null);
            
            // Notificar al componente padre
            if (onJugadorAgregado) {
                onJugadorAgregado();
            }

            alert('Jugador agregado correctamente');
        } catch (error) {
            console.error('Error al agregar jugador:', error);
            setError(error.response?.data?.error || 'Error al agregar jugador');
        } finally {
            setLoading(false);
        }
    };

    if (!isAdmin) return null;

    return (
        <form className='d-flex gap-2' onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}
            
            <input 
                type="file" 
                className='form-control' 
                onChange={handleImageChange} 
                required 
            />
            <input 
                type="text" 
                className="form-control" 
                placeholder="Nombre" 
                name="nombre" 
                value={nuevoJugador.nombre} 
                onChange={handleChange} 
                required 
            />
            <input 
                type="text" 
                className="form-control" 
                placeholder="Posición" 
                name="posicion" 
                value={nuevoJugador.posicion} 
                onChange={handleChange} 
                required 
            />
            <input 
                type="number" 
                className="form-control" 
                placeholder="Número" 
                name="numero" 
                value={nuevoJugador.numero} 
                onChange={handleChange} 
                required 
            />
            <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
            >
                {loading ? 'Agregando...' : 'Agregar'}
            </button>
        </form>
    );
}

export default FormularioJugador;