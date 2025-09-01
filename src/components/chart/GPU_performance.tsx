// components/LineComparisonChart.tsx
import React from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const GPU_performance = () => {
  const data = {
    labels: ['6 PM', '', '', 'Tue 17', '', '', '6 AM', '', '', ''],
    datasets: [
      {
        label: 'Dataset 1',
        data: [0, 6, 5, 65, 45, 30, 1, 0, 35, 1],
        borderColor: '#3b82f6', // blue
        borderWidth: 2,
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Dataset 2',
        data: [0, 5, 3, 60, 50, 25, 1, 0, 28, 1],
        borderColor: '#ef4444', // red
        borderWidth: 2,
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: '#ccc',
        },
        grid: {
          color: '#444',
        },
      },
      y: {
        ticks: {
          callback: function (tickValue: string | number) {
            return `${tickValue}%`;
          },
          color: '#ccc',
        },
        grid: {
          color: '#444',
        },
        min: 0,
        max: 70,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    
      <Line data={data} options={options} />
    
  );
};

export default GPU_performance;
