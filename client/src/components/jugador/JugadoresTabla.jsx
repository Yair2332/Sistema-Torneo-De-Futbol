import axios from 'axios';
import React, { useEffect, useState } from 'react';

function JugadoresTabla({ idEquipo, isAdmin, buscador }) {
    const [jugadores, setJugadores] = useState([]);

    const eliminarJugador = async (id, img) => {
        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este jugador?");
        if (confirmar) {
            try {
                await axios.delete(`http://localhost:3001/jugadores/eliminarJugador/${id}`, {
                    data: { img }
                });
                setJugadores(jugadores.filter(j => j.id !== id));
            } catch (error) {
                console.error("Error al eliminar jugador:", error);
            }
        }
    };

    const buscarJugadores = async (id) => {
        try {
            let response;
            if (buscador) {
                response = await axios.post(`http://localhost:3001/jugadores/BuscarJugadoresPorNombre`, { buscador });
            }
            else {
                if (!id) {
                    response = await axios.get(`http://localhost:3001/jugadores/BuscarTodosLosJugadores`);
                } else {
                    response = await axios.get(`http://localhost:3001/jugadores/BuscarJugadoresDeEquipo/${id}`);
                }
            }
            if (response.data) {
                setJugadores(response.data);
            }
        } catch (e) {
            console.error("Error al obtener jugadores:", e);
        }
    };

    useEffect(() => {
        buscarJugadores(idEquipo ?? "");
    }, [idEquipo, buscador]); 
    

    const handleChange = (index, field, value) => {
        const nuevosJugadores = [...jugadores];
        nuevosJugadores[index][field] = value;
        setJugadores(nuevosJugadores);
    };

    const handleFileChange = (index, file) => {
        const nuevosJugadores = [...jugadores];
        nuevosJugadores[index].nuevaImagen = file;
        setJugadores(nuevosJugadores);
    };

    const actualizarJugador = async (index) => {
        const jugador = jugadores[index];
        const formData = new FormData();

        formData.append("id", jugador.id);
        formData.append("equipo_id", idEquipo);
        formData.append("nombre", jugador.nombre);
        formData.append("posicion", jugador.posicion);
        formData.append("numero", jugador.numero);
        formData.append("goles", jugador.goles);
        formData.append("imgActual", jugador.img);

        if (jugador.nuevaImagen) {
            formData.append("img", jugador.nuevaImagen);
        }

        try {
            const response = await axios.post('http://localhost:3001/jugadores/ActualizarJugador', formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            if (response.status === 200) {
                alert("Jugador actualizado correctamente.");
                buscarJugadores(idEquipo ?? ""); // Volver a cargar jugadores
            }
        } catch (error) {
            console.error('Error al actualizar jugador:', error);
            alert("Error al actualizar el jugador.");
        }
    };

    return (
        <div className='jugadores-lista'>
            {jugadores.map((jugador, index) => (
                <div className='card bg-dark p-2 w-100' key={jugador.id}>
                    <div>
                        <img src={jugador.img} alt='Jugador' className="player-img" />
                    </div>
                    <p>
                        <input
                            type="text"
                            className='inputsAdmin text-center w-100 p-0'
                            value={jugador.nombre}
                            readOnly={!isAdmin}
                            onChange={(e) => handleChange(index, 'nombre', e.target.value)}
                        />
                    </p>
                    <p>
                        <input
                            type="text"
                            className='inputsAdmin text-center w-100 p-0'
                            value={jugador.posicion}
                            readOnly={!isAdmin}
                            onChange={(e) => handleChange(index, 'posicion', e.target.value)}
                        />
                    </p>
                    <p>
                        <input
                            type="text"
                            className='inputsAdmin text-center w-100 p-0'
                            value={jugador.numero}
                            readOnly={!isAdmin}
                            onChange={(e) => handleChange(index, 'numero', e.target.value)}
                        />
                    </p>

                    {isAdmin && (
                        <p>
                            <input
                                type="file"
                                className='inputsAdmin text-center w-100 p-0'
                                onChange={(e) => handleFileChange(index, e.target.files[0])}
                            />
                        </p>
                    )}

                    {isAdmin && (
                        <div>
                            <button className="btn btn-success mb-1" onClick={() => actualizarJugador(index)}>Actualizar</button>
                            <button className="btn btn-danger" onClick={() => eliminarJugador(jugador.id, jugador.img)}>
                                Eliminar
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default JugadoresTabla;
