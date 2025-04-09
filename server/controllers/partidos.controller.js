import db from "../config/db.js";

const actualizarDiferenciaGoles = async (equipo_id) => {
    try {
        const sql = `
            UPDATE equipo 
            SET Dif = (
                SELECT COALESCE(SUM(goles_local - goles_visitante), 0) 
                FROM partido 
                WHERE equipo_local_id = ?
            ) + (
                SELECT COALESCE(SUM(goles_visitante - goles_local), 0) 
                FROM partido 
                WHERE equipo_visitante_id = ?
            )
            WHERE id = ?;
        `;

        await db.query(sql, [equipo_id, equipo_id, equipo_id]);
    } catch (error) {
        console.error(`Error al actualizar diferencia de goles del equipo ${equipo_id}:`, error);
    }
};

export const buscarPartidoPorId = (req, res) => {
    const id = req.params.id;

    const query = `
        SELECT 
            p.id AS partido_id,
            el.nombre AS equipo_local,
            el.img AS logo_local,
            p.goles_local,
            ev.nombre AS equipo_visitante,
            ev.img AS logo_visitante,
            p.goles_visitante,
            e_ganador.nombre AS ganador,
            p.fecha,
            p.estado,
            p.jornada,
            j.nombre AS jugador_destacado,
            j.posicion,
            j.numero,
            j.img AS foto_jugador_destacado,
            eq.nombre AS equipo_jugador_destacado,
            g.jugador_id,
            g.cantidad,
            jug.nombre AS goleador_nombre,
            eq_g.nombre AS equipo_goleador
        FROM partido p
        JOIN equipo el ON p.equipo_local_id = el.id
        JOIN equipo ev ON p.equipo_visitante_id = ev.id
        LEFT JOIN equipo e_ganador ON p.ganador_id = e_ganador.id
        LEFT JOIN jugadores j ON p.jugador_destacado_id = j.id
        LEFT JOIN equipo eq ON j.equipo_id = eq.id
        LEFT JOIN goleadores g ON p.id = g.partido_id
        LEFT JOIN jugadores jug ON g.jugador_id = jug.id
        LEFT JOIN equipo eq_g ON jug.equipo_id = eq_g.id
        WHERE p.id = ?;
    `;

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error en el servidor');
        } else {
            if (result.length > 0) {
                const partidoData = {
                    partido_id: result[0].partido_id,
                    equipo_local: result[0].equipo_local,
                    logo_local: result[0].logo_local,
                    goles_local: result[0].goles_local,
                    equipo_visitante: result[0].equipo_visitante,
                    logo_visitante: result[0].logo_visitante,
                    goles_visitante: result[0].goles_visitante,
                    ganador: result[0].ganador,
                    fecha: result[0].fecha,
                    estado: result[0].estado,
                    jornada: result[0].jornada,
                    jugador_destacado: result[0].jugador_destacado,
                    foto_jugador_destacado: result[0].foto_jugador_destacado,
                    equipo_jugador_destacado: result[0].equipo_jugador_destacado,
                    goleadores: {}
                };

                result.forEach(row => {
                    if (row.goleador_nombre) {
                        if (!partidoData.goleadores[row.equipo_goleador]) {
                            partidoData.goleadores[row.equipo_goleador] = [];
                        }
                        partidoData.goleadores[row.equipo_goleador].push({
                            nombre: row.goleador_nombre,
                            cantidad: row.cantidad
                        });
                    }
                });

                res.json(partidoData);
            } else {
                res.status(404).send('Partido no encontrado');
            }
        }
    });
};

export const buscarPartidos = (req, res) => {
    const idEquipo = req.params.id;

    let query = `
        SELECT 
            p.id AS partido_id, 
            el.nombre AS equipo_local, el.img AS logo_local, 
            ev.nombre AS equipo_visitante, ev.img AS logo_visitante, 
            p.fecha, p.estado 
        FROM partido p 
        JOIN equipo el ON p.equipo_local_id = el.id 
        JOIN equipo ev ON p.equipo_visitante_id = ev.id
    `;

    let params = [];

    if (idEquipo) {
        query += " WHERE p.equipo_local_id = ? OR p.equipo_visitante_id = ?";
        params = [idEquipo, idEquipo];
    }

    db.query(query, params, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error en el servidor');
        } else {
            res.send(result.length > 0 ? result : []);
        }
    });
};

