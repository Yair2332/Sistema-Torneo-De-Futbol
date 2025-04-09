import express from "express";
import { 
    buscarJugadoresDeEquipo,
    buscarTodosLosJugadores,
    buscarJugadoresPorNombre,
    actualizarJugador,
    agregarJugador,
    eliminarJugador,
    getTopGoleadores
} from "../controllers/jugadores.controller.js";
import upload from "../config/multer.js";

const router = express.Router();

router.get('/BuscarJugadoresDeEquipo/:id', buscarJugadoresDeEquipo);
router.get('/BuscarTodosLosJugadores', buscarTodosLosJugadores);
router.post('/BuscarJugadoresPorNombre', buscarJugadoresPorNombre);
router.post('/ActualizarJugador', upload.single('img'), actualizarJugador);
router.post('/agregarJugador', upload.single('imagen'), agregarJugador);
router.delete('/eliminarJugador/:id', eliminarJugador);
router.get('/topGoleadores', getTopGoleadores);

export default router;