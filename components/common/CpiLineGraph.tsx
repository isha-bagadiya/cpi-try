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

const CPILineGraph: React.FC<{ 
  cpiResults: CPIResult[];
  initialCPI: CPIResult[];
}> = ({ cpiResults, initialCPI }) => {
  // Format dates from filenames to standardized ISO format
  const formatDate = (filename: string) => {
    if (!filename || typeof filename !== 'string') {
      console.warn('Invalid filename received:', filename);
      return '';
    }

    const dateStr = filename.replace('.csv', '');
    
    // Handle both MM-DD-YYYY and YYYY-MM-DD formats
    if (dateStr.includes('-')) {
      const parts = dateStr.split('-');
      if (parts[0].length === 4) {
        // YYYY-MM-DD format - use the date string directly
        return dateStr;
      } else {
        // MM-DD-YYYY format - construct ISO string
        const month = parts[0].padStart(2, '0');
        const day = parts[1].padStart(2, '0');
        const year = parts[2];
        return `${year}-${month}-${day}`;
      }
    }
    return dateStr; // Return as is if no dashes found
  };

  // Get all unique dates from both datasets and sort chronologically
  const allDates = Array.from(
    new Set([
      ...initialCPI.map(item => formatDate(item.filename)),
      ...cpiResults.map(item => formatDate(item.filename))
    ])
  ).filter(Boolean).sort();

  const formatDisplayDate = (dateStr: string) => {
    try {
      if (!dateStr || typeof dateStr !== 'string') {
        console.warn('Invalid date string received:', dateStr);
        return '';
      }

      // Create date object in UTC
      const date = new Date(dateStr + 'T00:00:00Z');
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        console.warn('Invalid date created from:', dateStr);
        return dateStr;
      }

      return date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        timeZone: 'UTC'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateStr;
    }
  };

  const data = {
    labels: allDates,
    datasets: [
      {
        label: "Historical CPI",
        data: allDates.map(date => {
          const result = initialCPI.find(r => formatDate(r.filename) === date);
          return result ? result.cpi : null;
        }),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        tension: 0.4,
        spanGaps: true,
        pointRadius: 4,
        pointHoverRadius: 5,
        order: 2,
      },
      {
        label: "Simulated CPI",
        data: allDates.map(date => {
          const result = cpiResults.find(r => formatDate(r.filename) === date);
          return result ? result.cpi : null;
        }),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.4,
        spanGaps: true,
        pointRadius: 4,
        pointHoverRadius: 5,
        order: 1,
      }
    ],
  };

  const options: ChartOptions<"line"> = {
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            family: 'Inter',
            size: 12
          },
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          title: (context) => {
            return formatDisplayDate(context[0].label);
          },
          label: (context) => {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(4)}`;
          }
        },
        displayColors: true,
      },
    },
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: "Date",
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        ticks: { 
          autoSkip: true,
          maxTicksLimit: 8,
          maxRotation: 45,
          minRotation: 45,
          callback: function(value) {
            return formatDisplayDate(value as string);
          }
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      y: {
        title: {
          display: true,
          text: "CPI Value",
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        ticks: {
          precision: 4,
          callback: function(value) {
            return Number(value).toFixed(2);
          }
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    },
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg h-[500px] p-6">
      <Line data={data} options={options} />
    </div>
  );
};

export default CPILineGraph;