import axios from 'axios';
import React, { useEffect, useState } from 'react';
import EstadisticasPartidos from '../estadisticas/EstadisticasPartidos';
import ResumenEstadisticas from '../estadisticas/ResumenEstadisticas';



function Equipo({ idEquipo, isAdmin }) {
    const [equipo, setEquipo] = useState({});
    const [imagen, setImagen] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const buscarEquipo = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3001/equipos/EquipoInfo/${id}`);
            if (response.data) {
                setEquipo(response.data);
            }
        } catch (e) {
            console.error('Error al obtener equipo:', e);
            setError('Error al cargar los datos del equipo');
        }
    };

    useEffect(() => {
        if (idEquipo) {
            buscarEquipo(idEquipo);
        }
    }, [idEquipo]);



    const handleChange = (e) => {
        if (isAdmin) {
            setEquipo({ ...equipo, [e.target.name]: e.target.value });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Por favor, selecciona un archivo de imagen válido');
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                setError('La imagen no debe exceder los 2MB');
                return;
            }
            setError(null);
            setImagen(file);
        }
    };

    const actualizarEquipo = async () => {
        if (!equipo.Nombre || !equipo.Localidad) {
            setError('Nombre y Localidad son campos requeridos');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();

            // Agregar todos los campos del equipo incluyendo ImgActual
            Object.keys(equipo).forEach(key => {
                // Asegurarse de incluir el campo ImgActual
                if (key === 'Img' && !imagen) {
                    // No agregar el campo Img si no hay nueva imagen
                    return;
                }
                formData.append(key, equipo[key]);
            });

            // Solo agregar la imagen si se seleccionó una nueva
            if (imagen) {
                formData.append('Img', imagen);
            } else {
                // Asegurarse de enviar la imagen actual como ImgActual
                formData.append('ImgActual', equipo.Img || '/assets/default-team-logo.png');
            }

            const response = await axios.post('http://localhost:3001/equipos/actualizarEquipo', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.status === 200) {
                alert(response.data.message);
                setEquipo(response.data.equipoData);
                setImagen(null);
            }
        } catch (error) {
            console.error('Error:', error);
            setError(error.response?.data?.error || "Error al actualizar el equipo");
        } finally {
            setLoading(false);
        }
    };


    const eliminarEquipo = async () => {
        if (!window.confirm('¿Estás seguro de querer eliminar este equipo y todos sus datos relacionados?')) {
            return;
        }

        setLoading(true);
        try {
            const response = await axios.delete(`http://localhost:3001/equipos/eliminarEquipo/${equipo.Id}`);
            if (response.status === 200) {
                alert(response.data.message);
                // Redirigir o actualizar la lista de equipos
                window.location.href = '/'; // o la ruta que corresponda
            }
        } catch (error) {
            console.error('Error al eliminar equipo:', error);
            alert(error.response?.data?.error || "Error al eliminar el equipo");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <div className="d-flex align-items-center border-bottom pb-2 px-3">
                <img src={equipo.Img || '/assets/default-team-logo.png'}
                    alt="Team Logo"
                    width="80"
                    className="img-thumbnail" style={{ objectFit: "cover", height: "80px" }} />
                <div className="ms-3 mt-3">
                    <h3>
                        <input
                            type="text"
                            name="Nombre"
                            className="inputsAdmin ms-2"
                            value={equipo.Nombre || ''}
                            onChange={handleChange}
                            readOnly={!isAdmin}
                        />
                    </h3>
                    <p className="mb-1 fs-4">
                        <i className="bi bi-geo-alt"></i>
                        <input
                            type="text"
                            name="Localidad"
                            className="inputsAdmin ms-2"
                            value={equipo.Localidad || ''}
                            onChange={handleChange}
                            readOnly={!isAdmin}
                        />
                    </p>
                </div>
            </div>

            <div className="mt-4 border-bottom px-3">
                <h4>Detalles del Equipo</h4>
                <div className="row">
                    {isAdmin && (
                        <div className="my-3">
                            <h5>Actualizar Imagen</h5>
                            <small className=" d-block mb-2 text-white">
                                Dejar en blanco para mantener la imagen actual
                            </small>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="form-control"
                            />
                        </div>
                    )}
                    <div className="col-md-6 ">
                        <p className="fs-4"><strong>Nombre:</strong> <input type="text" name="Nombre" className="inputsAdmin ms-2" value={equipo.Nombre || ''} onChange={handleChange} readOnly={!isAdmin} /></p>
                        <p className="fs-4"><strong>Entrenador:</strong> <input type="text" name="Entrenador" className="inputsAdmin ms-2" value={equipo.Entrenador || ''} onChange={handleChange} readOnly={!isAdmin} /></p>
                        <p className="fs-4"><strong>Capitán:</strong> <input type="text" name="Capitan" className="inputsAdmin ms-2" value={equipo.Capitan || ''} onChange={handleChange} readOnly={!isAdmin} /></p>
                        <p className="fs-4"><strong>Localidad:</strong> <input type="text" name="Localidad" className="inputsAdmin ms-2" value={equipo.Localidad || ''} onChange={handleChange} readOnly={!isAdmin} /></p>
                    </div>
                    <div className="col-md-6">
                        <p className="fs-4"><strong>Fundado en:</strong> <input type="text" name="Fundado" className="inputsAdmin ms-2" value={equipo.Fundado || ''} onChange={handleChange} readOnly={!isAdmin} /></p>
                        <p className="fs-4"><strong>Contacto:</strong> <input type="text" name="Contacto" className="inputsAdmin ms-2" value={equipo.Contacto || ''} onChange={handleChange} readOnly={!isAdmin} /></p>
                        <p className="fs-4"><strong>Email:</strong> <input type="text" name="Email" className="inputsAdmin ms-2" value={equipo.Email || ''} onChange={handleChange} readOnly={!isAdmin} /></p>
                        <p className="fs-4"><strong>Otros datos:</strong> <input type="text" name="Otros" className="inputsAdmin ms-2" value={equipo.Otros || ''} onChange={handleChange} readOnly={!isAdmin} /></p>
                    </div>
                    <div className='border-top'></div>
                    <EstadisticasPartidos
                        estadisticas={equipo}
                        isAdmin={isAdmin}
                        equipoId={equipo.Id}
                        onUpdate={(datosActualizados) => setEquipo(datosActualizados)}
                    />
                    <ResumenEstadisticas
                        estadisticas={equipo}
                    />


                </div>
            </div>

            {isAdmin && (
                <div className="ms-2 mt-2">
                    <button
                        className="btn btn-success"
                        onClick={actualizarEquipo}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Actualizando...
                            </>
                        ) : 'Actualizar'}
                    </button>
                    <button
                        className="btn btn-danger ms-2"
                        onClick={eliminarEquipo}
                        disabled={loading}
                    >
                        {loading ? 'Eliminando...' : <><i className="bi bi-trash"></i> Eliminar</>}
                    </button>
                </div>
            )}
        </>
    );
}

export default Equipo;