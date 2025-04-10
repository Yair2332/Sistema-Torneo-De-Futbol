import React, { useEffect, useState } from 'react';
import Estadisticas from './Estadisticas';
import axios from 'axios';

function ListaEstadisticas({ searchQuery }) {
    const [equipos, setEquipos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEquipos = async () => {
            try {
                setLoading(true);
                let response;
                
                if (searchQuery && searchQuery.trim() !== "") {
                    // Búsqueda por nombre de equipo
                    response = await axios.get(`http://localhost:3001/equipos/buscarEquiposNombre?nombre=${encodeURIComponent(searchQuery)}`);
                } else {
                    // Todos los equipos
                    response = await axios.get('http://localhost:3001/equipos/buscarEquipos');
                }
                
                setEquipos(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching equipos:", error);
                setLoading(false);
            }
        };

        fetchEquipos();
    }, [searchQuery]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="lista-estadisticas-container container bg-secondary p-0 mt-2 rounded-3" id='EstadisticasLista'>
            <h2 className="titulo-principal titulacion fs-2 bg-dark w-100 mb-2">
                Clasificación del Torneo
            </h2>
            
            <div>
                {equipos.length > 0 ? (
                    equipos.map((equipo) => (
                        <div key={equipo.Id} className="equipo-card mb-2">
                            <div className="imagen-equipo-container p-0">
                                <img
                                    src={equipo.Img}
                                    alt={`Escudo ${equipo.Nombre}`}
                                    className="imagen-equipo"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://via.placeholder.com/150';
                                    }}
                                />
                                <div className="nombre-equipo">{equipo.Nombre}</div>
                            </div>

                            <div className="estadisticas-container">
                                <Estadisticas idEquipo={equipo.Id} />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-4">
                        <p className="text-light">No se encontraron equipos con ese nombre</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ListaEstadisticas;