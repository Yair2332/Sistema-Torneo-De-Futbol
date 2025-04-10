import axios from "axios";
import { useEffect, useState } from "react";

function EquiposCarousel({ setEquipoSelect }) {
  const [teams, setTeams] = useState([]);
  const [itemsPerSlide, setItemsPerSlide] = useState(4); // Valor inicial
  const [teamGroups, setTeamGroups] = useState([]);

  const buscarEquipos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/equipos/buscarEquipos');
      if (response.data) {
        setTeams(response.data);
      }
    } catch (e) {
      console.error("Error fetching teams:", e);
    }
  };

  // Función para calcular los items por slide según el ancho de pantalla
  const calculateItemsPerSlide = () => {
    const tamañoDePantalla = window.innerWidth;
    let newItemsPerSlide = 4; // Default para pantallas grandes

    if (tamañoDePantalla <= 992 && tamañoDePantalla > 768) {
      newItemsPerSlide = 3; // Tablets
    } else if (tamañoDePantalla <= 768 && tamañoDePantalla > 576) {
      newItemsPerSlide = 2; // Móviles grandes
    } else if (tamañoDePantalla <= 576) {
      newItemsPerSlide = 2; // Móviles pequeños
    }

    return newItemsPerSlide;
  };

  // Función para dividir los equipos en grupos
  const createTeamGroups = (teams, items) => {
    const groups = [];
    for (let i = 0; i < teams.length; i += items) {
      groups.push(teams.slice(i, i + items));
    }
    return groups;
  };

  // Efecto para manejar el resize y calcular items por slide
  useEffect(() => {
    const handleResize = () => {
      const newItemsPerSlide = calculateItemsPerSlide();
      if (newItemsPerSlide !== itemsPerSlide) {
        setItemsPerSlide(newItemsPerSlide);
      }
    };

    // Ejecutamos una vez al inicio
    handleResize();

    // Agregamos el event listener
    window.addEventListener('resize', handleResize);

    // Limpieza del event listener
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsPerSlide]);

  // Efecto para actualizar los grupos cuando cambian los equipos o items por slide
  useEffect(() => {
    if (teams.length > 0) {
      setTeamGroups(createTeamGroups(teams, itemsPerSlide));
    }
  }, [teams, itemsPerSlide]);

  // Efecto para cargar los equipos
  useEffect(() => {
    buscarEquipos();
  }, []);

  const elegirEquipo = (id) => {
    setEquipoSelect(id);
  };

  return (
    <div className="container mt-2 p-0 equiposLista bg-secondary pb-3">
      <h2 className="text-center mb-2 titulacion bg-dark">Equipos del Torneo</h2>

      <div id="teamsCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner p-0">
          {teamGroups.map((group, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <div className="d-flex justify-content-around">
                {group.map(team => (
                  <div key={team.Id} className="team-card mx-2" onClick={() => elegirEquipo(team.Id)}>
                    <a href="/#info_equipo" className="card border-0 shadow-sm h-100">
                      <div className="card-body text-center p-3">
                        <div className="team-logo-wrapper mb-3">
                          <img
                            src={team.Img}
                            alt={team.Nombre}
                            className="img-fluid team-logo"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/150';
                            }}
                          />
                        </div>
                        <h5 className="team-name mb-0">{team.Nombre}</h5>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {teamGroups.length > 1 && (
          <>
            <button className="carousel-control-prev" type="button" data-bs-target="#teamsCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon bg-dark rounded-circle p-3" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#teamsCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon bg-dark rounded-circle p-3" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default EquiposCarousel;