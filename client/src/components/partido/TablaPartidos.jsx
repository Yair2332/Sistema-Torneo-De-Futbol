import React, { useState } from 'react';
import axios from 'axios';
import GoleadoresPartido from './GoleadoresPartido';

function TablaPartidos({
    partidos,
    jugadores,
    onCambioPartido,
    onActualizarPartido
}) {
    const [partidoExpandido, setPartidoExpandido] = useState(null);
    const [goleadores, setGoleadores] = useState([]);

    const handleChange = (index, field, value) => {
        onCambioPartido(index, field, value);
    };


    const cargarGoleadores = async (partidoId) => {
        try {
            const response = await axios.get(`http://localhost:3001/partidos/goleadores/partido/${partidoId}`);
            setGoleadores(response.data);
        } catch (error) {
            console.error("Error al cargar goleadores:", error);
        }
    };

    const toggleExpandirPartido = (partidoId) => {
        if (partidoExpandido === partidoId) {
            setPartidoExpandido(null);
        } else {
            setPartidoExpandido(partidoId);
            cargarGoleadores(partidoId);
        }
    };

    return (
        <div className="table-responsive">
            <table className="table table-dark table-hover table-striped mb-0">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Fecha</th>
                        <th>Equipo Local</th>
                        <th>Goles</th>
                        <th>Equipo Visitante</th>
                        <th>Goles</th>
                        <th>Ganador</th>
                        <th>Estado</th>
                        <th>Jornada</th>
                        <th>Jugador Destacado</th>
                        <th>Actualizar</th>
                    </tr>
                </thead>
                <tbody>
                    {partidos.map((partido, index) => (
                        <React.Fragment key={partido.partido_id}>
                            <tr>
                                <td>
                                    <button
                                        className={`btn btn-info btn-sm flex-grow-1 text-truncate w-100 ${partidoExpandido === partido.partido_id ? 'active' : ''}`}
                                        onClick={() => toggleExpandirPartido(partido.partido_id)}
                                        style={{ height: "38px" }}
                                    >
                                        <i className="bi bi-people-fill me-1"></i>Goleadores
                                    </button>

                                </td>
                                <td>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        value={partido.fecha ? new Date(partido.fecha).toISOString().slice(0, 16) : ''}
                                        onChange={(e) => handleChange(index, 'fecha', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <img
                                        src={partido.logo_local}
                                        alt="Escudo Local"
                                        width="30"
                                        height="30"
                                        className="me-2 rounded-circle"
                                        style={{ objectFit: "cover" }}
                                    />
                                    {partido.equipo_local}
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-control"
                                        min="0"
                                        value={partido.goles_local || 0}
                                        onChange={(e) => handleChange(index, 'goles_local', parseInt(e.target.value))}
                                    />
                                </td>
                                <td>
                                    <img
                                        src={partido.logo_visitante}
                                        alt="Escudo Visitante"
                                        width="30"
                                        height="30"
                                        className="me-2 rounded-circle"
                                        style={{ objectFit: "cover" }}
                                    />
                                    {partido.equipo_visitante}
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-control"
                                        min="0"
                                        value={partido.goles_visitante || 0}
                                        onChange={(e) => handleChange(index, 'goles_visitante', parseInt(e.target.value))}
                                    />
                                </td>
                                <td>
                                    <select
                                        className="form-select"
                                        value={partido.ganador_id || ''}
                                        onChange={(e) => handleChange(index, 'ganador_id', e.target.value === '' ? null : e.target.value)}
                                    >
                                        <option value="">Sin ganador</option>
                                        <option value={partido.equipo_local_id}>{partido.equipo_local}</option>
                                        <option value={partido.equipo_visitante_id}>{partido.equipo_visitante}</option>
                                    </select>
                                </td>
                                <td>
                                    <select
                                        className="form-select"
                                        value={partido.estado}
                                        onChange={(e) => handleChange(index, 'estado', e.target.value)}
                                    >
                                        <option value="0">Pendiente</option>
                                        <option value="1">Finalizado</option>
                                        <option value="2">Sin Fecha</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-control"
                                        min="1"
                                        value={partido.jornada || 1}
                                        onChange={(e) => handleChange(index, 'jornada', parseInt(e.target.value))}
                                    />
                                </td>
                                <td>
                                    <select
                                        className="form-select"
                                        value={partido.jugador_destacado_id || ''}
                                        onChange={(e) => handleChange(index, 'jugador_destacado_id', e.target.value)}
                                    >
                                        <option value="">Ninguno</option>
                                        {jugadores
                                            .filter(j =>
                                                j.equipo_id === partido.equipo_local_id ||
                                                j.equipo_id === partido.equipo_visitante_id
                                            )
                                            .map((jugador) => (
                                                <option key={jugador.id} value={jugador.id}>
                                                    {jugador.nombre} (#{jugador.numero}) - {
                                                        jugador.equipo_id === partido.equipo_local_id ?
                                                            partido.equipo_local :
                                                            partido.equipo_visitante
                                                    }
                                                </option>
                                            ))
                                        }
                                    </select>
                                </td>
                                <td style={{ minWidth: '100px' }}>
                                    <button
                                        className="btn btn-success btn-sm flex-grow-1 text-truncate w-100"
                                        onClick={() => onActualizarPartido(partido)}
                                        style={{ height: "38px" }}
                                    >
                                        <i className="bi bi-save me-1"></i>Actualizar
                                    </button>

                                </td>
                            </tr>
                            {partidoExpandido === partido.partido_id && (
                                <tr>
                                    <td colSpan="11" className="p-0">
                                        <div className="bg-secondary px-2">
                                            <GoleadoresPartido
                                                partidoId={partido.partido_id}
                                                equipoLocalId={partido.equipo_local_id}
                                                equipoVisitanteId={partido.equipo_visitante_id}
                                                onGoleadoresChange={setGoleadores}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TablaPartidos;