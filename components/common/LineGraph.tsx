"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ChartData, ChartOptions } from "chart.js";
import "chartjs-adapter-date-fns";
import annotationPlugin from "chartjs-plugin-annotation";
import { parse, format } from "date-fns";
import useSWR from "swr";
import ChartWrapper from "./ChartWrapper";

// Define types for Event and Annotation
interface Event {
  name: string;
  startDate: string;
  color: string;
}

interface Annotation {
  [key: string]: any;
}

// Extend ChartData to include annotations
interface CustomChartData extends ChartData<"line"> {
  annotations?: Annotation;
}

// Define the shape of the CPI Data
interface CPIData {
  date: string;
  HHI: string;
  CPI: string;
}

interface MovingAverageData {
  date: string;
  HHI: string;
  CPI: string;
}

//fetcher function to fetch the data on the server only
const fetcher = (url: string) =>
  fetch(url).then(async (res) => {
    const data = await res.json();
    return data;
  });

const LineGraph: React.FC = () => {
  const { data: dailyData, error: dailyError } = useSWR<CPIData[]>(
    "/home_hhi_cpi.json",
    fetcher
  );
  
  const { data: movingAverageData, error: movingAverageError } = useSWR<MovingAverageData[]>(
    "/average_hhi_cpi.json",
    fetcher
  );

  const [view, setView] = useState<"daily" | "movingAverage">("daily");
  const [lastUpdateDate, setLastUpdateDate] = useState<string>("");

  // Function to parse and process the JSON data
  const chartData = useMemo(() => {
    const labels: Date[] = [];
    const cpiData: number[] = [];
    const tokenHouseCpiData: number[] = [];

    let data: CPIData[] | MovingAverageData[] | undefined;
    let dataType: "daily" | "movingAverage" = view;

    if (view === "daily" && dailyData) {
      data = dailyData;
    } else if (view === "movingAverage" && movingAverageData) {
      data = movingAverageData;
      // If moving average data uses different column names
      dataType = "movingAverage";
    }

    if (!data) return null;

    data.forEach((item: CPIData | MovingAverageData) => {
      // Update the format from "MM-dd-yyyy" to parse correctly
      const date = parse(item.date, "MM-dd-yyyy", new Date());
      
      let cpi: number;
      let tokenHouseCpi: number;

      if (dataType === "daily") {
        const dailyItem = item as CPIData;
        cpi = parseFloat(dailyItem.CPI);
        tokenHouseCpi = parseFloat(dailyItem.HHI);
      } else {
        const maItem = item as MovingAverageData;
        cpi = parseFloat(maItem.CPI);
        tokenHouseCpi = parseFloat(maItem.HHI);
      }

      if (date && !isNaN(cpi) && !isNaN(tokenHouseCpi)) {
        labels.push(date);
        cpiData.push(cpi);
        tokenHouseCpiData.push(tokenHouseCpi);
      }
    });

    // Datasets for both "CPI" and "Token house CPI"
    const datasets = [
      {
        label: "CPI",
        data: cpiData,
        borderColor: "#FF0420",
        fill: false,
        pointRadius: 4,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#FF0420",
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#e4302d",
        pointHoverBorderColor: "#fff",
      },
      {
        label: "Token house CPI",
        data: tokenHouseCpiData,
        borderColor: "#008080",
        fill: false,
        pointRadius: 4,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#008080",
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#00CED1",
        pointHoverBorderColor: "#fff",
      },
    ];

    // Adding Event Annotations (as before)
    const events = [
      {
        name: "RPGF Round 2",
        startDate: "01-06-2022",
        endDate: "30-03-2023",
        color: "rgba(255,0,0,0.7)",
      },
      {
        name: "RPGF Round 3",
        startDate: "31-03-2023",
        endDate: "11-01-2024",
        color: "rgba(255,0,0,0.7)",
      },
      {
        name: "RPGF Round 4",
        startDate: "12-01-2024",
        endDate: "16-07-2024",
        color: "rgba(255,0,0,0.7)",
      },
      {
        name: "RPGF Round 5",
        startDate: "17-07-2024",
        endDate: "21-10-2024",
        color: "rgba(255,0,0,0.7)",
      },
      {
        name: "RPGF Round 6",
        startDate: "22-10-2024",
        endDate: "00-00-0000",
        color: "rgba(255,0,0,0.7)",
      },
      {
        name: "Season 3",
        startDate: "26-01-2023",
        endDate: "07-06-2023",
        color: "rgba(128,0,128,0.7)",
      },
      {
        name: "Season 4",
        startDate: "08-06-2023",
        endDate: "03-01-2024",
        color: "rgba(128,0,128,0.7)",
      },
      {
        name: "Season 5",
        startDate: "04-01-2024",
        endDate: "26-06-2024",
        color: "rgba(128,0,128,0.7)",
      },
      {
        name: "Season 6",
        startDate: "27-06-2024",
        endDate: "00-00-0000",
        color: "rgba(128,0,128,0.7)",
      },
    ];

    const annotations: Annotation = {};

    events.forEach((event, index) => {
      const isRPGF = event.name.includes("RPGF");
      const yPosition = isRPGF ? "8%" : "12%";
      const start = parse(event.startDate, "dd-MM-yyyy", new Date());
      annotations[`eventLine${index}`] = {
        type: "line",
        xMin: start,
        xMax: start,
        borderColor: event.color,
        borderWidth: 1,
        borderDash: [6, 6],
      };
      annotations[`eventLabel${index}`] = {
        type: "label",
        xValue: start,
        yValue: yPosition,
        content: event.name,
        font: {
          size: 10,
          weight: "bold",
        },
        color: event.color,
        textAlign: "center",
        xAdjust: isRPGF ? 8 : 10,
        yAdjust: isRPGF ? -20 : 20,
        backgroundColor: "white", // Add white background
        padding: {
          top: 4,
          bottom: 4,
          left: 6,
          right: 6,
        },
        borderRadius: 4,
        textOverflow: "clip",
        wordWrap: "break-word",
      };
    });

    const lastDate = labels[labels.length - 1] || null;
    setLastUpdateDate(lastDate ? format(lastDate, "dd MMMM yyyy") : "N/A");

    return {
      labels,
      datasets,
      annotations,
    };
  }, [dailyData, movingAverageData, view]);

  // Define chart options with types
  const options = useMemo<ChartOptions<"line">>(
    () => ({
      plugins: {
        legend: { display: true },
        tooltip: {
          callbacks: {
            title: (tooltipItems) => {
              const label = tooltipItems[0]?.label as string;
              return `Date - ${format(new Date(label), "yyyy-MM-dd")}`;
            },
            label: (tooltipItem) => {
              const dataset = chartData?.datasets?.[tooltipItem.datasetIndex];
              const value = (tooltipItem.raw as number).toFixed(2);
              const label = dataset?.label || "";
              return `${label} - ${value}`;
            },
          },
        },
        annotation: {
          annotations: chartData?.annotations || {},
        },
      },
      scales: {
        x: {
          type: "time",
          time: {
            unit: "day",
            tooltipFormat: "yyyy-MM-dd",
            displayFormats: { day: "MMM yyyy" },
          },
          ticks: { autoSkip: true, maxTicksLimit: 10 },
        },
        y: {
          min: 0,
          max: 1000,
          ticks: { stepSize: 100 },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 2000,
        easing: "easeOutQuart",
      },
    }),
    [chartData]
  );

  if (dailyError || movingAverageError) return <div>Error loading data...</div>;

  return (
    <div className="container mx-auto flex flex-col items-center justify-center p-3 rounded-lg shadow-md w-full my-10 pb-10">
      {/* Header Section */}
      <h2 className="font-mori font-semibold text-white text-2.5xl md:text-5xl mb-4 text-center max-w-[80%]">
        Optimism CPI Over Time{" "}
      </h2>
      <div className="border border-gray-300 flex justify-center items-center mb-4 self-end rounded-lg">
        <label htmlFor="cpi-view-selector" className="sr-only">
          Optimism CPI Over Time
        </label>
        <select
          id="cpi-view-selector"
          className="px-2 py-2 font-mori font-normal text-sm bg-dark-gray rounded-lg"
          onChange={(e) => setView(e.target.value as "daily" | "movingAverage")}
          value={view}
          aria-label="Select CPI view"
          aria-live="polite"
        >
          <option value="daily">Daily CPI</option>
          <option value="movingAverage">7-Day Moving Average</option>
        </select>
      </div>
      {/* Chart Rendering */}
      <div className="relative w-full bg-white border border-gray-300 rounded-lg h-[600px] py-8 px-4">
        {chartData ? (
          <ChartWrapper data={chartData} type="line" options={options} />
        ) : (
          <p>Loading chart...</p>
        )}
        <div className="font-mori font-normal text-xs text-gray-500 text-end pt-4">
          Last updated on:-{" "}
          <span className="text-black ml-1">{lastUpdateDate}</span>
        </div>
      </div>

      <div className="font-mori font-normal max-w-[90%] pt-4 text-xl">
        The concentration of power within the collective has been steadily
        declining with each season and RPGF round.
      </div>
    </div>
  );
};

export default LineGraph;