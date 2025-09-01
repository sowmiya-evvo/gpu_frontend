// DonutChart.tsx
import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  Plugin
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);



const data: ChartData<'doughnut', number[], string> = {
  labels: ['Product A', 'Product B', 'Product C', 'Product D'],
  datasets: [
    {
      data: [25, 40, 100, 119],
      backgroundColor: ['#f59e0b', '#10b981', '#3b82f6', '#6366f1'],
      borderWidth: 0,
    },
  ],
};


const options: ChartOptions<'doughnut'> = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '85%', // ✅ set cutout here instead
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
};

const CategoryChart = () => {
  return (

      <Doughnut data={data} options={options}  />
  );
};

export default CategoryChart;
