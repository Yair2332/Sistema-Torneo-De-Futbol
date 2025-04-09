import express from "express";
import { 
    buscarPartidoPorId,
    buscarPartidos,
    buscarPartidosPorNombre,
    buscarPartidosDetalles,
    actualizarPartido,
    getGoleadoresPartido,
    agregarGoleador,
    eliminarGoleador
} from "../controllers/partidos.controller.js";

const router = express.Router();

router.get('/buscarPartidoPorId/:id', buscarPartidoPorId);
router.get('/buscarPartidos/:id?', buscarPartidos);
router.get('/buscarPartidosPorNombre', buscarPartidosPorNombre);
router.get('/buscarPartidosDetalles/:id?', buscarPartidosDetalles);
router.post('/actualizarPartido', actualizarPartido);
router.get('/goleadores/partido/:partidoId', getGoleadoresPartido);
router.post('/goleadores', agregarGoleador);
router.delete('/goleadores/:id', eliminarGoleador);

export default router;