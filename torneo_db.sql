-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-04-2025 a las 23:20:01
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `torneo_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `id` int(11) NOT NULL,
  `correo` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `administrador`
--

INSERT INTO `administrador` (`id`, `correo`, `password`) VALUES
(1, 'yairlezcano4@gmail.com', 'abc123');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipo`
--

CREATE TABLE `equipo` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(50) DEFAULT NULL,
  `Img` varchar(255) DEFAULT NULL,
  `Pts` int(11) DEFAULT NULL,
  `Dif` int(11) DEFAULT NULL,
  `PJ` int(11) DEFAULT NULL,
  `PG` int(11) DEFAULT NULL,
  `PE` int(11) DEFAULT NULL,
  `PP` int(11) DEFAULT NULL,
  `Est` varchar(255) DEFAULT NULL,
  `Entrenador` varchar(100) DEFAULT NULL,
  `Capitan` varchar(100) DEFAULT NULL,
  `Localidad` varchar(100) DEFAULT NULL,
  `Fundado` int(11) DEFAULT NULL,
  `Contacto` varchar(50) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `equipo`
--

INSERT INTO `equipo` (`Id`, `Nombre`, `Img`, `Pts`, `Dif`, `PJ`, `PG`, `PE`, `PP`, `Est`, `Entrenador`, `Capitan`, `Localidad`, `Fundado`, `Contacto`, `Email`) VALUES
(12, 'FC Barcelona', '/assets/1744135147339.png', 19, 11, 7, 6, 1, 0, '1,0,1,1,1,1,1', 'Xavi Hernández', 'Sergio Busquets', 'Barcelona, España', 1899, '+34 902 18 99 00', 'info@fcbarcelona.cat'),
(13, 'Real Madrid', '/assets/1744135770465.png', 12, 3, 7, 3, 3, 1, '-1,1,1,0,0,1,0', 'Carlo Ancelotti', 'Karim Benzema', 'Madrid, España', 1902, '+34 913 44 43 00', 'atencionpublico@corp.realmadrid.com'),
(14, 'Athletic Club', '/assets/1744135367787.png', 5, -6, 7, 1, 2, 4, '-1,0,-1,0,1,-1,-1', 'Ernesto Valverde', 'Iker Muniain', 'Bilbao, España', 1898, '+34 944 24 08 77', 'info@athletic-club.eus'),
(15, 'Villarreal CF', '/assets/1744135437878.png', 14, 9, 7, 4, 2, 1, '1,1,-1,0,1,1,0', 'Unai Emery', 'Raúl Albiol', 'Villarreal, España', 1923, '+34 964 500 250', 'villarrealcf@villarrealcf.es'),
(16, 'Real Betis', '/assets/1744135496289.png', 7, -7, 7, 1, 4, 2, '-1,0,0,0,-1,0,1', 'Manuel Pellegrini', 'Joaquín', 'Sevilla, España', 1907, '+34 955 463 955', 'info@realbetisbalompie.es'),
(17, 'RCD Mallorca', '/assets/1744135548314.png', 4, -11, 7, 1, 1, 5, '-1,1,-1,-1,-1,0,-1', 'Javier Aguirre', 'Antonio Raíllo', 'Palma de Mallorca, España', 1916, '+34 971 221 221', 'info@rcdmallorca.es'),
(18, 'RC Celta', '/assets/1744135607480.png', 5, -7, 7, 1, 2, 4, '1,-1,0,-1,-1,-1,0', 'Carlos Carvalhal', 'Hugo Mallo', 'Vigo, España', 1923, '+34 986 110 900', 'info@rccelta.es'),
(19, 'Atlético de Madrid', '/assets/1744135908596.png', 13, 8, 7, 4, 1, 2, '1,1,-1,1,0,-1,1', 'Diego Simeone', 'Koke', 'Madrid, España', NULL, '+34 913 66 47 07', 'info@atleticodemadrid.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `goleadores`
--

CREATE TABLE `goleadores` (
  `id` int(11) NOT NULL,
  `partido_id` int(11) NOT NULL,
  `jugador_id` int(11) NOT NULL,
  `equipo_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `goleadores`
--

INSERT INTO `goleadores` (`id`, `partido_id`, `jugador_id`, `equipo_id`, `cantidad`) VALUES
(173, 28, 78, 12, 2),
(174, 28, 75, 12, 1),
(175, 28, 89, 13, 1),
(176, 50, 155, 18, 1),
(177, 50, 156, 18, 1),
(178, 50, 144, 17, 1),
(179, 40, 122, 15, 1),
(180, 40, 123, 15, 1),
(181, 54, 101, 19, 1),
(182, 54, 102, 19, 1),
(183, 30, 112, 14, 1),
(184, 30, 78, 12, 1),
(185, 31, 89, 13, 1),
(186, 31, 90, 13, 1),
(187, 41, 102, 19, 1),
(188, 53, 123, 15, 2),
(189, 53, 120, 15, 1),
(190, 53, 155, 18, 1),
(191, 34, 78, 12, 1),
(192, 34, 79, 12, 1),
(193, 34, 122, 15, 1),
(194, 38, 135, 16, 1),
(195, 38, 133, 16, 1),
(196, 38, 155, 18, 1),
(197, 38, 156, 18, 1),
(198, 45, 144, 17, 1),
(199, 45, 89, 13, 1),
(200, 45, 90, 13, 1),
(201, 32, 122, 15, 1),
(202, 32, 119, 15, 1),
(203, 32, 123, 15, 1),
(204, 35, 122, 15, 1),
(205, 35, 88, 13, 1),
(206, 36, 135, 16, 1),
(207, 36, 112, 14, 1),
(208, 44, 80, 12, 1),
(209, 44, 79, 12, 1),
(210, 56, 101, 19, 1),
(211, 56, 97, 19, 1),
(212, 56, 100, 19, 1),
(213, 43, 78, 12, 1),
(214, 47, 155, 18, 1),
(215, 47, 156, 18, 1),
(216, 47, 112, 14, 1),
(217, 55, 101, 19, 1),
(218, 55, 102, 19, 1),
(219, 51, 86, 13, 1),
(220, 51, 89, 13, 1),
(221, 51, 90, 13, 1),
(222, 51, 155, 18, 1),
(223, 39, 132, 16, 1),
(224, 39, 89, 13, 1),
(225, 49, 78, 12, 1),
(226, 49, 79, 12, 1),
(227, 49, 80, 12, 1),
(228, 52, 89, 13, 1),
(229, 52, 90, 13, 1),
(230, 52, 101, 19, 1),
(231, 52, 102, 19, 1),
(232, 57, 120, 15, 1),
(233, 57, 124, 15, 1),
(234, 46, 144, 17, 1),
(235, 46, 122, 15, 1),
(236, 46, 124, 15, 1),
(237, 58, 100, 19, 1),
(238, 59, 111, 14, 1),
(239, 59, 112, 14, 1),
(240, 59, 113, 14, 1),
(241, 59, 155, 18, 1),
(242, 60, 75, 12, 1),
(243, 60, 78, 12, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jugadores`
--

CREATE TABLE `jugadores` (
  `id` int(11) NOT NULL,
  `equipo_id` int(11) DEFAULT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `posicion` varchar(50) DEFAULT NULL,
  `numero` int(11) DEFAULT NULL,
  `goles` int(11) DEFAULT 0,
  `img` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `jugadores`
--

INSERT INTO `jugadores` (`id`, `equipo_id`, `nombre`, `posicion`, `numero`, `goles`, `img`) VALUES
(70, 12, 'Marc-André ter Stegen Arquerito', 'Portero', 1, 0, 'https://cdn.vox-cdn.com/thumbor/njGb9yLeOE6ZgZMjkE6ASwi_t7M=/0x0:3333x5000/1200x800/filters:focal(1454x740:1986x1272)/cdn.vox-cdn.com/uploads/chorus_image/image/72067128/1473048299.0.jpg'),
(71, 12, 'João Cancelo', 'Defensa', 2, 0, 'https://e-noticies.cat/filesedc/uploads/image/post/cancaloo_1200_800.webp'),
(72, 12, 'Ronald Araújo', 'Defensa', 4, 0, 'https://e00-xlk-ue-marca.uecdn.es/uploads/2024/09/06/17113929849512.jpeg'),
(73, 12, 'Andreas Christensen', 'Defensa', 15, 0, 'https://images.daznservices.com/di/library/DAZN_News/70/77/andreas-christensen-fc-barcelona-2024_iyb28e8xp9ad16k3l3vh66xkt.png?t=-966501918&w=800&quality=100'),
(74, 12, 'Alejandro Balde', 'Defensa', 3, 0, 'https://i0.wp.com/eumd.es/wp-content/uploads/2022/12/real-madrid-cf-v-fc-barcelona-laliga-santander.jpg?fit=3000%2C1800&ssl=1'),
(75, 12, 'Pedri', 'Centrocampista', 8, 0, 'https://assets.goal.com/images/v3/getty-2190981063/crop/MM5DINJVG45DENJWGM5G433XMU5DAORSGM3Q====/GettyImages-2190981063.jpg?auto=webp&format=pjpg&width=3840&quality=60'),
(76, 12, 'Frenkie de Jong', 'Centrocampista', 21, 0, 'https://estaticos-cdn.prensaiberica.es/clip/717ad2e3-819b-44a2-942e-88a500a64546_alta-libre-aspect-ratio_default_0.jpg'),
(77, 12, 'Gavi', 'Centrocampista', 6, 0, 'https://images2.minutemediacdn.com/image/upload/c_crop,x_0,y_351,w_2960,h_1665/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/GettyImages/mmsport/12up_es_international_web/01gpxvcxmty037scekgw.jpg'),
(78, 12, 'Robert Lewandowski', 'Delantero', 9, 0, 'https://cdn.vox-cdn.com/thumbor/PZLcyH4wdsERpvr3T-SlwUwpR3s=/0x0:3577x2385/1200x800/filters:focal(1509x478:2081x1050)/cdn.vox-cdn.com/uploads/chorus_image/image/72262717/1488008190.0.jpg'),
(79, 12, 'Lamine Yamal', 'Delantero', 27, 0, 'https://assets.goal.com/images/v3/blt53f4cfb832d04a17/Lamine-Yamal.jpeg?auto=webp&format=pjpg&width=3840&quality=60'),
(80, 12, 'Raphinha', 'Delantero', 11, 0, 'https://madrid-barcelona.com/filesedc/uploads/image/post/raphinha-madrid-supercopa_1200_800.webp'),
(81, 13, 'Thibaut Courtois', 'Portero', 1, 0, 'https://e00-marca.uecdn.es/assets/multimedia/imagenes/2021/11/15/16370080423343.jpg'),
(82, 13, 'Dani Carvajal', 'Defensa', 2, 0, 'https://images.daznservices.com/di/library/DAZN_News/37/12/dani-carvajal-real-madrid-20232024_113tpoce2wptu1haofsahaow5i.png?t=1522440357'),
(83, 13, 'Antonio Rüdiger', 'Defensa', 22, 0, 'https://tmssl.akamaized.net/images/foto/galerie/antonio-rudiger-real-madrid-2023-24-1704357878-125472.jpg'),
(84, 13, 'David Alaba', 'Defensa', 4, 0, 'https://library.sportingnews.com/styles/crop_style_16_9_desktop/s3/2023-09/David%20Alaba%20Real%20Madrid.jpg?h=920929c4&itok=LtXkcfl1'),
(85, 13, 'Ferland Mendy', 'Defensa', 23, 0, 'https://images.daznservices.com/di/library/DAZN_News/20/a4/ferland-mendy-real-madrid_xuhbb6kqyblc1p7xjoluyxyp2.jpg?t=174346438'),
(86, 13, 'Jude Bellingham', 'Centrocampista', 5, 0, 'https://img2.rtve.es/n/16081451'),
(87, 13, 'Aurélien Tchouaméni', 'Centrocampista', 18, 0, 'https://tmssl.akamaized.net/images/foto/galerie/tchouameni-aurelien-2023-2024-real-madrid-1036314072hjpg-1700241151-122093.jpg'),
(88, 13, 'Federico Valverde', 'Centrocampista', 15, 0, 'https://assets.goal.com/images/v3/blt07064c187563ad33/GettyImages-1244154016.jpg?auto=webp&format=pjpg&width=3840&quality=60'),
(89, 13, 'Kylian Mbappé', 'Delantero', 7, 0, 'https://assets.goal.com/images/v3/bltb893481a9f66b6e1/crop/MM5DCNZUGQ5DSOBRHJXG653FHIYTAMR2GIYQ====/mbappe%20(1).jpg?auto=webp&format=pjpg&width=3840&quality=60'),
(90, 13, 'Vinicius Junior', 'Delantero', 20, 0, 'https://i.eurosport.com/2024/03/16/3930993-79852628-2560-1440.jpg'),
(91, 13, 'Rodrygo Goes', 'Delantero', 11, 0, 'https://madridistareal.com/wp-content/uploads/2025/01/real-madrid-cf-v-ud-las-palmas-la-liga-ea-sports-2-2.jpg'),
(92, 19, 'Jan Oblak', 'Portero', 13, 0, 'https://assets.goal.com/images/v3/blted864029facaf6f1/JAN_OBLAKK.jpg?auto=webp&format=pjpg&width=3840&quality=60'),
(93, 19, 'Nahuel Molina', 'Defensa', 16, 0, 'https://tmssl.akamaized.net/images/foto/big/nahuel-molina-1697214727-119313.jpg?lm=1697214743'),
(94, 19, 'José María Giménez', 'Defensa', 2, 0, 'https://estoesatleti.es/filesedc/uploads/image/post/europapress-6213851-jose-maria-gimenez-of-atletico-madrid-in-action-during-the-spanish-league_1200_800.webp'),
(95, 19, 'Mario Hermoso', 'Defensa', 22, 0, 'https://tmssl.akamaized.net/images/foto/galerie/hermoso-mario-2023-2024-atletico-de-madrid-1038011109hjpg-1704902263-125979.jpg'),
(96, 19, 'Reinildo Mandava', 'Defensa', 23, 0, 'https://www.fichajes.net/sites/default/files/styles/epsa_detail_thumbail/public/2024-10/reinildo-mandava-fichajes-rumores-atl%C3%A9tico-de-madrid-manchester-united-aston-villa.jpg?h=ce6d7d0b&itok=C4JQTFr_'),
(97, 19, 'Rodrigo De Paul', 'Centrocampista', 5, 0, 'https://images.ecestaticos.com/1IW7J2bGwLFFPGOFh9Zd9gS9CWs=/0x0:2272x1515/1200x1200/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fd5d%2Ff78%2F99a%2Fd5df7899a61639645c93aca22e3d9e6c.jpg'),
(98, 19, 'Koke', 'Centrocampista', 6, 0, 'https://assets.goal.com/images/v3/blt5000f224d8c691b8/94f0bf40497257cee671302e0a89769d41e9fb08.jpg?auto=webp&format=pjpg&width=3840&quality=60'),
(99, 19, 'Marcos Llorente', 'Centrocampista', 14, 0, 'https://images.daznservices.com/di/library/DAZN_News/f9/4a/021-0628-atletico-liga-marcos-llorente_1c8o8413mi4bx1ox1mvcecgvuy.jpg?t=1377709378'),
(100, 19, 'Julián Álvarez', 'Delantero', 19, 0, 'https://la100.cienradios.com/resizer/v2/XGNIQTSCK5FPDJUQQVTBWVE6TA.jpg?smart=true&quality=85&auth=6bb9dfc2061f242fa7666439831921bd3dd68751b1502acf11b0a456022db358&width=1200&height=675'),
(101, 19, 'Antoine Griezmann', 'Delantero', 7, 0, 'https://assets.goal.com/images/v3/blt7b0fb8273b27c42a/crop/MM5DKMBQGQ5DEOBRGU5G433XMU5DENRRHIYA====/imago1049145723h.jpg?auto=webp&format=pjpg&width=3840&quality=60'),
(102, 19, 'Álvaro Morata', 'Delantero', 9, 0, 'https://phantom-marca.unidadeditorial.es/578edf5ce56df04ff17ea3f1e2a05766/resize/828/f/jpg/assets/multimedia/imagenes/2023/10/11/16969997384423.jpg'),
(103, 14, 'Unai Simón', 'Portero', 1, 0, 'https://www.estadiodeportivo.com/imagenes/5578042e-04e8-4942-8d7e-b4d4c38e24c0_1200x680.jpeg'),
(104, 14, 'Óscar de Marcos', 'Defensa', 18, 0, 'https://imagenes.elpais.com/resizer/v2/3LF3DURIONGADEUADRQJYJ6OTQ.jpg?auth=4dc342c3690b5182ee239071f69e8d8766d5952164b41f1d9f3b1f56bf654344&width=1960&height=1470&focal=1668%2C766'),
(105, 14, 'Dani Vivian', 'Defensa', 3, 0, 'https://imagenes.elpais.com/resizer/v2/MHMM3UVSG5A2LDJ5VCI7IUYNDA.jpg?auth=d06a3fd99f2f28a9f65ade78a2e7719474c0c87d4dc6b30f3cdc5ee38b4f340a&width=1960&height=1470&focal=2405%2C310'),
(106, 14, 'Aitor Paredes', 'Defensa', 4, 0, 'https://www.estadiodeportivo.com/imagenes/c4c83cdb-f755-44a4-b92b-1a3c531361e1_1200x680.png'),
(107, 14, 'Yuri Berchiche', 'Defensa', 17, 0, 'https://cdn.athletic-club.eus/uploads/2022/01/yuri.jpg'),
(108, 14, 'Oihan Sancet', 'Centrocampista', 8, 0, 'https://es.coachesvoice.com/wp-content/uploads/2025/02/sancet_main-scaled.jpg'),
(109, 14, 'Ander Herrera', 'Centrocampista', 21, 0, 'https://www.elfutbolero.com.ar/image/elfutbolerocomar/ander-herrera-se-despidio-de-su-club-1737120030.webp'),
(110, 14, 'Unai Gómez', 'Centrocampista', 16, 0, 'https://pbs.twimg.com/media/F-4b22LWQAAMNL3?format=jpg&name=4096x4096'),
(111, 14, 'Nico Williams', 'Delantero', 11, 0, 'https://fotografias.larazon.es/clipping/cmsimages02/2025/04/04/D3E7A0ED-1E13-4C1B-A8BC-C10B74AD922E/nico-williams-imagen-archivo_98.jpg?crop=1920,1080,x0,y171&width=1900&height=1069&optimize=low&format=webply'),
(112, 14, 'Iñaki Williams', 'Delantero', 9, 0, 'https://cdn.athletic-club.eus/uploads/2023/12/WILLIAMS_400_15_12.jpg'),
(113, 14, 'Gorka Guruzeta', 'Delantero', 12, 0, 'https://rpopular.mediasector.es/estaticos/2022/11/22204454/GURUZETA-CELEBRANDO-2.jpg'),
(114, 15, 'Filip Jörgensen', 'Portero', 13, 0, 'https://tmssl.akamaized.net/images/foto/galerie/filip-jorgensen-villarreal-cf-2023-24-1703073830-124572.jpg'),
(115, 15, 'Kiko Femenía', 'Defensa', 2, 0, 'https://image.ondacero.es/clipping/cmsimages01/2024/05/30/AF850934-826E-40AF-BB97-92BD6673A98E/kiko-femenia_98.jpg?crop=900,506,x0,y0&width=1900&height=1069&optimize=high&format=webply'),
(116, 15, 'Aïssa Mandi', 'Defensa', 23, 0, 'https://media.gettyimages.com/id/1565776307/es/foto/rotterdam-aissa-mandi-of-villarreal-cf-during-the-friendly-match-between-feyenoord-and.jpg?s=612x612&w=gi&k=20&c=2eQBDf2cTCvDF8E0AGgNIFhlaxXC3Vj3tA8dEFobddc='),
(117, 15, 'Pau Torres', 'Defensa', 4, 0, 'https://img.asmedia.epimg.net/resizer/v2/JTZHYE6SZ5JH7CSK4CGLU4U3YQ.jpg?auth=1d236c954dd3aba306e1a4da8d77db56ed858e53ddd03a21f7e1a1f13dd0be0e&width=1200&height=1200&smart=true'),
(118, 15, 'Alberto Moreno', 'Defensa', 18, 0, 'https://tmssl.akamaized.net//images/foto/galerie/alberto-moreno-fc-villarreal-2022-1646718594-81575.jpg?lm=1646718601'),
(119, 15, 'Dani Parejo', 'Centrocampista', 5, 0, 'https://estaticos-cdn.prensaiberica.es/clip/8b558e66-767e-47eb-9cb9-eeb6bebf9add_alta-libre-aspect-ratio_default_0.jpg'),
(120, 15, 'Alex Baena', 'Centrocampista', 16, 0, 'https://estoesatleti.es/filesedc/uploads/image/post/europapress-6258983-alex-baena-of-villarreal-cf-looks-on-during-the-spanish-league-laliga-ea-1728811631553_1200_800.webp'),
(121, 15, 'Ramón Terrats', 'Centrocampista', 27, 0, 'https://villarrealcf.es/wp-content/uploads/2023/06/terrats-1536x864.jpg.webp'),
(122, 15, 'Gerard Moreno', 'Delantero', 7, 0, 'https://tmssl.akamaized.net/images/foto/galerie/moreno-gerard-2023-2024-villarreal-1036949271hjpg-1703677688-124984.jpg'),
(123, 15, 'Alexander Sørloth', 'Delantero', 9, 0, 'https://cdn.vox-cdn.com/thumbor/xrXl_WQkwM9iEvGIPqNL0NjVYms=/0x0:3000x2043/1200x800/filters:focal(1316x250:1796x730)/cdn.vox-cdn.com/uploads/chorus_image/image/73494046/2153711176.0.jpg'),
(124, 15, 'Yéremy Pino', 'Delantero', 21, 0, 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Yeremy-pino-fc-villarreal-2021-1636975488-74714.jpg/800px-Yeremy-pino-fc-villarreal-2021-1636975488-74714.jpg'),
(125, 16, 'Claudio Bravo', 'Portero', 1, 0, 'https://phantom-marca.unidadeditorial.es/5a7e6e08a6c0485d9ca31e0b5a8cebc4/resize/828/f/jpg/assets/multimedia/imagenes/2022/04/05/16491613099523.jpg'),
(126, 16, 'Héctor Bellerín', 'Defensa', 2, 0, 'https://www.sopitas.com/wp-content/uploads/2022/06/rebaja-salarial-aceptaria-hector-bellerin-regresar-betis-la-liga.jpg'),
(127, 16, 'Germán Pezzella', 'Defensa', 16, 0, 'https://e00-marca.uecdn.es/assets/multimedia/imagenes/2016/05/18/14635571201796.jpg'),
(128, 16, 'Edgar González', 'Defensa', 6, 0, 'https://tmssl.akamaized.net/images/foto/galerie/edgar-gonzalez-real-betis-1599129552-46652.jpg'),
(129, 16, 'Álex Moreno', 'Defensa', 15, 0, 'https://estaticos-cdn.prensaiberica.es/clip/af7cf8f9-a791-49b9-bfd8-24f7b6a67f93_16-9-discover-aspect-ratio_default_0.jpg'),
(130, 16, 'Guido Rodríguez', 'Centrocampista', 5, 0, 'https://media.tycsports.com/files/2022/11/10/503600/betis-guido-rodriguez-2022_1440x810_wmk.webp?v=1'),
(131, 16, 'William Carvalho', 'Centrocampista', 14, 0, 'https://tmssl.akamaized.net/images/foto/galerie/william-carvalho-real-betis-2023-24-1696942680-118870.jpg'),
(132, 16, 'Nabil Fekir', 'Centrocampista', 8, 0, 'https://assets.goal.com/images/v3/blt196835b8114cc733/fekir-ear.jpg'),
(133, 16, 'Sergio Canales', 'Centrocampista', 10, 0, 'https://images.daznservices.com/di/library/DAZN_News/c2/66/sergio-canales-real-betis-laliga_1beyy3vrzczys1dfpcjmm863dn.jpg?t=774226143'),
(134, 16, 'Juanmi', 'Delantero', 7, 0, 'https://www.estadiodeportivo.com/imagenes/cd4586c7-1aae-412f-8020-e207ef6120b5_1200x680.jpeg'),
(135, 16, 'Borja Iglesias', 'Delantero', 9, 0, 'https://tmssl.akamaized.net/images/foto/galerie/borja-iglesias-real-betis-2022-1646373055-81364.jpg'),
(136, 17, 'Predrag Rajković', 'Portero', 1, 0, 'https://phantom-marca.unidadeditorial.es/2f5d3eeec327c076cb3e46776182998c/resize/1200/f/jpg/assets/multimedia/imagenes/2022/07/21/16583889330099.jpg'),
(137, 17, 'Pablo Maffeo', 'Defensa', 15, 0, 'https://e00-marca.uecdn.es/assets/multimedia/imagenes/2022/05/24/16533933790292.jpg'),
(138, 17, 'Antonio Raíllo', 'Defensa', 21, 0, 'https://statics-maker.llt-services.com/mll/images/2023/03/02/original/084f7471-0504-4224-8b6d-53760a117ecd-1032502654.jpg'),
(139, 17, 'Martin Valjent', 'Defensa', 24, 0, 'https://tmssl.akamaized.net/images/foto/galerie/martin-valjent-rcd-mallorca-september-2019-1568028105-25539.jpg'),
(140, 17, 'Jaume Costa', 'Defensa', 18, 0, 'https://okdiario.com/img/2023/02/02/ffsbhtlwiaaa5t4.jpg'),
(141, 17, 'Iddrisu Baba', 'Centrocampista', 12, 0, 'https://estaticos-cdn.prensaiberica.es/clip/aa68b81d-1082-4e90-bf20-b5070a4b869e_alta-libre-aspect-ratio_default_0.jpg'),
(142, 17, 'Dani Rodríguez', 'Centrocampista', 14, 0, 'https://s1.sportstatics.com/relevo/www/multimedia/202301/03/media/cortadas/Dani-Rodriguez-R4tEG3WY279gEtmUnZQtKEK-1200x648@Relevo.jpg'),
(143, 17, 'Lee Kang-in', 'Centrocampista', 19, 0, 'https://estaticos-cdn.prensaiberica.es/clip/40b03734-e087-4a0a-827c-dd29ebee9b75_16-9-discover-aspect-ratio_default_0_x2606y1595.jpg'),
(144, 17, 'Vedat Muriqi', 'Delantero', 7, 0, 'https://media.tycsports.com/files/2022/11/10/503451/vedat-muriqi-mallorca_1440x810_wmk.webp'),
(145, 17, 'Ángel Rodríguez', 'Delantero', 9, 0, 'https://e00-marca.uecdn.es/assets/multimedia/imagenes/2022/02/18/16451813793352.png'),
(146, 17, 'Abdon Prats', 'Delantero', 17, 0, 'https://phantom-marca.unidadeditorial.es/9370d191c354d6ca99aa6d828c9e9067/resize/828/f/jpg/assets/multimedia/imagenes/2023/10/04/16964267987243.jpg'),
(147, 18, 'Agustín Marchesín', 'Portero', 1, 0, 'https://tmssl.akamaized.net/images/foto/galerie/agustin-marchesin-celta-de-vigo-2022-23-1681913715-105748.jpg'),
(148, 18, 'Hugo Mallo', 'Defensa', 2, 0, 'https://s1.elespanol.com/2024/07/11/deportes/futbol/869673607_247709730_1706x960.jpg'),
(149, 18, 'Joseph Aidoo', 'Defensa', 15, 0, 'https://static.futbolfantasy.com/thumb/1134x709/uploads/images/fotos_noticias1920/20230528-aidoo.jpg'),
(150, 18, 'Unai Núñez', 'Defensa', 4, 0, 'https://image-service.onefootball.com/transform?w=280&h=210&dpr=2&image=https%3A%2F%2Fbit.ly%2F45dbCpM'),
(151, 18, 'Javi Galán', 'Defensa', 17, 0, 'https://cdn.vox-cdn.com/thumbor/e6jMJ5HSIlEujnCi_EuDSqGTBCI=/0x0:1529x2294/1200x800/filters:focal(497x397:741x641)/cdn.vox-cdn.com/uploads/chorus_image/image/71276636/1372054199.0.jpg'),
(152, 18, 'Renato Tapia', 'Centrocampista', 14, 0, 'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/6DFUGQFHTVGRZO7AYECSTRHBWA.png'),
(153, 18, 'Fran Beltrán', 'Centrocampista', 8, 0, 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEje0i4aNMRGLuuDqjxtZsSFdtFdi09S4M5bDIU2LsQJYWyVEBB94WOKNkBL9VseyF_Y046ZzIalrZGm4GxyTyjV5pOp_Y2fq3lmb32kw_CffZYcBViB-t_BFEQsjO81FyO4Q8yeYcP7tQ5c/s1920/Beltra%25CC%2581n+593+Celta.jpeg'),
(154, 18, 'Gabri Veiga', 'Centrocampista', 24, 0, 'https://images.daznservices.com/di/library/DAZN_News/8/7e/gabri-veiga-celta-de-vigo-laliga_1luan0arpbcb21e82vd27dq4ke.jpg?t=-1619423563'),
(155, 18, 'Iago Aspas', 'Delantero', 10, 0, 'https://images.ecestaticos.com/EZI0hKQRE2BcuYNlm_v7DNhxZ0M=/129x0:2126x1498/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fd48%2Ffdd%2F8f3%2Fd48fdd8f3d37901e9d3a2ac6abd9d198.jpg'),
(156, 18, 'Gonçalo Paciência', 'Delantero', 9, 0, 'https://rccelta.es/app/uploads/2023/09/20230901_Gon%C3%A7aloPaci%C3%AAncia_1.jpg'),
(157, 18, 'Carles Pérez', 'Delantero', 7, 0, 'https://phantom-marca.unidadeditorial.es/6a04ad0017c06f398dc9637795d8631b/resize/828/f/jpg/assets/multimedia/imagenes/2022/08/27/16615896930124.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `partido`
--

CREATE TABLE `partido` (
  `id` int(11) NOT NULL,
  `equipo_local_id` int(11) NOT NULL,
  `equipo_visitante_id` int(11) NOT NULL,
  `goles_local` int(11) NOT NULL DEFAULT 0,
  `goles_visitante` int(11) NOT NULL DEFAULT 0,
  `ganador_id` int(11) DEFAULT NULL,
  `fecha` datetime NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 0,
  `jornada` int(11) NOT NULL,
  `jugador_destacado_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `partido`
--

INSERT INTO `partido` (`id`, `equipo_local_id`, `equipo_visitante_id`, `goles_local`, `goles_visitante`, `ganador_id`, `fecha`, `estado`, `jornada`, `jugador_destacado_id`) VALUES
(28, 13, 12, 1, 3, 12, '2025-04-09 12:00:30', 1, 1, 78),
(30, 14, 12, 1, 1, NULL, '2025-04-09 15:02:47', 1, 3, 112),
(31, 14, 13, 0, 2, 13, '2025-04-09 09:02:47', 1, 2, 89),
(32, 15, 14, 3, 0, 15, '2025-04-09 00:03:57', 1, 1, 119),
(34, 12, 15, 2, 1, 12, '2025-04-09 15:03:57', 0, 3, 76),
(35, 15, 13, 1, 1, NULL, '2025-04-09 06:03:57', 1, 3, 88),
(36, 16, 14, 1, 1, NULL, '2025-04-08 18:04:56', 1, 4, 135),
(38, 16, 18, 2, 2, NULL, '2025-04-09 12:04:56', 1, 3, 155),
(39, 16, 13, 1, 1, NULL, '2025-04-09 12:04:56', 1, 4, 132),
(40, 16, 15, 0, 2, 15, '2025-04-09 03:04:56', 1, 5, 122),
(41, 17, 19, 0, 1, 19, '2025-04-08 21:05:48', 1, 5, 102),
(43, 12, 19, 1, 0, 12, '2025-04-09 09:05:48', 1, 4, 78),
(44, 17, 12, 0, 2, 12, '2025-04-08 21:05:48', 1, 1, 80),
(45, 17, 13, 1, 2, 13, '2025-04-09 00:05:48', 1, 3, 90),
(46, 17, 15, 1, 2, 15, '2025-04-08 18:05:48', 1, 7, 124),
(47, 18, 14, 2, 1, 18, '2025-04-09 00:06:47', 1, 4, 156),
(49, 12, 17, 3, 0, 12, '2025-04-09 09:06:47', 0, 6, 79),
(50, 18, 17, 2, 1, 18, '2025-04-08 21:06:47', 1, 2, 155),
(51, 18, 13, 1, 3, 13, '2025-04-08 21:06:47', 1, 3, 86),
(52, 13, 19, 2, 2, NULL, '2025-04-09 03:06:47', 1, 6, 89),
(53, 18, 15, 1, 3, 15, '2025-04-08 18:06:47', 1, 2, 123),
(54, 19, 14, 2, 0, 19, '2025-04-08 21:11:48', 1, 1, 101),
(55, 19, 16, 2, 0, 19, '2025-04-09 03:11:48', 1, 2, 101),
(56, 19, 18, 3, 0, 19, '2025-04-08 21:11:48', 1, 1, 97),
(57, 15, 17, 2, 0, 15, '2025-04-08 21:11:48', 1, 3, 120),
(58, 19, 16, 1, 0, 19, '2025-04-08 18:11:48', 1, 7, 100),
(59, 14, 18, 3, 1, 14, '2025-04-09 03:11:48', 1, 5, 111),
(60, 12, 16, 2, 0, 12, '2025-04-08 21:11:48', 1, 4, 75);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `torneo`
--

CREATE TABLE `torneo` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `torneo`
--

INSERT INTO `torneo` (`id`, `nombre`, `descripcion`, `fecha`) VALUES
(1, 'Torneo Más 42', 'Torneo desarrollado con formato de Liga, Unete y se parte de estos duelos', '2025-04-08');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `equipo`
--
ALTER TABLE `equipo`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Nombre` (`Nombre`);

--
-- Indices de la tabla `goleadores`
--
ALTER TABLE `goleadores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `partido_id` (`partido_id`),
  ADD KEY `jugador_id` (`jugador_id`),
  ADD KEY `equipo_id` (`equipo_id`);

--
-- Indices de la tabla `jugadores`
--
ALTER TABLE `jugadores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `equipo_id` (`equipo_id`);

--
-- Indices de la tabla `partido`
--
ALTER TABLE `partido`
  ADD PRIMARY KEY (`id`),
  ADD KEY `equipo_local_id` (`equipo_local_id`),
  ADD KEY `equipo_visitante_id` (`equipo_visitante_id`),
  ADD KEY `ganador_id` (`ganador_id`),
  ADD KEY `jugador_destacado_id` (`jugador_destacado_id`);

--
-- Indices de la tabla `torneo`
--
ALTER TABLE `torneo`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administrador`
--
ALTER TABLE `administrador`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `equipo`
--
ALTER TABLE `equipo`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `goleadores`
--
ALTER TABLE `goleadores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=244;

--
-- AUTO_INCREMENT de la tabla `jugadores`
--
ALTER TABLE `jugadores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=158;

--
-- AUTO_INCREMENT de la tabla `partido`
--
ALTER TABLE `partido`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT de la tabla `torneo`
--
ALTER TABLE `torneo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `goleadores`
--
ALTER TABLE `goleadores`
  ADD CONSTRAINT `goleadores_ibfk_1` FOREIGN KEY (`partido_id`) REFERENCES `partido` (`id`),
  ADD CONSTRAINT `goleadores_ibfk_2` FOREIGN KEY (`jugador_id`) REFERENCES `jugadores` (`id`),
  ADD CONSTRAINT `goleadores_ibfk_3` FOREIGN KEY (`equipo_id`) REFERENCES `equipo` (`Id`);

--
-- Filtros para la tabla `jugadores`
--
ALTER TABLE `jugadores`
  ADD CONSTRAINT `jugadores_ibfk_1` FOREIGN KEY (`equipo_id`) REFERENCES `equipo` (`Id`);

--
-- Filtros para la tabla `partido`
--
ALTER TABLE `partido`
  ADD CONSTRAINT `partido_ibfk_1` FOREIGN KEY (`equipo_local_id`) REFERENCES `equipo` (`Id`),
  ADD CONSTRAINT `partido_ibfk_2` FOREIGN KEY (`equipo_visitante_id`) REFERENCES `equipo` (`Id`),
  ADD CONSTRAINT `partido_ibfk_3` FOREIGN KEY (`ganador_id`) REFERENCES `equipo` (`Id`),
  ADD CONSTRAINT `partido_ibfk_4` FOREIGN KEY (`jugador_destacado_id`) REFERENCES `jugadores` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
