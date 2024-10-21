import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

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

const CPILineGraph: React.FC<{ cpiResults: CPIResult[] }> = ({
  cpiResults,
}) => {
  const data = {
    labels: cpiResults.map((result) => result.filename),
    datasets: [
      {
        label: "CPI",
        data: cpiResults.map((result) => result.cpi),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    plugins: {
      legend: {
        display: true,
        // position: "top" as const,
      },
      title: {
        display: true,
        text: "CPI Results",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Filename",
        },
        ticks: { autoSkip: true, maxTicksLimit: 10 },
      },
      y: {
        title: {
          display: true,
          text: "CPI",
        },
        beginAtZero: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,

    animation: {
      duration: 2000,
      easing: "easeOutQuart",
    },
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center p-3 rounded-lg shadow-md w-full ">
      <div className="relative w-full bg-white border border-gray-300 rounded-lg h-[500px] py-8 px-4">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default CPILineGraph;
