import React from 'react';
import { BiCalendar, BiUser, BiGroup, BiTrophy, BiRightArrow } from 'react-icons/bi';


const InfoTorneo = () => {
    const noticias = [
        {
            fecha: "May 11, 2022",
            autor: "John Doe",
            iconoAutor: <BiUser />,
            titulo: "World Cup 2022: What you need to know",
            contenido: "The 2022 FIFA World Cup in Qatar is set to kick off on November 21. Here's everything you need to know about the tournament.",
            imagenes: [
                "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
            ]
        },
        {
            fecha: "May 10, 2022",
            autor: "Jane Doe",
            iconoAutor: <BiUser />,
            titulo: "The top 5 players to watch at the World Cup",
            contenido: "The 2022 FIFA World Cup is just around the corner, and fans are eager to see the world's best players in action. Here are five players to keep an eye on during the tournament.",
            imagenes: [
                "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
                "https://www.itl.cat/pngfile/big/192-1920729_voetbal-4k-ultra-hd-wallpaper-campo-de-futbol.jpg"
            ]
        },
        {
            fecha: "May 9, 2022",
            autor: "Soccer League",
            iconoAutor: <BiGroup />,
            titulo: "Get ready for the World Cup with Soccer League",
            contenido: "The 2022 FIFA World Cup is almost here, and Soccer League has everything you need to stay up to date with the latest news, match results, and more. Get ready for the tournament with Soccer League!",
            imagenes: [
                "https://wallpapercat.com/w/full/f/9/f/1270514-3840x2160-desktop-4k-fifa-soccer-game-background-photo.jpg",
                "https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
            ]
        }
    ];

    return (
        <div className="info-torneo-container container p-0 mt-2" id='Informacion'>
            <h2 className="titulo-principal titulacion fs-2 bg-dark w-100 mb-0">
                <BiTrophy className="icono-titulo" /> Informacion sobre el torneo
            </h2>

            <div className='p-2 noticias'>
                {noticias.map((noticia, index) => (
                    <div key={index} className="noticia">
                        <div className="texto-noticia">
                            <div className="fecha">
                                <BiCalendar className="icono" /> {noticia.fecha}
                            </div>
                            <div className="autor">
                                {noticia.iconoAutor} {noticia.autor}
                            </div>
                            <h3>{noticia.titulo}</h3>
                            <p>{noticia.contenido}</p>
                            <button className="boton-leer">
                                Read more <BiRightArrow className="icono-boton" />
                            </button>
                        </div>

                        <div className="contenedor-imagen">
                            <div className="imagen-noticia">
                                <img src={noticia.imagenes[0]} alt={noticia.titulo} className="imagen-principal" />
                                <img src={noticia.imagenes[1]} alt={noticia.titulo} className="imagen-secundaria" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InfoTorneo;