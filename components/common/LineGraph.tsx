'use client'

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js';
import 'chartjs-adapter-date-fns';
import annotationPlugin from 'chartjs-plugin-annotation';
import { parse, format } from 'date-fns';



ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend, annotationPlugin);

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
interface CustomChartData extends ChartData<'line'> {
    annotations?: Annotation;
}


// Define the shape of the CPI Data
interface CPIData {
    date: string;
    CPI: string;
}

const LineGraph: React.FC = () => {
    const [chartData, setChartData] = useState<CustomChartData | null>(null);
    const [view, setView] = useState<'daily' | 'movingAverage'>('daily');
    const [lastUpdateDate, setLastUpdateDate] = useState<string>('');

    // Fetch and process data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/output_hhi_cpi.json');
                const data: CPIData[] = await response.json();
                const formattedData = parseJSON(data);

                const lastDate = formattedData.labels[formattedData.labels.length - 1] as Date;
                setLastUpdateDate(lastDate ? format(lastDate, 'dd MMMM yyyy') : 'N/A');
                console.log(formattedData)
                setChartData(formattedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [view]);

    // Function to parse and process the JSON data
    const parseJSON = (data: CPIData[]) => {
        const labels: Date[] = [];
        const cpiData: number[] = [];

        data.forEach((item) => {
            const date = parse(item.date, 'dd-MM-yyyy', new Date());
            const cpi = parseFloat(item.CPI);
            if (date && !isNaN(cpi)) {
                labels.push(date);
                cpiData.push(cpi);
            }
        });

        // Calculate Moving Average
        const calculateMovingAverage = (data: number[], windowSize: number) => {
            const result: number[] = [];
            for (let i = 0; i < data.length; i++) {
                const window = data.slice(Math.max(0, i - windowSize + 1), i + 1);
                const average = window.reduce((sum, value) => sum + value, 0) / window.length;
                result.push(average);
            }
            return result;
        };

        const datasets = [
            {
                label: view === 'movingAverage' ? '7-Day Moving Average CPI' : 'Daily CPI',
                data: view === 'movingAverage' ? calculateMovingAverage(cpiData, 7) : cpiData,
                borderColor: '#FF0420',
                fill: false,
                pointRadius: 4,
                pointBackgroundColor: '#fff',
                pointBorderColor: '#FF0420',
                pointHoverRadius: 6,
                pointHoverBackgroundColor: '#e4302d',
                pointHoverBorderColor: '#fff',
            },
        ];

        const events = [
            { name: 'RPGF Round 2', startDate: '01-06-2022', endDate: '30-03-2023', color: 'rgba(255,0,0,0.7)' },
            { name: 'RPGF Round 3', startDate: '14-10-2023', endDate: '11-01-2024', color: 'rgba(255,0,0,0.7)' },
            { name: 'RPGF Round 4', startDate: '03-06-2024', endDate: '11-01-2024', color: 'rgba(255,0,0,0.7)' },
            { name: 'Season 3', startDate: '26-01-2023', endDate: '05-04-2023', color: 'rgba(128,0,128,0.7)' },
            { name: 'Season 4', startDate: '08-06-2023', endDate: '20-09-2023', color: 'rgba(128,0,128,0.7)' },
            { name: 'Season 5', startDate: '04-01-2024', endDate: '00-00-0000', color: 'rgba(128,0,128,0.7)' },
            { name: 'Season 6', startDate: '27-06-2024', endDate: '00-00-0000', color: 'rgba(128,0,128,0.7)' }
        ];

        const annotations: Annotation = {};

        // Adding Event Annotations
        events.forEach((event, index) => {
            const isRPGF = event.name.includes('RPGF');
            const yPosition = isRPGF ? '8%' : '12%';
            const start = parse(event.startDate, 'dd-MM-yyyy', new Date());
            annotations[`eventLine${index}`] = {
                type: 'line',
                xMin: start,
                xMax: start,
                borderColor: event.color,
                borderWidth: 1,
                borderDash: [6, 6],
            };
            annotations[`eventLabel${index}`] = {
                type: 'label',
                xValue: start,
                yValue: yPosition,
                content: event.name,
                font: {
                    size: 12,
                    weight: 'bold',
                },
                color: event.color,
                textAlign: 'center',
                xAdjust: isRPGF ? 55 : 40,
                yAdjust: isRPGF ? -20 : 20,
            };
        });

        return {
            labels,
            datasets,
            annotations,
        };
    };

    // Define chart options with types
    const options: ChartOptions<'line'> = {
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    title: function (tooltipItems) {
                        return `Date - ${format(new Date(tooltipItems[0].label as string), 'yyyy-MM-dd')}`;
                    },
                    label: function (tooltipItem) {
                        const value = (tooltipItem.raw as number).toFixed(2);
                        const label = chartData?.datasets[0].label?.includes('Moving Average')
                            ? `7-D MACPI - ${value}`
                            : `CPI - ${value}`;
                        return label;
                    },
                },
            },
            annotation: {
                annotations: chartData?.annotations || {},
            },
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    tooltipFormat: 'yyyy-MM-dd',
                    displayFormats: { day: 'MMM yyyy' },
                },
                // title: { display: true, text: 'Date' },
                ticks: { autoSkip: true, maxTicksLimit: 10 },
            },
            y: {
                min: 40,
                max: 320,
                ticks: { stepSize: 40 },
                // title: { display: true, text: 'CPI' },
            },
        },
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 2000,
            easing: 'easeOutQuart',
        },
    };

    return (
        <div className="container mx-auto flex flex-col items-center justify-center p-3 rounded-lg shadow-md w-full my-10 pb-10">
            {/* Header Section */}
            <h2 className='font-mori font-semibold text-white text-2.5xl md:text-5xl mb-4 text-center max-w-[80%]'>Optimisum CPI Over Time </h2>
            <div className="border border-gray-300 flex justify-center items-center mb-4 self-end rounded-lg">
                <label>
                    <span className='hidden'> Optimism CPI Over Time</span>
                    <select className="px-2 py-2 font-mori font-normal text-sm bg-dark-gray rounded-lg" onChange={(e) => setView(e.target.value as 'daily' | 'movingAverage')} value={view}>
                        <option value="daily">Daily CPI</option>
                        <option value="movingAverage">7-Day Moving Average</option>
                    </select>
                </label>
            </div>
            {/* Chart Rendering */}
            <div className="relative w-full bg-white border border-gray-300 rounded-lg h-[550px] py-8 px-4">
                {chartData ? (

                    <Line data={chartData} options={options} />


                ) : (
                    <p>Loading chart...</p>
                )}
                <div className="font-mori font-normal text-xs text-gray-500 text-end pt-4">Last updated on:- <span className='text-black ml-1'>{lastUpdateDate}</span></div>

            </div>

            <div className='font-mori font-normal max-w-[90%] pt-4 text-xl'>The concentration of power within the collective has been steadily declining with each season and RPGF round.</div>
        </div>
    );
};

export default LineGraph;
