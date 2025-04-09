import db from "../config/db.js";
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getEquipos = (req, res) => {
    const sql = `
        SELECT e.Id, e.Nombre, e.Img, e.Pts, e.Dif, e.PJ, e.PG, e.PE, e.PP, e.Est,
            COALESCE(SUM(CASE WHEN p.equipo_local_id = e.Id THEN p.goles_local 
                              WHEN p.equipo_visitante_id = e.Id THEN p.goles_visitante 
                         ELSE 0 END), 0) AS GF,
            COALESCE(SUM(CASE WHEN p.equipo_local_id = e.Id THEN p.goles_visitante 
                              WHEN p.equipo_visitante_id = e.Id THEN p.goles_local 
                         ELSE 0 END), 0) AS GC
        FROM equipo e
        LEFT JOIN partido p ON e.Id = p.equipo_local_id OR e.Id = p.equipo_visitante_id
        GROUP BY e.Id
        ORDER BY e.Pts DESC, e.Dif DESC;
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al obtener los equipos");
        } else {
            res.send(result);
        }
    });
};

export const getEquipoInfo = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM equipo WHERE id=?', [id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error en el servidor');
        } else {
            if (result.length > 0) {
                res.send(result[0]);
            } else {
                res.status(404).send('Equipo no encontrado');
            }
        }
    });
};

export const buscarEquipos = (req, res) => {
    db.query('SELECT Id, Img, Nombre, Est, Pts FROM equipo', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error en el servidor');
        } else {
            if (result.length > 0) {
                res.send(result);
            } else {
                res.status(404).send('Equipo no encontrado');
            }
        }
    });
};

export const buscarEquiposNombre = (req, res) => {
    const nombre = req.query.nombre;

    if (!nombre) {
        return res.status(400).json({ error: "Debe proporcionar un nombre para buscar" });
    }

    const sql = 'SELECT Id, Img, Nombre, Pts FROM equipo WHERE Nombre LIKE ?';
    const searchTerm = `%${nombre}%`;

    db.query(sql, [searchTerm], (err, result) => {
        if (err) {
            console.error("Error en la búsqueda:", err);
            return res.status(500).json({ error: "Error en el servidor" });
        }
        res.json(result);
    });
};

export const buscarEstadisticas = (req, res) => {
    const id = req.params.id;
    db.query('SELECT Est FROM equipo WHERE id =?', [id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error en el servidor');
        } else {
            if (result.length > 0) {
                res.send(result[0]);
            } else {
                res.status(404).send('Equipo no encontrado');
            }
        }
    });
};

export const actualizarEquipo = (req, res) => {
    const equipoData = req.body;
    const file = req.file;

    if (!equipoData.Id || !equipoData.Nombre || !equipoData.Localidad) {
        return res.status(400).json({ error: "Datos incompletos" });
    }

    let nuevaImg = equipoData.ImgActual || '/assets/default-team-logo.png';

    if (file) {
        nuevaImg = `/assets/${file.filename}`;

        if (equipoData.ImgActual && !equipoData.ImgActual.includes('default-team-logo.png')) {
            const imgPath = path.join(__dirname, '../client/public', equipoData.ImgActual);
            if (fs.existsSync(imgPath)) {
                fs.unlinkSync(imgPath);
            }
        }
    }

    const sql = `UPDATE equipo SET 
        Nombre = ?, 
        Img = ?, 
        Pts = ?, 
        Dif = ?, 
        PJ = ?, 
        PG = ?, 
        PE = ?, 
        PP = ?, 
        Est = ?, 
        Entrenador = ?, 
        Capitan = ?, 
        Localidad = ?, 
        Fundado = ?, 
        Contacto = ?, 
        Email = ? 
        WHERE Id = ?`;

    const params = [
        equipoData.Nombre,
        nuevaImg,
        equipoData.Pts,
        equipoData.Dif,
        equipoData.PJ,
        equipoData.PG,
        equipoData.PE,
        equipoData.PP,
        equipoData.Est,
        equipoData.Entrenador,
        equipoData.Capitan,
        equipoData.Localidad,
        equipoData.Fundado,
        equipoData.Contacto,
        equipoData.Email,
        equipoData.Id
    ];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error("Error al actualizar equipo:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        }

        res.status(200).json({
            message: "Equipo actualizado correctamente",
            equipoData: { ...equipoData, Img: nuevaImg }
        });
    });
};

export const actualizarEstadisticasEquipo = (req, res) => {
    const { Id, Est } = req.body;
    const idNumerico = parseInt(Id);

    if (!idNumerico || Est === undefined) {
        return res.status(400).json({ error: "ID de equipo y estadísticas requeridos" });
    }

    const resultados = Est.split(',').map(r => r.trim());
    const PG = resultados.filter(r => r === '1').length;
    const PE = resultados.filter(r => r === '0').length;
    const PP = resultados.filter(r => r === '-1').length;
    const PJ = resultados.length;
    const Pts = (PG * 3) + PE;

    const sqlGoles = `
        SELECT
            COALESCE(SUM(CASE WHEN equipo_local_id = ? THEN goles_local ELSE 0 END), 0) +
            COALESCE(SUM(CASE WHEN equipo_visitante_id = ? THEN goles_visitante ELSE 0 END), 0) AS goles_a_favor,
            COALESCE(SUM(CASE WHEN equipo_local_id = ? THEN goles_visitante ELSE 0 END), 0) +
            COALESCE(SUM(CASE WHEN equipo_visitante_id = ? THEN goles_local ELSE 0 END), 0) AS goles_en_contra
        FROM partido
        WHERE equipo_local_id = ? OR equipo_visitante_id = ?
    `;

    const params = [idNumerico, idNumerico, idNumerico, idNumerico, idNumerico, idNumerico];

    db.query(sqlGoles, params, (err, golesResult) => {
        if (err) {
            console.error("Error al calcular diferencia de gol:", err);
            return res.status(500).json({ error: "Error al calcular goles" });
        }

        const golesFavor = golesResult[0].goles_a_favor;
        const golesContra = golesResult[0].goles_en_contra;
        const Dif = golesFavor - golesContra;

        const sqlUpdate = `
            UPDATE equipo 
            SET Est = ?, PJ = ?, PG = ?, PE = ?, PP = ?, Pts = ?, Dif = ?
            WHERE Id = ?
        `;

        db.query(sqlUpdate, [Est, PJ, PG, PE, PP, Pts, Dif, idNumerico], (err, result) => {
            if (err) {
                console.error("Error al actualizar estadísticas:", err);
                return res.status(500).json({ error: "Error en la base de datos" });
            }

            db.query('SELECT * FROM equipo WHERE Id = ?', [idNumerico], (err, equipo) => {
                if (err) return res.status(500).json({ error: "Error al obtener datos actualizados" });
                res.status(200).json({
                    message: "Estadísticas actualizadas correctamente",
                    equipoData: equipo[0]
                });
            });
        });
    });
};

export const eliminarEquipo = async (req, res) => {
    const { id } = req.params;

    try {
        await new Promise((resolve, reject) => {
            db.beginTransaction(err => {
                if (err) reject(err);
                else resolve();
            });
        });

        const equipoResult = await new Promise((resolve, reject) => {
            db.query('SELECT Img FROM equipo WHERE Id = ?', [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (equipoResult.length === 0) {
            await new Promise((resolve, reject) => {
                db.rollback(err => {
                    if (err) reject(err);
                    else resolve();
                });
            });
            return res.status(404).json({ error: "Equipo no encontrado" });
        }

        const equipo = equipoResult[0];
        const jugadoresResult = await new Promise((resolve, reject) => {
            db.query('SELECT id, img FROM jugadores WHERE equipo_id = ?', [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        await new Promise((resolve, reject) => {
            db.query(`
                DELETE g FROM goleadores g
                JOIN partido p ON g.partido_id = p.id
                WHERE p.equipo_local_id = ? OR p.equipo_visitante_id = ?
            `, [id, id], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        await new Promise((resolve, reject) => {
            db.query('DELETE FROM partido WHERE equipo_local_id = ? OR equipo_visitante_id = ?', [id, id], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        await new Promise((resolve, reject) => {
            db.query('DELETE FROM jugadores WHERE equipo_id = ?', [id], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        await new Promise((resolve, reject) => {
            db.query('DELETE FROM equipo WHERE Id = ?', [id], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        try {
            if (equipo.Img && !equipo.Img.includes('default-team-logo.png')) {
                const equipoImgPath = path.join(__dirname, '../client/public', equipo.Img);
                if (fs.existsSync(equipoImgPath)) {
                    fs.unlinkSync(equipoImgPath);
                }
            }

            jugadoresResult.forEach(jugador => {
                if (jugador.img) {
                    const imgName = jugador.img.startsWith('http')
                        ? path.basename(new URL(jugador.img).pathname)
                        : path.basename(jugador.img);
                    const jugadorImgPath = path.join(__dirname, '../client/public/assets', imgName);
                    if (fs.existsSync(jugadorImgPath)) {
                        fs.unlinkSync(jugadorImgPath);
                    }
                }
            });
        } catch (error) {
            console.error("Error al eliminar imágenes:", error);
        }

        await new Promise((resolve, reject) => {
            db.commit(err => {
                if (err) {
                    db.rollback(() => reject(err));
                } else {
                    resolve();
                }
            });
        });

        res.status(200).json({ message: "Equipo y todos sus datos relacionados eliminados correctamente" });

    } catch (error) {
        try {
            await new Promise((resolve, reject) => {
                db.rollback(err => {
                    if (err) reject(err);
                    else resolve();
                });
            });
        } catch (rollbackError) {
            console.error("Error en rollback:", rollbackError);
        }

        console.error("Error al eliminar equipo:", error);
        res.status(500).json({ error: "Error al eliminar equipo y sus datos relacionados" });
    }
};

export const agregarEquipo = async (req, res) => {
    try {
        const { Nombre, Localidad, Entrenador, Capitan, Fundado, Contacto, Email } = req.body;
        const file = req.file;

        if (!Nombre || !Localidad) {
            return res.status(400).json({ error: "Nombre y Localidad son campos requeridos" });
        }

        const img = file ? `/assets/${file.filename}` : '/assets/default-team-logo.png';

        await new Promise((resolve, reject) => {
            db.beginTransaction(err => {
                if (err) return reject(err);
                resolve();
            });
        });

        const insertEquipoQuery = `
            INSERT INTO equipo 
            (Nombre, Img, Pts, Dif, PJ, PG, PE, PP, Est, Entrenador, Capitan, Localidad, Fundado, Contacto, Email) 
            VALUES (?, ?, 0, 0, 0, 0, 0, 0, 0, ?, ?, ?, ?, ?, ?)
        `;

        const equipoResult = await new Promise((resolve, reject) => {
            db.query(
                insertEquipoQuery,
                [
                    Nombre,
                    img,
                    Entrenador || null,
                    Capitan || null,
                    Localidad,
                    Fundado || null,
                    Contacto || null,
                    Email || null
                ],
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                }
            );
        });

        const nuevoEquipoId = equipoResult.insertId;
        const equiposExistentes = await new Promise((resolve, reject) => {
            db.query(
                'SELECT Id FROM equipo WHERE Id != ?',
                [nuevoEquipoId],
                (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                }
            );
        });

        if (equiposExistentes.length > 0) {
            const fechaPorDefecto = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const insertPartidoQuery = `
                INSERT INTO partido 
                (equipo_local_id, equipo_visitante_id, goles_local, goles_visitante, ganador_id, fecha, estado, jornada) 
                VALUES (?, ?, 0, 0, NULL, ?, 2, 0)
            `;

            for (const equipo of equiposExistentes) {
                await new Promise((resolve, reject) => {
                    db.query(
                        insertPartidoQuery,
                        [nuevoEquipoId, equipo.Id, fechaPorDefecto],
                        (err) => {
                            if (err) return reject(err);
                            resolve();
                        }
                    );
                });
            }
        }

        await new Promise((resolve, reject) => {
            db.commit(err => {
                if (err) return reject(err);
                resolve();
            });
        });

        res.status(200).json({
            success: true,
            message: "Equipo agregado correctamente" +
                (equiposExistentes.length > 0 ? " y partidos locales generados" : ""),
            equipoId: nuevoEquipoId
        });

    } catch (error) {
        await new Promise((resolve, reject) => {
            db.rollback(() => {
                resolve();
            });
        });

        res.status(500).json({
            success: false,
            error: "Error al agregar equipo",
            details: error.message,
            sqlError: error.code === 'ER_BAD_NULL_ERROR' ? "La fecha del partido no puede ser nula" : undefined
        });
    }
};