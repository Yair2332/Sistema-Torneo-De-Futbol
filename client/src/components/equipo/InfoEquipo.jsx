import React from 'react'
import Estadisticas from '../estadisticas/Estadisticas'
import PartidosLista from '../partido/PartidosLista'
import Equipo from './Equipo'
import JugadoresTabla from '../jugador/JugadoresTabla'

function InfoEquipo({idEquipo, setEquipoSelect, setPartidoSelect}) {
    return (
        <div className='bg-secondary px-2 py-1 pb-2 container mt-2 rounded-3 fondo_equipo' id='info_equipo'>
            <div className="container mt-2 container-custom info_equipo pb-2 px-0">
                <div><button onClick={()=>{setEquipoSelect("")}} className='btn btn-danger boton-cerrar'>X</button></div>
                <h2 className="titulo-principal titulacion fs-2 bg-dark w-100 mb-2"> Informacion sobre el Equipo</h2>
                <div className='equipo'>
                <Equipo idEquipo={idEquipo}/>
                </div>
                <div className="mt-4 mx-2">
                    <h2 className='bg-dark titulacion fs-2 '>Jugadores</h2>
                    <JugadoresTabla idEquipo={idEquipo}/>
                    <Estadisticas idEquipo={idEquipo}/>
                    <PartidosLista idEquipo={idEquipo} setPartidoSelect={setPartidoSelect}/>
                </div>
            </div>
        </div>
    )
}

export default InfoEquipo