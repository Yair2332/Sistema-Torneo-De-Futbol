import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GoleadoresPartido({ partidoId, equipoLocalId, equipoVisitanteId }) {
    const [goleadores, setGoleadores] = useState([]);
    const [jugadoresLocal, setJugadoresLocal] = useState([]);
    const [jugadoresVisitante, setJugadoresVisitante] = useState([]);
    const [nuevoGoleador, setNuevoGoleador] = useState({
        jugador_id: '',
        equipo_id: '',
        cantidad: 1
    });

    // Cargar goleadores existentes
    const cargarGoleadores = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/partidos/goleadores/partido/${partidoId}`);
            setGoleadores(response.data);
        } catch (error) {
            console.error("Error al cargar goleadores:", error);
        }
    };

    // Cargar jugadores de ambos equipos
    const cargarJugadores = async () => {
        try {
            // Convertir IDs a números para asegurar consistencia
            const localId = Number(equipoLocalId);
            const visitanteId = Number(equipoVisitanteId);

            if (!localId || !visitanteId) return;

            console.log("Cargando jugadores para equipos:", { localId, visitanteId });

            const [local, visitante] = await Promise.all([
                axios.get(`http://localhost:3001/jugadores/BuscarJugadoresDeEquipo/${localId}`),
                axios.get(`http://localhost:3001/jugadores/BuscarJugadoresDeEquipo/${visitanteId}`)
            ]);

            console.log("Jugadores local recibidos:", local.data);
            console.log("Jugadores visitante recibidos:", visitante.data);

            setJugadoresLocal(local.data);
            setJugadoresVisitante(visitante.data);
        } catch (error) {
            console.error("Error al cargar jugadores:", error);
        }
    };

    useEffect(() => {
        if (partidoId && equipoLocalId && equipoVisitanteId) {
            cargarGoleadores();
            cargarJugadores();
        }
    }, [partidoId, equipoLocalId, equipoVisitanteId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevoGoleador(prev => ({
            ...prev,
            [name]: name === 'cantidad' ? parseInt(value) || 1 : value,
            // Resetear jugador_id cuando cambia el equipo
            ...(name === 'equipo_id' && { jugador_id: '' })
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/partidos/goleadores', {
                partido_id: partidoId,
                ...nuevoGoleador
            });
            cargarGoleadores();
            setNuevoGoleador({
                jugador_id: '',
                equipo_id: '',
                cantidad: 1
            });
        } catch (error) {
            console.error("Error al agregar goleador:", error);
        }
    };

    const handleEliminar = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/partidos/goleadores/${id}`);
            cargarGoleadores();
        } catch (error) {
            console.error("Error al eliminar goleador:", error);
        }
    };

    // Obtener jugadores según el equipo seleccionado
    const jugadoresDelEquipoSeleccionado = () => {
        if (!nuevoGoleador.equipo_id) return [];

        const equipoSeleccionado = Number(nuevoGoleador.equipo_id);
        const localId = Number(equipoLocalId);

        return equipoSeleccionado === localId
            ? jugadoresLocal
            : jugadoresVisitante;
    };

    return (
        <div className="mt-3" style={{ flexDirection: "column", maxWidth: "fit-content" }}>
            <h5>Goleadores</h5>

            {/* Formulario para agregar goleador */}
            <form onSubmit={handleSubmit} className="mb-3 row g-2 align-items-center">
                <div className="col-md-4">
                    <select
                        name="equipo_id"
                        value={nuevoGoleador.equipo_id}
                        onChange={handleChange}
                        className="form-control"
                        required
                    >
                        <option value="">Seleccionar equipo</option>
                        <option value={equipoLocalId}>Equipo Local</option>
                        <option value={equipoVisitanteId}>Equipo Visitante</option>
                    </select>
                </div>

                <div className="col-md-4">
                    <select
                        name="jugador_id"
                        value={nuevoGoleador.jugador_id}
                        onChange={handleChange}
                        className="form-control"
                        required
                        disabled={!nuevoGoleador.equipo_id}
                    >
                        <option value="">Seleccionar jugador</option>
                        {jugadoresDelEquipoSeleccionado().map(jugador => (
                            <option key={jugador.id} value={jugador.id}>
                                {jugador.nombre} (#{jugador.numero})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-md-2">
                    <input
                        type="number"
                        name="cantidad"
                        min="1"
                        value={nuevoGoleador.cantidad}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="col-md-2">
                    <button type="submit" className="btn btn-primary w-100">Agregar</button>
                </div>
            </form>

            {/* Lista de goleadores */}
            <table className="table table-sm table-dark">
                <thead>
                    <tr>
                        <th>Jugador</th>
                        <th>Equipo</th>
                        <th>Goles</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {goleadores.map(goleador => {
                        const jugador = [...jugadoresLocal, ...jugadoresVisitante].find(j => j.id === goleador.jugador_id);
                        const equipo = Number(goleador.equipo_id) === Number(equipoLocalId) ? 'Local' : 'Visitante';

                        return (
                            <tr key={goleador.id}>
                                <td>{jugador?.nombre || 'Desconocido'} (#{jugador?.numero})</td>
                                <td>{equipo}</td>
                                <td>{goleador.cantidad}</td>
                                <td>
                                    <button
                                        onClick={() => handleEliminar(goleador.id)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default GoleadoresPartido;