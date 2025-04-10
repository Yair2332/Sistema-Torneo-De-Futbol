import axios from "axios";
import { useEffect, useState } from "react";
import EquipoRegistro from "../equipo/EquipoRegistro";

function TablaPuntaje({ setEquipoSelect }) {
    const [equipos, setEquipos] = useState([]);

    const buscarEquipos = async () => {
        await axios.get('http://localhost:3001/equipos/')
            .then((response) => {
                if (response.data) {
                    setEquipos(response.data);
                }
            }).catch((e) => { alert(e) });
    };

    useEffect(() => {
        buscarEquipos();
    }, []);

    return (
        <div className="container mt-2 p-0 tournament-card shadow-lg fs-3 bg-dark">
            <h2 className=" titulacion fs-2 bg-dark w-100 mb-2">
            Tabla de puntajes
            </h2>
            <div className="table-responsive">
                <table className="table table-dark table-hover table-striped mb-0">
                   
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col" id="equipo">Equipo</th>
                            <th scope="col"><i className="fas fa-star text-warning" title="Puntos"></i> Pts</th>
                            <th scope="col"><i className="fas fa-futbol text-success" title="Goles a Favor"></i> GF</th>
                            <th scope="col"><i className="fas fa-futbol text-danger" title="Goles en Contra"></i> GC</th>
                            <th scope="col"><i className="fas fa-sort-numeric-up-alt text-info" title="Diferencia de Goles"></i> Dif.</th>
                            <th scope="col"><i className="fas fa-calendar-alt text-secondary" title="Partidos Jugados"></i> PJ</th>
                            <th scope="col"><i className="fas fa-check-circle text-success" title="Partidos Ganados"></i> PG</th>
                            <th scope="col"><i className="fas fa-equals text-primary" title="Partidos Empatados"></i> PE</th>
                            <th scope="col"><i className="fas fa-times-circle text-danger" title="Partidos Perdidos"></i> PP</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {equipos.map((equipo, index) => (
                            <EquipoRegistro 
                                key={equipo.Id} 
                                equipo={equipo} 
                                index={index} 
                                setEquipoSelect={setEquipoSelect} 
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TablaPuntaje;
