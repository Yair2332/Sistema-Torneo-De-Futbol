import React from 'react'

function CardPartido({ partido, setPartidoSelect }) {

    const formatDate=(dateString) =>{
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
        <a href='#info_partido' className="col-lg-4 col-md-6 col-sm-12 p-0 m-0" onClick={()=>{setPartidoSelect(partido.partido_id)}}>
            <div className="match-card">
                <div className="card-bg"></div>
                <div className="card-content">
                    <div className="teams-container">
                        <div className="team">
                            <img src={partido.logo_local} className="team-logo" alt={partido.equipo_local} />
                            <span className="team-name">{partido.equipo_local}</span>
                        </div>
                        <span className="vs-text">VS</span>
                        <div className="team">
                            <img src={partido.logo_visitante} className="team-logo" alt={partido.equipo_visitante} />
                            <span className="team-name">{partido.equipo_visitante}</span>
                        </div>
                    </div>
                    <div className="match-info">
                        <span className="match-date">
                            <i className="fas fa-calendar-alt me-2"></i>{formatDate(partido.fecha)}
                        </span>
                        <span className={`match-status ${partido.estado === 0 ? "status-pending" : partido.estado === 1 ? "status-finished" : "status-live"}`}><i className="fas fa-play me-1"></i>{partido.estado === 0 ? "Por definirse" : partido.estado === 1 ? "Finalizado" : "Sin Fecha Fija"}</span>
                    </div>
                </div>
            </div>
        </a>
    )
}

export default CardPartido