import express from "express";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';

// Importar rutas
import authRoutes from './routes/auth.routes.js';
import equiposRoutes from './routes/equipos.routes.js';
import jugadoresRoutes from './routes/jugadores.routes.js';
import partidosRoutes from './routes/partidos.routes.js';
import torneoRoutes from './routes/torneo.routes.js';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, '../client/public/assets')));

// Rutas
app.get('/', (req, res) => {
    res.send('API funcionando');
});
app.use('/auth', authRoutes);
app.use('/equipos', equiposRoutes);
app.use('/jugadores', jugadoresRoutes);
app.use('/partidos', partidosRoutes);
app.use('/torneo', torneoRoutes);

app.listen(3001, () => {
    console.log("Servidor escuchando en el puerto 3001");
});