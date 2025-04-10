import React, { useEffect, useState } from 'react';
import Equipo from '../equipo/Equipo';
import JugadoresTabla from '../jugador/JugadoresTabla';
import FormularioEquipo from '../equipo/FormularioEquipo';
import FormularioJugador from '../jugador/FormularioJugador';
import TablaPartidos from '../partido/TablaPartidos';
import axios from 'axios';

function Administrados({ isAdmin }) {
    const [equipos, setEquipos] = useState([]);
    const [idEquipoSeleccionado, setIdEquipoSeleccionado] = useState(null);
    const [partidos, setPartidos] = useState([]);
    const [jugadores, setJugadores] = useState([]);

    const buscarEquipos = async () => {
        try {
            const response = await axios.get('http://localhost:3001/equipos/buscarEquipos');
            setEquipos(response.data);
            if (response.data.length > 0) {
                setIdEquipoSeleccionado(response.data[0].Id);
            }
        } catch (e) {
            console.error("Error al obtener equipos:", e);
            setEquipos([]);
        }
    };

    const buscarPartidos = async (idEquipo) => {
        if (!idEquipo) return;
        try {
            const response = await axios.get(`http://localhost:3001/partidos/buscarPartidosDetalles/${idEquipo}`);
            setPartidos(response.data);
        } catch (error) {
            console.error("Error al obtener partidos:", error);
            setPartidos([]);
        }
    };

    const buscarJugadores = async (idEquipo) => {
        try {
            const response = await axios.get(`http://localhost:3001/jugadores/BuscarTodosLosJugadores`);
            setJugadores(response.data);
        } catch (error) {
            console.error("Error al obtener jugadores:", error);
            setJugadores([]);
        }
    };

    useEffect(() => {
        buscarEquipos();
    }, []);

    useEffect(() => {
        if (idEquipoSeleccionado) {
            buscarPartidos(idEquipoSeleccionado);
            buscarJugadores(idEquipoSeleccionado);
        }
    }, [idEquipoSeleccionado]);

    const handleCambioPartido = (index, field, value) => {
        const nuevosPartidos = [...partidos];
        nuevosPartidos[index][field] = value;
        setPartidos(nuevosPartidos);
    };

    const handleActualizarPartido = async (partido) => {
        try {
            await axios.post('http://localhost:3001/partidos/actualizarPartido', partido);
            buscarPartidos(idEquipoSeleccionado);
        } catch (error) {
            console.error("Error al actualizar partido:", error);
        }
    };


    const [torneo, setTorneo] = useState({
        id: '',
        nombre: '',
        descripcion: '',
        fecha: '',
    });

    // Función para traer datos del torneo
    const obtenerTorneo = async () => {
        try {
            const response = await axios.get('http://localhost:3001/torneo');
    
            const datos = response.data;
    
            // 👇 Ajustamos la fecha si es necesario
            const fechaFormateada = datos.fecha ? datos.fecha.substring(0, 10) : '';
    
            setTorneo({
                ...datos,
                fecha: fechaFormateada,
            });
        } catch (error) {
            console.error('Error al obtener datos del torneo:', error);
        }
    };
    

    // Función para guardar cambios
    const actualizarTorneo = async () => {
        try {
            await axios.post('http://localhost:3001/torneo/torneoActualizacion', torneo);
            alert("Torneo actualizado correctamente.");
        } catch (error) {
            console.error('Error al actualizar torneo:', error);
            alert("Hubo un error al actualizar el torneo.");
        }
    };

    useEffect(() => {
        obtenerTorneo();
    }, []);

    return (
        <div className="container w-100 administrador rounded-3 mt-2">
            <div className="row p-0">
                <h2 className="bg-dark titulacion w-100 fs-2">Panel de Administración</h2>
                <main className="col-md-12 w-100">
                <section id="configuracion" className="section-container rounded-2 mb-2">
                        <h3>Configuración del Torneo</h3>
                        <form className='p-2'>
                            <label className="form-label">Nombre del Torneo:</label>
                            <input 
                                type="text" 
                                className="form-control mb-2" 
                                value={torneo.nombre}
                                onChange={(e) => setTorneo({ ...torneo, nombre: e.target.value })}
                            />

                            <label className="form-label">Descripción del Torneo:</label>
                            <input 
                                type="text" 
                                className="form-control mb-2" 
                                value={torneo.descripcion}
                                onChange={(e) => setTorneo({ ...torneo, descripcion: e.target.value })}
                            />

                            <label className="form-label">Fecha de Inicio:</label>
                            <input 
                                type="date" 
                                className="form-control mb-2" 
                                value={torneo.fecha}
                                onChange={(e) => setTorneo({ ...torneo, fecha: e.target.value })}
                            />

                            <button 
                                className="btn btn-primary mt-2" 
                                type="button"
                                onClick={actualizarTorneo}
                            >
                                Guardar Cambios
                            </button>
                        </form>
                    </section>
                    
                    <section id="equipos" className="section-container rounded-3">
                        <h3>Equipos</h3>
                        <select
                            className="form-control mb-4"
                            value={idEquipoSeleccionado || ""}
                            onChange={(e) => {
                                const id = parseInt(e.target.value, 10);
                                setIdEquipoSeleccionado(id);
                            }}
                        >
                            {equipos.map((equipo) => (
                                <option key={equipo.Id} value={equipo.Id}>
                                    {equipo.Nombre}
                                </option>
                            ))}
                        </select>
                        <FormularioEquipo 
                            isAdmin={isAdmin} 
                            onEquipoAgregado={buscarEquipos} 
                        />
                        <Equipo idEquipo={idEquipoSeleccionado} isAdmin={isAdmin} />
                    </section>
                    
                    <section id="jugadores" className="section-container rounded-3 table-responsive">
                        <h3>Jugadores del Equipo</h3>
                        <FormularioJugador
                            isAdmin={isAdmin}
                            idEquipoSeleccionado={idEquipoSeleccionado}
                            onJugadorAgregado={() => buscarJugadores(idEquipoSeleccionado)}
                        />
                        <JugadoresTabla idEquipo={idEquipoSeleccionado} isAdmin={isAdmin} />
                    </section>
                    
                    <section id="resultados" className="section-container rounded-3 mb-3 table-responsive">
                        <h3>Resultados y Estadísticas</h3>
                        <TablaPartidos
                            partidos={partidos}
                            jugadores={jugadores}
                            onCambioPartido={handleCambioPartido}
                            onActualizarPartido={handleActualizarPartido}
                        />
                    </section>
                </main>
            </div>
        </div>
    );
}

export default Administrados;