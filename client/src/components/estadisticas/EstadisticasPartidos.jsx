import axios from 'axios';
import React, { useState, useEffect } from 'react';

function EstadisticasPartidos({ estadisticas, isAdmin, onUpdate }) {
    const [resultados, setResultados] = useState([]);

    useEffect(() => {
        if (estadisticas?.Est) {
            setResultados(estadisticas.Est.split(',').map(r => r.trim()));
        }
    }, [estadisticas]);

    const agregarResultado = (valor) => {
        if (valor === '1' || valor === '0' || valor === '-1') {
            setResultados([...resultados, valor]);
        }
    };
    

    const eliminarResultado = (index) => {
        setResultados(resultados.filter((_, i) => i !== index));
    };



    const guardarResultados = async () => {
        // Filtrar valores incorrectos y vacíos antes de guardar
        const resultadosLimpios = resultados.filter(r => r === '1' || r === '0' || r === '-1');
    
        try {
            const response = await axios.post('http://localhost:3001/equipos/actualizarEstadisticasEquipo', {
                Id: estadisticas.Id,
                Est: resultadosLimpios.join(',')
            });
    
            if (response.status === 200) {
                alert(response.data.message);
                onUpdate(response.data.equipoData); // Actualizar el estado global
            }
        } catch (error) {
            console.error('Error al actualizar estadísticas:', error);
            alert('No se pudieron actualizar las estadísticas');
        }
    };
    
    

    const renderResultado = (resultado, index) => {
        const baseClasses = "d-flex align-items-center justify-content-center rounded me-3 mt-2 position-relative border";
        const style = { width: '40px', height: '40px', cursor: isAdmin ? 'pointer' : 'default' };

        return (
            <div key={index} className={
                `${baseClasses} ${resultado === '1' ? 'bg-success' : resultado === '0' ? 'bg-secondary' : 'bg-danger'} text-white`}
                style={style}
                title={resultado === '1' ? "Partido ganado" : resultado === '0' ? "Partido empatado" : "Partido perdido"}
            >
                {resultado === '1' ? '✓' : resultado === '0' ? '-' : '✗'}
                {isAdmin && (
                    <button className="btn btn-sm btn-primary ms-2 btn-eliminar-est" onClick={() => eliminarResultado(index)}>X</button>
                )}
            </div>
        );
    };

    return (
        <div className="p-2 px-2 text-white estadisticas-equipo-edicion">
            <h5 className="mb-1 ms-1">Historial de Partidos</h5>
            <div className="d-flex flex-wrap p-0">
                {resultados.length > 0 ? (
                    resultados.map((resultado, index) => renderResultado(resultado, index))
                ) : (
                    <p className="text-muted">No hay resultados registrados</p>
                )}
            </div>
            {isAdmin && (
                <div className="mt-3">
                    <button className="btn btn-success me-2" onClick={() => agregarResultado('1')}>Agregar Victoria</button>
                    <button className="btn btn-secondary me-2" onClick={() => agregarResultado('0')}>Agregar Empate</button>
                    <button className="btn btn-danger" onClick={() => agregarResultado('-1')}>Agregar Derrota</button>
                    <button className="btn btn-primary ms-3" onClick={guardarResultados}>Guardar Cambios</button>
                </div>
            )}
        </div>
    );
}

export default EstadisticasPartidos;
