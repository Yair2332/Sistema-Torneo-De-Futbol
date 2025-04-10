import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Administrados from './components/admin/Administrados';
import EquiposCarousel from './components/equipo/EquiposCarousel';
import Footer from './components/body/Footer';
import Header from './components/body/Header';
import HeroBanner from './components/body/HeroBanner';
import InfoEquipo from './components/equipo/InfoEquipo';
import InfoPartido from './components/partido/InfoPartido';
import InfoTorneo from './components/admin/InfoTorneo';
import PartidosLista from './components/partido/PartidosLista';
import TablaPuntaje from './components/partido/TablaPuntaje';
import Login from './components/admin/Login';
import FondoInteractivo from './components/body/FondoInteractivo';
import EquipoLista from './components/equipo/EquipoLista';
import ListaEstadisticas from './components/estadisticas/ListaEstadisticas';
import axios from 'axios';
import TablaGoleadores from './components/partido/TablaGoleadores';
import JugadoresTabla from './components/jugador/JugadoresTabla';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [equipoSelect, setEquipoSelect] = useState("");
  const [partidoSelect, setPartidoSelect] = useState("");
  const [loadingSession, setLoadingSession] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [torneo, setTorneo] = useState({
    id: '',
    nombre: '',
    descripcion: '',
    fecha: '',
  });

  // Función para traer datos del torneo
  const obtenerTorneo = async () => {
    try {
      const response = await axios.get('http://localhost:3001/torneo');

      const datos = response.data;

      // 👇 Ajustamos la fecha si es necesario
      const fechaFormateada = datos.fecha ? datos.fecha.substring(0, 10) : '';

      setTorneo({
        ...datos,
        fecha: fechaFormateada,
      });
    } catch (error) {
      console.error('Error al obtener datos del torneo:', error);
    }
  };

  // Verificar sesión al cargar la aplicación
  useEffect(() => {
    const storedUser = localStorage.getItem('userSession');
    if (storedUser) {
      const { token, user } = JSON.parse(storedUser);

      const verifyToken = async () => {
        try {
          const response = await axios.post('http://localhost:3001/verify-token', { token });
          if (response.data.valid) {
            setIsAdmin(true);
          } else {
            localStorage.removeItem('userSession');
          }
        } catch (err) {
          localStorage.removeItem('userSession');
          console.error("Error verificando token:", err);
        } finally {
          setLoadingSession(false);
        }
      };

      verifyToken();
    } else {
      setLoadingSession(false);
    }

    obtenerTorneo();
  }, []);

  if (loadingSession) {
    return <div className="loading-screen">Cargando...</div>;
  }


  return (
    <Router>
      <div className="App">
        <FondoInteractivo />
        <Header
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          torneoNombre={torneo.nombre}
        />

        <Routes>
          <Route path="/" element={
            <>
              <HeroBanner searchQuery={searchQuery} setSearchQuery={setSearchQuery} torneo={torneo} />
              <EquiposCarousel setEquipoSelect={setEquipoSelect} />
              <TablaPuntaje setEquipoSelect={setEquipoSelect} />
              {equipoSelect && <InfoEquipo idEquipo={equipoSelect} setEquipoSelect={setEquipoSelect} setPartidoSelect={setPartidoSelect} />}
              {partidoSelect && <InfoPartido partidoSelect={partidoSelect} setPartidoSelect={setPartidoSelect} />}
              {!equipoSelect && <PartidosLista idEquipo={""} setPartidoSelect={setPartidoSelect} limit={6} />}
              <TablaGoleadores />
              <InfoTorneo />
            </>
          } />

          <Route path="/admin" element={
            isAdmin ? <Administrados isAdmin={isAdmin} setIsAdmin={setIsAdmin} /> : <Navigate to="/login" />
          } />

          <Route path="/login" element={
            <Login setIsAdmin={setIsAdmin} torneoNombre={torneo.nombre} />
          } />

          <Route path="/equipos" element={
            <>
              <EquipoLista
                setEquipoSelect={setEquipoSelect}
                searchQuery={searchQuery}
              />
              {equipoSelect && <InfoEquipo idEquipo={equipoSelect} setEquipoSelect={setEquipoSelect} setPartidoSelect={setPartidoSelect} />}
              {partidoSelect && <InfoPartido partidoSelect={partidoSelect} setPartidoSelect={setPartidoSelect} />}
            </>
          } />

          <Route path="/partidos" element={
            <>
              <PartidosLista
                idEquipo={""}
                setPartidoSelect={setPartidoSelect}
                searchQuery={searchQuery}
              />
              {partidoSelect && <InfoPartido partidoSelect={partidoSelect} setPartidoSelect={setPartidoSelect} />}
            </>
          } />

          <Route path='/estadisticas' element={
            <ListaEstadisticas searchQuery={searchQuery} />
          } />

          <Route path='/jugadores' element={
            <>
              <div className='container p-0 bg-secondary rounded-3'>
                <h2 className=" bg-dark titulacion w-100 fs-2 mt-2">
                  Jugadores del Torneo
                </h2>
                <JugadoresTabla idEquipo={""} buscador={searchQuery}/>
              </div>
            </>
          } />


        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;