import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TablaGoleadores() {
  const [goleadores, setGoleadores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoleadores = async () => {
      try {
        const response = await axios.get('http://localhost:3001/jugadores/topGoleadores');
        setGoleadores(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching top scorers:", error);
        setLoading(false);
      }
    };

    fetchGoleadores();
  }, [goleadores]);

  if (loading) {
    return (
      <div className="container mt-2 p-0 tournament-card shadow-lg fs-3 bg-dark">
        <h2 className="titulacion fs-2 bg-dark w-100 mb-2">Tabla de Goleadores</h2>
        <div className="text-center py-4">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-2 p-0 tournament-card shadow-lg fs-3 bg-dark">
      <h2 className="titulacion fs-2 bg-dark w-100 mb-2">Tabla de Goleadores</h2>
      <div className="table-responsive">
        <table className="table table-dark table-hover table-striped mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th className='text-start'>Jugador</th>
              <th  className='text-start'>Equipo</th>
              <th>Goles</th>
            </tr>
          </thead>
          <tbody>
            {goleadores.length > 0 ? (
              goleadores.map((jugador, index) => (
                <tr key={jugador.id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <img 
                        src={jugador.jugador_img || 'https://via.placeholder.com/50'} 
                        alt={jugador.nombre} 
                        className="rounded-circle me-2" 
                        style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/50';
                        }}
                      />
                      <div>
                        <div className="fw-bold">{jugador.nombre}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <img 
                        src={jugador.equipo_img || 'https://via.placeholder.com/30'} 
                        alt={jugador.equipo_nombre} 
                        className="me-2" 
                        style={{ width: '30px', height: '30px', objectFit: 'contain' }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/30';
                        }}
                      />
                      {jugador.equipo_nombre}
                    </div>
                  </td>
                  <td className="fw-bold"><i className="fas fa-futbol text-success me-1" title="Goles a Favor"></i>{jugador.goles_totales}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">No hay datos de goleadores disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TablaGoleadores;