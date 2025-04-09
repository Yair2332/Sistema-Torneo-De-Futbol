import express from "express";
import { 
    getEquipos,
    getEquipoInfo,
    buscarEquipos,
    buscarEquiposNombre,
    buscarEstadisticas,
    actualizarEquipo,
    actualizarEstadisticasEquipo,
    eliminarEquipo,
    agregarEquipo
} from "../controllers/equipos.controller.js";
import upload from "../config/multer.js";

const router = express.Router();

router.get('/', getEquipos);
router.get('/EquipoInfo/:id', getEquipoInfo);
router.get('/buscarEquipos', buscarEquipos);
router.get('/buscarEquiposNombre', buscarEquiposNombre);
router.get('/buscarEstadisticas/:id', buscarEstadisticas);
router.post('/actualizarEquipo', upload.single('Img'), actualizarEquipo);
router.post('/actualizarEstadisticasEquipo', actualizarEstadisticasEquipo);
router.delete('/eliminarEquipo/:id', eliminarEquipo);
router.post('/agregarEquipo', upload.single('Img'), agregarEquipo);

export default router;