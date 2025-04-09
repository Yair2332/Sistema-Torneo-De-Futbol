import db from "../config/db.js";
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const buscarJugadoresDeEquipo = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM jugadores WHERE equipo_id =?', [id], (err, result) => {
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

export const buscarTodosLosJugadores = (req, res) => {
    db.query('SELECT * FROM jugadores', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error en el servidor');
        } else {
            res.send(result); 
        }
    });
};

export const buscarJugadoresPorNombre = (req, res) => {
    const nombre = req.body.buscador;

    const sql = 'SELECT * FROM jugadores WHERE nombre LIKE ?';
    const searchTerm = `%${nombre}%`;

    db.query(sql, [searchTerm], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error en el servidor');
        } else {
            res.send(result); 
        }
    });
};

export const actualizarJugador = (req, res) => {
    const { id, equipo_id, nombre, posicion, numero, goles, imgActual } = req.body;
    const file = req.file;
    let img = imgActual;

    if (file) {
        img = `http://localhost:3001/assets/${file.filename}`;
    }

    const sql = `UPDATE jugadores SET 
        equipo_id=?, nombre=?, posicion=?, numero=?, goles=?, img=? 
        WHERE id=?`;

    db.query(sql, [equipo_id, nombre, posicion, numero, goles, img, id],
        (err, result) => {
            if (err) {
                console.error("Error al actualizar jugador:", err);
                res.status(500).send("Error al actualizar jugador.");
            } else {
                res.send("Jugador actualizado correctamente.");
            }
        }
    );
};

export const agregarJugador = (req, res) => {
    const { equipo_id, nombre, posicion, numero, goles } = req.body;
    const file = req.file;
    const img = file ? `/assets/${file.filename}` : null;

    if (!equipo_id || !nombre || !posicion || !numero || !img) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    const sql = 'INSERT INTO jugadores (equipo_id, nombre, posicion, numero, goles, img) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(sql, [equipo_id, nombre, posicion, numero, goles || 0, img], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Jugador agregado correctamente", id: result.insertId });
    });
};

export const eliminarJugador = async (req, res) => {
    const { id } = req.params;
    const { img } = req.body;

    try {
        await db.query("DELETE FROM jugadores WHERE id = ?", [id]);

        if (img) {
            const imgPath = path.join(__dirname, '../client/public/assets', path.basename(img));

            if (fs.existsSync(imgPath)) {
                fs.unlink(imgPath, (err) => {
                    if (err) {
                        console.error("Error al eliminar imagen:", err);
                    }
                });
            }
        }

        res.status(200).json({ message: "Jugador eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar jugador:", error);
        res.status(500).json({ error: "Error al eliminar jugador" });
    }
};

export const getTopGoleadores = (req, res) => {
    const query = `
        SELECT 
            j.id,
            j.nombre,
            j.posicion,
            j.numero,
            j.img AS jugador_img,
            j.equipo_id,
            e.Nombre AS equipo_nombre,
            e.Img AS equipo_img,
            SUM(g.cantidad) AS goles_totales
        FROM jugadores j
        JOIN equipo e ON j.equipo_id = e.Id
        LEFT JOIN goleadores g ON j.id = g.jugador_id
        GROUP BY j.id, j.nombre, j.posicion, j.numero, j.img, j.equipo_id, e.Nombre, e.Img
        ORDER BY goles_totales DESC
        LIMIT 5
    `;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Error al obtener goleadores:", err);
            return res.status(500).json({ error: "Error en el servidor" });
        }

        const goleadores = result.map(jugador => ({
            ...jugador,
            goles_totales: jugador.goles_totales || 0
        }));

        res.json(goleadores);
    });
};