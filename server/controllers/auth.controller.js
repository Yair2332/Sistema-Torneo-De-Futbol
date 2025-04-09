import jwt from 'jsonwebtoken';
import db from "../config/db.js";

const generarToken = (userId) => {
    return jwt.sign({ id: userId }, 'torneo_extra_oficial', { expiresIn: '1h' });
};

export const login = (req, res) => {
    const { correo, password } = req.body;

    if (!correo || !password) {
        return res.status(400).json({ error: "Correo y contraseña son requeridos" });
    }

    const sql = 'SELECT * FROM administrador WHERE correo = ?';
    db.query(sql, [correo], (err, result) => {
        if (err) {
            console.error("Error en consulta:", err);
            return res.status(500).json({ error: "Error en el servidor" });
        }

        if (result.length === 0) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }

        const usuario = result[0];
        if (password === usuario.password) {
            const { password, ...usuarioSinPassword } = usuario;
            res.json({
                success: true,
                usuario: usuarioSinPassword,
                token: generarToken(usuario.id)
            });
        } else {
            res.status(401).json({ error: "Credenciales incorrectas" });
        }
    });
};

export const verifyToken = (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(400).json({ valid: false });

    try {
        const decoded = jwt.verify(token, 'torneo_extra_oficial');
        res.json({ valid: true, usuario: decoded });
    } catch (err) {
        res.status(401).json({ valid: false });
    }
};