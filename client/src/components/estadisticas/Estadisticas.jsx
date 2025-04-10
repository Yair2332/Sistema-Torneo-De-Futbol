import { useEffect, useRef, useState } from "react";
import { Chart } from 'chart.js/auto';
import axios from "axios";

function Estadisticas({ idEquipo }) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [estadisticas, setEstadisticas] = useState(null);
    const [escala, setEscala] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const buscarEstadisticas = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:3001/equipos/buscarEstadisticas/${id}`);
            
            if (response.data && response.data.Est) {
                const datosArray = response.data.Est.split(',')
                    .map(item => parseInt(item.trim(), 10))
                    .filter(num => !isNaN(num));

                setEstadisticas(datosArray);
            } else {
                setError("Formato de datos inválido");
                setEstadisticas([]);
            }
        } catch (e) {
            setError("Error al cargar estadísticas");
            console.error(e);
            setEstadisticas([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (idEquipo) {
            buscarEstadisticas(idEquipo);
        }
    }, [idEquipo]);

    useEffect(() => {
        if (!estadisticas || estadisticas.length === 0) return;

        let contador = 0;
        const variantes = estadisticas.map((dato) => {
            const valor = Number(dato) || 0;
            contador += valor;
            return contador;
        });

        setEscala(variantes); // Sin interpolación
    }, [estadisticas]);

    useEffect(() => {
        if (!chartRef.current || escala.length === 0) return;

        const ctx = chartRef.current.getContext("2d");

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
            type: "line",
            data: {
                labels: Array(escala.length).fill().map((_, i) => `Jornada ${i + 1}`),
                datasets: [
                    {
                        label: "Racha de partidos",
                        data: escala,
                        borderColor: "white",
                        backgroundColor: "rgba(226, 226, 226, 0.1)",
                        fill: true,
                        tension: 0.3, // Baja tensión para cambios bruscos
                        borderWidth: 2,
                        pointRadius: 4 // Tamaño de los puntos
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: 'white'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Evolución de partidos en el Torneo',
                        color: 'white'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Partidos',
                            color: 'white'
                        },
                        ticks: {
                            color: 'white'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Jornadas',
                            color: 'white'
                        },
                        ticks: {
                            color: 'white'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    }
                }
            }
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [escala]);

    return (
        <div className="container mt-2 p-0 estadisticas">
            <div className="card shadow-lg bg-dark">
                <div className="card-body bg-dark">
                    <h5 className="card-title text-light">Evolución de Puntos</h5>
                    
                    {loading && <div className="text-light">Cargando...</div>}
                    {error && <div className="text-danger">{error}</div>}
                    
                    {!loading && !error && (
                        <div className="chart-container" style={{ position: 'relative', height: '400px', width: '100%' }}>
                            <canvas ref={chartRef}></canvas>
                            {escala.length === 0 && (
                                <div className="text-light text-center mt-3">
                                    No hay datos disponibles
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Estadisticas;