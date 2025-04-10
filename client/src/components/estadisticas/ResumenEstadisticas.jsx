
import React, { useState, useEffect } from 'react';

function ResumenEstadisticas({ estadisticas}) {
    const [difGoles, setDifGoles] = useState(0);
    const [estadisticasCalculadas, setEstadisticasCalculadas] = useState({
        PJ: 0, PG: 0, PE: 0, PP: 0, Pts: 0
    });

    useEffect(() => {
        if (estadisticas.Dif) {
            setDifGoles(estadisticas.Dif);
        }
        
    }, [estadisticas]);

    useEffect(() => {
        if (estadisticas?.Est) {
            const resultados = estadisticas.Est.split(',').map(r => r.trim());

            const PG = resultados.filter(r => r === '1').length;
            const PE = resultados.filter(r => r === '0').length;
            const PP = resultados.filter(r => r === '-1').length;
            const PJ = resultados.length;
            const Pts = (PG * 3) + PE;

            setEstadisticasCalculadas({ PJ, PG, PE, PP, Pts });
        }
    }, [estadisticas]);

 
    

    return (
        <div className="p-3 border-top">
            <h4>Estadísticas del Equipo</h4>
            <div className="row">
                <div className="col-md-4"><strong>Partidos Jugados:</strong> {estadisticasCalculadas.PJ}</div>
                <div className="col-md-4"><strong>Ganados:</strong> {estadisticasCalculadas.PG}</div>
                <div className="col-md-4"><strong>Empatados:</strong> {estadisticasCalculadas.PE}</div>
                <div className="col-md-4"><strong>Perdidos:</strong> {estadisticasCalculadas.PP}</div>
                <div className="col-md-4"><strong>Puntos:</strong> {estadisticasCalculadas.Pts}</div>
                <div className="col-md-4"><strong>Diferencia de Goles:</strong> {difGoles}</div>
            </div>
        </div>
    );
}

export default ResumenEstadisticas;
