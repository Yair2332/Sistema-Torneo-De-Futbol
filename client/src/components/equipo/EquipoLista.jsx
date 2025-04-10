import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EquipoLista({ setEquipoSelect, searchQuery }) {
    const [equipos, setEquipos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEquipos = async () => {
            try {
                setLoading(true);
                let response;
                
                if (searchQuery && searchQuery.trim() !== "") {
                    response = await axios.get(`http://localhost:3001/equipos/buscarEquiposNombre?nombre=${encodeURIComponent(searchQuery)}`);
                } else {
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

    const handleEquipoClick = (id) => {
        setEquipoSelect(id);
        setTimeout(() => {
            const element = document.getElementById('info_equipo');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    if (loading) {
        return <div className="text-center py-5">Cargando equipos...</div>;
    }

    return (
        <div className="equipos-lista-container container p-0 mt-2 bg-secondary rounded-3">
            <h2 className="titulacion fs-2 bg-dark w-100 mb-2">
                Seleccionar Equipo
            </h2>
            
            <div className="equipos-grid p-0">
                {equipos.length > 0 ? (
                    equipos.map((equipo) => (
                        <div 
                            key={equipo.Id} 
                            className="equipo-card"
                            onClick={() => handleEquipoClick(equipo.Id)}
                            role="button"
                            tabIndex={0}
                        >
                            <div 
                                className="equipo-bg" 
                                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1434648957308-5e6a859697e8?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9uZG8lMjBkZSUyMHBhbnRhbGxhJTIwZGUlMjBmJUMzJUJBdGJvbHxlbnwwfHwwfHx8MA%3D%3D')` }}
                            ></div>
                            
                            <div className="equipo-content">
                                <div className="equipo-logo-container">
                                    <img 
                                        src={equipo.Img} 
                                        alt={equipo.Nombre} 
                                        className="equipo-logo" 
                                        onError={(e) => {
                                            e.target.onerror = null; 
                                            e.target.src = 'https://via.placeholder.com/150';
                                        }}
                                    />
                                </div>
                                
                                <h3 className="equipo-nombre">{equipo.Nombre}</h3>
                                
                                <div className="equipo-puntos">
                                    <i className="bi bi-star-fill text-warning"></i>
                                    <span>{equipo.Pts}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center py-4">
                        <p>No se encontraron equipos con ese nombre</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EquipoLista;