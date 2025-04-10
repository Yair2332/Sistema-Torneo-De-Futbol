import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-2" id='contacto'>
      <div className="container">
        <div className="row">
          {/* Columna 1 - Información del torneo */}
          <div className="col-md-4 mb-4">
            <h5 className="text-warning mb-3">TORNEO MÁS 40 SÁBADOS</h5>
            <p>El torneo de fútbol para mayores de 40 años más importante de la región.</p>
            <div className="mt-3">
              <img 
                src="/assets/logo.jpg" 
                alt="Logo Torneo" 
                className="img-fluid mb-2 rounded-2"
                style={{maxWidth: '80px'}}
              />
            </div>
            <div className="social-icons mt-3">
              <a href="/" className="text-white me-3"><FaFacebook size={20} /></a>
              <a href="/" className="text-white me-3"><FaInstagram size={20} /></a>
              <a href="/" className="text-white me-3"><FaTwitter size={20} /></a>
              <a href="/" className="text-white"><FaYoutube size={20} /></a>
            </div>
          </div>

          {/* Columna 2 - Enlaces rápidos */}
          <div className="col-md-2 mb-4">
            <h5 className="text-warning mb-3">ENLACES</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="/" className="text-white text-decoration-none">Inicio</a></li>
              <li className="mb-2"><a href="/" className="text-white text-decoration-none">Equipos</a></li>
              <li className="mb-2"><a href="/" className="text-white text-decoration-none">Calendario</a></li>
              <li className="mb-2"><a href="/" className="text-white text-decoration-none">Resultados</a></li>
              <li className="mb-2"><a href="/" className="text-white text-decoration-none">Estadísticas</a></li>
              <li><a href="/" className="text-white text-decoration-none">Reglamento</a></li>
            </ul>
          </div>

          {/* Columna 3 - Contacto */}
          <div className="col-md-3 mb-4">
            <h5 className="text-warning mb-3">CONTACTO</h5>
            <ul className="list-unstyled">
              <li className="mb-3 d-flex align-items-start">
                <FaMapMarkerAlt className="me-2 mt-1 text-warning" />
                <span>Av. Deportiva 1234, El Pastito, Argentina</span>
              </li>
              <li className="mb-3 d-flex align-items-center">
                <FaPhone className="me-2 text-warning" />
                <span>+54 11 1234-5678</span>
              </li>
              <li className="d-flex align-items-center">
                <FaEnvelope className="me-2 text-warning" />
                <span>info@torneomas40.com</span>
              </li>
            </ul>
          </div>

          {/* Columna 4 - Newsletter */}
          <div className="col-md-3 mb-4">
            <h5 className="text-warning mb-3">NEWSLETTER</h5>
            <p>Suscríbete para recibir las últimas novedades del torneo.</p>
            <div className="input-group mb-3">
              <input 
                type="email" 
                className="form-control" 
                placeholder="Tu email" 
                aria-label="Tu email" 
              />
              <button className="btn btn-warning" type="button">
                Suscribir
              </button>
            </div>
            <small className="text-muted">No compartiremos tu email con nadie.</small>
          </div>
        </div>

        <hr className="my-4 bg-secondary" />

        {/* Copyright y enlaces legales */}
        <div className="row">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0">&copy; {new Date().getFullYear()} Torneo Más 40 Sábados. Todos los derechos reservados.</p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <a href="/" className="text-white text-decoration-none me-3">Términos y condiciones</a>
            <a href="/" className="text-white text-decoration-none me-3">Política de privacidad</a>
            <a href="/" className="text-white text-decoration-none">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;