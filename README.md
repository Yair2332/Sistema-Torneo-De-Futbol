
# ⚽ Sistema Torneo de Fútbol – React + Node.js

Aplicación web desarrollada con React (frontend) y Node.js con Express (backend), utilizando MySQL como base de datos. Permite organizar y gestionar torneos de fútbol por jornadas, incluyendo equipos, jugadores, partidos y resultados.

## 🧩 Tecnologías utilizadas

- **Frontend**: React
- **Backend**: Node.js + Express
- **Base de datos**: MySQL
- **Comunicación cliente-servidor**: API REST
- **Lenguajes**: JavaScript, HTML, CSS

## 📁 Estructura del proyecto

```
Sistema-Torneo-De-Futbol/
├── client/               # Aplicación React (frontend)
├── server/               # Servidor Node.js con Express (backend)
│   └── config/
│       └── db.js         # Configuración de conexión a MySQL
├── torneo_db.sql         # Script para crear y poblar la base de datos
└── .gitignore
```

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/Yair2332/Sistema-Torneo-De-Futbol.git
cd Sistema-Torneo-De-Futbol
```

### 2. Configurar la base de datos

- Asegúrate de tener MySQL instalado y en funcionamiento.
- Crea una base de datos nueva (por ejemplo, `torneo_db`).
- Importa el archivo `torneo_db.sql`:

```bash
mysql -u tu_usuario -p torneo_db < torneo_db.sql
```

- Luego edita el archivo `server/database/db.js` para colocar tus datos de conexión:

```js
const db = mysql.createConnection({
  host: 'localhost',
  user: 'TU_USUARIO',
  password: 'TU_CONTRASEÑA',
  database: 'torneo_db'
});
```

### 3. Iniciar el backend

```bash
cd server
npm install
npm start
```

- El servidor se ejecutará en `http://localhost:3001`.

### 4. Iniciar el frontend

En una nueva terminal:

```bash
cd client
npm install
npm start
```

- La aplicación React se abrirá en `http://localhost:3000`.

## 🧪 Funcionalidades

- Gestión de equipos y jugadores.
- Programación y visualización de partidos por jornada.
- Registro y consulta de resultados.
- Visualización de tablas de posiciones y estadísticas.

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

