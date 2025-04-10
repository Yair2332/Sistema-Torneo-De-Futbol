import axios from 'axios';
import React, { useEffect, useState } from 'react'

function InfoPartido({ partidoSelect, setPartidoSelect }) {

    const [partido, setPartido] = useState([])

    const buscarPartidoPorId = async (id) => {
        await axios.get(`http://localhost:3001/partidos/buscarPartidoPorId/${id}`)
            .then((response) => {
                if (response.data) {
                    setPartido(response.data);
                }
            })
            .catch((e) => {
                alert(e);
            });
    };

    useEffect(() => {
        if (partidoSelect) {
            buscarPartidoPorId(partidoSelect);
        }
    }, [partidoSelect]);


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('es-ES', { month: 'short' });
        const year = date.getFullYear();
        const time = date.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        return `${day} ${month.charAt(0).toUpperCase() + month.slice(1)} ${year} - ${time}`;
    }

    return (
        <div class="container px-0 py-0 info_partido rounded-3 position-relative" id='info_partido'>
            <div class="card match-card mt-2">

                <div><button onClick={() => { setPartidoSelect("") }} className='btn btn-danger boton-cerrar'>X</button></div>
                <div class="match-header rounded-0 ">
                    <img src={partido.logo_local} alt={partido.equipo_local} class="team-logo" />
                    <div class="vs-text">VS</div>
                    <img src={partido.logo_visitante} alt={partido.equipo_visitante} class="team-logo" />
                </div>


                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span className={`match-status ${partido.estado === 0 ? "status-pending" : partido.estado === 1 ? "status-finished" : "status-live"}`}><i className="fas fa-play me-1"></i>{partido.estado === 0 ? "Por definirse" : partido.estado === 1 ? "Finalizado" : "Sin Fecha Fija"}</span>
                        <span className="match-date">
                            <i className="fas fa-calendar-alt me-2"></i>{formatDate(partido.fecha)}
                        </span>
                    </div>

                    <div class="row align-items-center text-center">
                        <div class="col-5">
                            <div class="team-name fs-2">{partido.equipo_local}</div>
                            <div class=" small">Local</div>
                        </div>
                        <div class="col-2 p-0">
                            <div class="result-display fs-1">{partido.goles_local} - {partido.goles_visitante}</div>
                        </div>
                        <div class="col-5">
                            <div class="team-name fs-2">{partido.equipo_visitante}</div>
                            <div class=" small">Visitante</div>
                        </div>
                    </div>

                    <div class="text-center text-ligth fw-bold mb-3 fs-5">{partido.ganador? "Ganador: "+partido.ganador : "Empate" }</div>


                    <div class="row mt-2">
                        <div class="col-md-6">
                            <h6 class="text-center fw-bold fs-4">Goleadores de {partido.equipo_local}</h6>
                            <ul class="goals-list pb-0 mb-0">
                                {partido.goleadores && partido.goleadores[partido.equipo_local] ? (
                                    partido.goleadores[partido.equipo_local].map((goleador, index) => (
                                        <li key={index}><i class="fas fa-futbol ball-icon fs-3"></i> {goleador.nombre} ({goleador.cantidad})</li>
                                    ))
                                ) : (
                                    <li>Sin goles</li>
                                )}
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <h6 class="text-center fw-bold fs-4">Goleadores de {partido.equipo_visitante}</h6>
                            <ul class="goals-list pb-0 mb-0">
                                {partido.goleadores && partido.goleadores[partido.equipo_visitante] ? (
                                    partido.goleadores[partido.equipo_visitante].map((goleador, index) => (
                                        <li key={index}><i class="fas fa-futbol ball-icon fs-3"></i> {goleador.nombre} ({goleador.cantidad})</li>
                                    ))
                                ) : (
                                    <li>Sin goles</li>
                                )}
                            </ul>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-12">
                            <div class="d-flex flex-wrap justify-content-center  small">
                                <span class="me-3"><i class="fas fa-map-marker-alt me-1"></i> MONTE ITO</span>
                                <span class="me-3"><i class="fas fa-trophy me-1"></i> TORNEO MAG 40 SÁBADOS</span>
                                <span><i class="fas fa-calendar-day me-1"></i>FECHA {partido.jornada}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="player-of-the-match">
                    <h6 class="fw-bold mb-2">Jugador del Partido</h6>
                    {
                        partido.foto_jugador_destacado && <img src={partido.foto_jugador_destacado ? partido.foto_jugador_destacado : ""} alt="Jugador del partido" class="player-img mb-2" />
                    }
                    <div class="fw-bold">{partido.jugador_destacado ? partido.jugador_destacado : ""}</div>
                    <div class=" small">{partido.equipo_jugador_destacado ? partido.equipo_jugador_destacado  : ""}</div>
                </div>
            </div>
        </div>
    )
}

export default InfoPartido