export const buscarPartidosPorNombre = (req, res) => {
    const nombreEquipo = req.query.nombre;

    if (!nombreEquipo) {
        return res.status(400).send('Debe proporcionar un nombre de equipo');
    }

    const query = `
        SELECT 
            p.id AS partido_id, 
            el.nombre AS equipo_local, el.img AS logo_local, 
            ev.nombre AS equipo_visitante, ev.img AS logo_visitante, 
            p.fecha, p.estado 
        FROM partido p 
        JOIN equipo el ON p.equipo_local_id = el.id 
        JOIN equipo ev ON p.equipo_visitante_id = ev.id
        WHERE el.nombre LIKE ? OR ev.nombre LIKE ?
    `;

    const searchTerm = `%${nombreEquipo}%`;

    db.query(query, [searchTerm, searchTerm], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error en el servidor');
        } else {
            res.send(result.length > 0 ? result : []);
        }
    });
};

export const buscarPartidosDetalles = (req, res) => {
    const idEquipo = req.params.id;

    let query = `
        SELECT 
            p.id AS partido_id, 
            p.equipo_local_id, p.equipo_visitante_id,
            el.nombre AS equipo_local, el.img AS logo_local, 
            ev.nombre AS equipo_visitante, ev.img AS logo_visitante, 
            p.fecha, p.estado, p.goles_local, p.goles_visitante, 
            p.ganador_id, p.jornada, p.jugador_destacado_id
        FROM partido p 
        JOIN equipo el ON p.equipo_local_id = el.id 
        JOIN equipo ev ON p.equipo_visitante_id = ev.id
    `;

    let params = [];

    if (idEquipo) {
        query += " WHERE p.equipo_local_id = ? OR p.equipo_visitante_id = ?";
        params = [idEquipo, idEquipo];
    }

    db.query(query, params, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error en el servidor');
        } else {
            res.send(result.length > 0 ? result : []);
        }
    });
};

export const actualizarPartido = async (req, res) => {
    const { partido_id, fecha, goles_local, goles_visitante, ganador_id, estado, jornada, jugador_destacado_id, equipo_local_id, equipo_visitante_id } = req.body;

    try {
        const ganadorIdValido = ganador_id === '' ? null : ganador_id;

        const sql = `
            UPDATE partido 
            SET fecha = ?, 
                goles_local = ?, 
                goles_visitante = ?, 
                ganador_id = ?, 
                estado = ?, 
                jornada = ?, 
                jugador_destacado_id = ?
            WHERE id = ?
        `;

        await db.query(sql, [
            fecha,
            goles_local,
            goles_visitante,
            ganadorIdValido,
            estado,
            jornada,
            jugador_destacado_id,
            partido_id
        ]);

        await actualizarDiferenciaGoles(equipo_local_id);
        await actualizarDiferenciaGoles(equipo_visitante_id);

        res.status(200).json({ message: "Partido actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar partido:", error);
        res.status(500).json({ error: "Error al actualizar partido" });
    }
};

export const getGoleadoresPartido = (req, res) => {
    const { partidoId } = req.params;
    const query = `
        SELECT g.*, j.nombre as jugador_nombre, j.numero, e.nombre as equipo_nombre 
        FROM goleadores g
        JOIN jugadores j ON g.jugador_id = j.id
        JOIN equipo e ON g.equipo_id = e.Id
        WHERE g.partido_id = ?
    `;

    db.query(query, [partidoId], (err, results) => {
        if (err) {
            console.error("Error al obtener goleadores:", err);
            return res.status(500).json({ error: "Error al obtener goleadores" });
        }
        res.json(results);
    });
};

export const agregarGoleador = (req, res) => {
    const { partido_id, jugador_id, equipo_id, cantidad } = req.body;

    if (!partido_id || !jugador_id || !equipo_id || !cantidad) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    const sql = 'INSERT INTO goleadores (partido_id, jugador_id, equipo_id, cantidad) VALUES (?, ?, ?, ?)';

    db.query(sql, [partido_id, jugador_id, equipo_id, cantidad], (err, result) => {
        if (err) {
            console.error("Error al agregar goleador:", err);
            return res.status(500).json({ error: "Error al agregar goleador" });
        }

        res.status(201).json({
            message: "Goleador agregado correctamente",
            id: result.insertId
        });
    });
};

export const eliminarGoleador = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM goleadores WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error("Error al eliminar goleador:", err);
            return res.status(500).json({ error: "Error al eliminar goleador" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Goleador no encontrado" });
        }

        res.status(200).json({ message: "Goleador eliminado correctamente" });
    });
};