import db from "../config/db.js";

export const getTorneo = (req, res) => {
    const sql = 'SELECT * FROM torneo WHERE id = 1';
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error en la query:", err);
            res.status(500).json({ error: "Error del servidor" });
        } else {
            if (results.length > 0) {
                res.status(200).json(results[0]);
            } else {
                res.status(404).json({ error: "Torneo no encontrado" });
            }
        }
    });
};

export const actualizarTorneo = (req, res) => {
    const { nombre, descripcion, fecha } = req.body;
    const sql = `
        UPDATE torneo 
        SET nombre = ?, descripcion = ?, fecha = ? 
        WHERE id = 1
    `;

    db.query(sql, [nombre, descripcion, fecha], (err, result) => {
        if (err) {
            console.error("Error al actualizar torneo:", err);
            res.status(500).json({ error: "Error del servidor" });
        } else {
            res.json({ message: "Torneo actualizado correctamente" });
        }
    });
};