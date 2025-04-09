import express from "express";
import { getTorneo, actualizarTorneo } from "../controllers/torneo.controller.js";

const router = express.Router();

router.get('/', getTorneo);
router.post('/torneoActualizacion', actualizarTorneo);

export default router;