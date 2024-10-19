import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type CPIResult = {
  filename: string;
  cpi: number;
};

const CPILineGraph: React.FC<{ cpiResults: CPIResult[] }> = ({ cpiResults }) => {
  const data = {
    labels: cpiResults.map(result => result.filename),
    datasets: [
      {
        label: 'CPI',
        data: cpiResults.map(result => result.cpi),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'CPI Results',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Filename'
        }
      },
      y: {
        title: {
          display: true,
          text: 'CPI'
        },
        beginAtZero: true
      }
    }
  };

  return (
    <div className="w-full h-[400px]">
      <Line data={data} options={options} />
    </div>
  );
};

export default CPILineGraph;