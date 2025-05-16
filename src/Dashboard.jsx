import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const llamadasTotales = 120;
  const tasaContacto = 0.65;
  const duracionPromedio = 2.8; 
  const tasaExito = 0.45;

  const barData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'],
    datasets: [{
      label: 'Llamadas realizadas',
      data: [25, 30, 20, 15, 30],
      backgroundColor: 'rgba(75, 192, 192, 0.6)', // Color de las barras
      borderColor: 'white', // Color del borde de las barras (línea)
      borderWidth: 2, // Ancho del borde
      hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)', // Color al pasar el ratón
      hoverBorderColor: 'white', // Borde al pasar el ratón
      hoverBorderWidth: 3,
    }]
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'white' // Color de las etiquetas en la leyenda
        }
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white' // Color de las etiquetas en el eje X
        },
      },
      y: {
        ticks: {
          color: 'white' // Color de las etiquetas en el eje Y
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)' // Color de las líneas de la cuadrícula
        }
      }
    },
  };

  const pieData = {
    labels: ['Éxito', 'Fallo'],
    datasets: [{
      data: [tasaExito * 100, (1 - tasaExito) * 100],
      backgroundColor: ['#36A2EB', '#FF6384']
    }]
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'white' // Color de las etiquetas en la leyenda
        }
      }
    }
  };

  return (
    <div className="bg-custom-purple text-white p-6 rounded-lg shadow-lg">
      <h2>Dashboard de Métricas</h2>

      {/* Métricas resumidas */}
      <div className="flex gap-6 mb-8">
        <div><strong>Llamadas totales:</strong> {llamadasTotales}</div>
        <div><strong>Tasa de contacto:</strong> {Math.round(tasaContacto * 100)}%</div>
        <div><strong>Duración promedio:</strong> {duracionPromedio} min</div>
        <div><strong>Tasa de éxito:</strong> {Math.round(tasaExito * 100)}%</div>
      </div>

      {/* Gráficos */}
      <div className="flex gap-12">
        <div className="w-2/5">
          <Bar data={barData} options={barOptions} />
        </div>
        <div className="w-1/3">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </div>
  );
};


export default Dashboard;
