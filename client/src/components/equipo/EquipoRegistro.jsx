import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EquipoRegistro({ equipo, index, setEquipoSelect }) {
    const [estadisticas, setEstadisticas] = useState({
        PJ: 0, PG: 0, PE: 0, PP: 0, Pts: 0, GF: equipo.GF, GC: equipo.GC, Dif: equipo.Dif
    });

    useEffect(() => {
        if (equipo.Est) {
            const resultados = equipo.Est.split(',').map(r => r.trim());

            const PG = resultados.filter(r => r === '1').length;
            const PE = resultados.filter(r => r === '0').length;
            const PP = resultados.filter(r => r === '-1').length;
            const PJ = resultados.length;
            const Pts = (PG * 3) + PE; 

            setEstadisticas(prevState => ({ ...prevState, PJ, PG, PE, PP, Pts }));
        }
    }, [equipo.Est]);

    // Obtener estadísticas actualizadas desde el backend
    useEffect(() => {
        axios.get(`http://localhost:3001/equipo/${equipo.Id}`)
            .then(response => {
                if (response.data) {
                    setEstadisticas(prevState => ({ 
                        ...prevState, 
                        Dif: response.data.Dif,
                        GF: response.data.GF,
                        GC: response.data.GC
                    }));
                }
            })
            .catch(error => {
                console.error("Error al obtener las estadísticas del equipo:", error);
            });
    }, [equipo.Id]);

    return (
        <tr onClick={() => { setEquipoSelect(equipo.Id); }}>
            <th scope="row">{index + 1}</th>
            <td>
                <div className="d-flex align-items-center">
                    <img src={equipo.Img} className="team-logo me-2 rounded-circle" alt={equipo.Nombre} />
                    <span className="team-name"><a href="/#info_equipo">{equipo.Nombre}</a></span>
                </div>
            </td>
            <td className="fw-bold text-warning"><i className="fas fa-star text-warning" title="Puntos"></i> {estadisticas.Pts}</td>
            <td><i className="fas fa-futbol text-success" title="Goles a Favor"></i> {estadisticas.GF}</td>
            <td><i className="fas fa-futbol text-danger" title="Goles en Contra"></i> {estadisticas.GC}</td>
            <td><i className="fas fa-sort-numeric-up-alt text-info" title="Diferencia de Goles"></i> {estadisticas.Dif}</td>
            <td><i className="fas fa-calendar-alt text-secondary" title="Partidos Jugados"></i> {estadisticas.PJ}</td>
            <td className="text-success"><i className="fas fa-check-circle text-success" title="Partidos Ganados"></i> {estadisticas.PG}</td>
            <td><i className="fas fa-equals text-primary" title="Partidos Empatados"></i> {estadisticas.PE}</td>
            <td className="text-danger"><i className="fas fa-times-circle text-danger" title="Partidos Perdidos"></i> {estadisticas.PP}</td>
        </tr>
    );
}

export default EquipoRegistro;
