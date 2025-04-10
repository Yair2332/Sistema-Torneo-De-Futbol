import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Header({ isAdmin, setIsAdmin, searchQuery, setSearchQuery, torneoNombre }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [logoClickCount, setLogoClickCount] = useState(0);

  const handleLogoClick = () => {
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);

    if (newCount >= 5) {
      navigate("/admin");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userSession');
    setIsAdmin(false);
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/equipos');
  };

  const handleAnchorClick = (hash) => {
    if (location.pathname === '/') {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, null, hash);
      }
    } else {
      navigate('/', { state: { scrollTo: hash } });
    }
  };

  useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollTo) {
      const element = document.querySelector(location.state.scrollTo);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
          navigate(location.pathname, { replace: true });
        }, 100);
      }
    }
  }, [location, navigate]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" id='header'>
      <div className="container">
        <div
          className="navbar-logo"
          onClick={handleLogoClick}
          style={{ cursor: 'pointer' }}
          title="Haz click 5 veces ;)"
        ></div>

        <Link 
          className="navbar-brand" 
          to="/" 
          onClick={() => window.scrollTo(0, 0)}
        >
          {torneoNombre}
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link 
                className="nav-link" 
                to="/" 
                onClick={() => window.scrollTo(0, 0)}
              >
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/equipos">Equipos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/partidos">Partidos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/estadisticas">Estadísticas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/jugadores">Jugadores</Link>
            </li>
            <li className="nav-item">
              <button
                onClick={() => handleAnchorClick('#Informacion')}
                className='nav-link btn btn-link'
                style={{ background: 'none', textDecoration: 'none' }}
              >
                Informacion
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={() => handleAnchorClick('#contacto')}
                className='nav-link btn btn-link'
                style={{ background: 'none', textDecoration: 'none' }}
              >
                Contacto
              </button>
            </li>

            {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Administración</Link>
              </li>
            )}
          </ul>

          <form className="d-flex search-bar" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Buscar Por Nombre"
              aria-label="Buscar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-warning" type="submit">Buscar</button>
          </form>

          {isAdmin && (
            <button className="btn btn-danger ms-1" onClick={handleLogout}>
              <i className="bi bi-box-arrow-left"></i>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;