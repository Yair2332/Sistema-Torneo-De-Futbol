import axios from "axios";
import CardPartido from "./CardPartido";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PartidosLista({idEquipo, setPartidoSelect, limit, searchQuery}) {
    const [partidos, setPartidos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const buscarPartidos = async () => {
            setLoading(true);
            try {
                let response;
                
                if (searchQuery && searchQuery.trim() !== "") {
                    // Búsqueda por nombre de equipo
                    response = await axios.get(`http://localhost:3001/partidos/buscarPartidosPorNombre?nombre=${encodeURIComponent(searchQuery)}`);
                } else if (idEquipo) {
                    // Búsqueda por ID de equipo
                    response = await axios.get(`http://localhost:3001/partidos/buscarPartidos/${idEquipo}`);
                } else {
                    // Todos los partidos
                    response = await axios.get(`http://localhost:3001/partidos/buscarPartidos`);

                }
                
                if (response.data) {
                    setPartidos(response.data);
                }
            } catch (e) {
                console.error("Error fetching matches:", e);
            } finally {
                setLoading(false);
            }
        };
        
        buscarPartidos();
    }, [idEquipo, searchQuery]); 

    // Calcular los partidos a mostrar
    const partidosAMostrar = limit ? partidos.slice(0, limit) : partidos;

    if (loading) {
        return (
            <div className="container partido_lista mt-2 w-100 bg-secondary pb-2">
                <h2 className="section-title bg-dark titulacion w-100 fs-2">Próximos Enfrentamientos</h2>
                <div className="text-center py-3">
                    <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container partido_lista mt-2 w-100 bg-secondary pb-2">
            <h2 className="section-title bg-dark titulacion w-100 fs-2">
                Próximos Enfrentamientos
            </h2>

            <div className="row">
                {partidosAMostrar.length > 0 ? (
                    partidosAMostrar.map((p, index) => (
                        <CardPartido key={index} partido={p} setPartidoSelect={setPartidoSelect}/>
                    ))
                ) : (
                    <div className="col-12 text-center py-4">
                        <p className="text-light">
                            {searchQuery ? 'No se encontraron partidos' : 'No hay partidos programados'}
                        </p>
                    </div>
                )}
            </div>

            {limit && partidos.length > limit && (
                <div className="text-end mt-0 w-100 container">
                    <Link to={`/partidos${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ''}`} 
                          className="btn btn-dark me-2 rounded-2 w-100">
                        Ver todos los partidos ({partidos.length})
                    </Link>
                </div>
            )}
        </div>
    );
}

export default PartidosLista; 