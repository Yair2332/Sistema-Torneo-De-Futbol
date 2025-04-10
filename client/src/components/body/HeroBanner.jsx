import { useNavigate } from 'react-router-dom';

function HeroBanner({searchQuery, setSearchQuery, torneo}) {
    const navigate = useNavigate();
    
    const handleSearch = (e) => {
        e.preventDefault();
        navigate('/equipos');
      };

    return (
        <>
        <h2 className="titulacion container bg-dark mt-2">{torneo.nombre}</h2>
        <div className="hero container shadow-lg mt-0">
            <div className="hero-content">
                <h1 className="fw-bold">Bienvenidos Al {torneo.nombre}</h1>
                <p className="lead">{torneo.descripcion}.</p>
                <div className="input-group mt-3 w-100 mx-auto" style={{maxWidth:"450px"}}>
                    <input type="text" className="form-control" placeholder="Buscar Equipo" value={searchQuery} onChange={(event)=>{setSearchQuery(event.target.value)}}/>
                    <button className="btn btn-primary" onClick={handleSearch}>Buscar</button>
                </div>
            </div>
        </div>
        </>

    );
    
}

export default HeroBanner;