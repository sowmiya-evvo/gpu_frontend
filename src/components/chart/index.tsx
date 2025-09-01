// LineChart.tsx
import React, { useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ScriptableContext,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const LineChart: React.FC = () => {
  const chartRef = useRef(null);

  const labels = [
    '01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan',
    '07 Jan', '08 Jan', '09 Jan', '10 Jan', '11 Jan', '12 Jan',
  ];

  const data: ChartData<'line', number[], string> = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [24, 32, 29, 35, 34, 43, 40, 46, 45, 47, 46, 55],
        fill: false,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 0,
        borderColor: (context: ScriptableContext<'line'>): CanvasGradient | undefined => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) return;

          const gradient = ctx.createLinearGradient(0, 0, chartArea.width, 0);
          gradient.addColorStop(0, '#a855f7');
          gradient.addColorStop(1, '#3b82f6');
          return gradient;
        },
      },
      {
        label: 'Dataset 2',
        data: [20, 25, 23, 24, 23, 29, 27, 35, 33, 34, 32, 37],
        fill: false,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 0,
        borderColor: (context: ScriptableContext<'line'>): CanvasGradient | undefined => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) return;

          const gradient = ctx.createLinearGradient(0, 0, chartArea.width, 0);
          gradient.addColorStop(0, '#38bdf8');
          gradient.addColorStop(1, '#3b82f6');
          return gradient;
        },
      }
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#ccc',
        },
        grid: {
          display: false,
        },
      },
      y: {
        min: 10,
        max: 60,
        ticks: {
          color: '#ccc',
        },
        grid: {
          color: '#2e2e2e',
        },
      },
    },
  };

  return (
    
      <Line ref={chartRef} data={data} options={options} />
    
  );
};

export default LineChart;
