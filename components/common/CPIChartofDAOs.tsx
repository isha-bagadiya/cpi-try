'use client'
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';
import 'tailwindcss/tailwind.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CPIChartofDAOs: React.FC = () => {
    // Data for the CPI of different platforms
    const data = {
        labels: ['Optimism', 'Compound', 'Aave', 'Uniswap'],
        datasets: [
            {
                label: 'CPI',
                data: [80.8986, 320.723865, 627.338053, 215.291105],
                backgroundColor: ['#FF0420', '#00D395', '#B6509E', '#FF007A'], // Tailwind colors
                borderWidth: 1,
            },
        ],
    };

    // Chart options
    const options: ChartOptions<'bar'> = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // Hide legend as there's only one dataset
            },
            title: {
                display: true,
                text: 'CPI of Major Platforms',
                font: {
                    size: 20,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'CPI Value',
                },
                ticks: {
                    stepSize: 100,
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Platforms',
                },
            },
        },
    };

    return (

        <div className="container mx-auto flex flex-col items-center justify-center my-10 p-3 pb-8">
            <h2 className='font-mori font-semibold text-white text-2.5xl md:text-5xl mb-4 text-center max-w-[80%]'>Featured DAOs CPI</h2>
            <div className="bg-white shadow-lg rounded-lg p-5 w-full max-w-4xl">
                {/* Header Section */}


                {/* Chart Rendering */}
                {data ? (
                    <div className="relative w-full bg-white border border-dark-gray rounded-lg  py-8 px-2">
                        <Bar data={data} />
                    </div>
                ) : (
                    <p>Loading chart...</p>
                )}

                <div className="font-mori font-normal text-xs text-gray-500 text-end pt-4">Last updated on:- <span className='text-black ml-1'>27 August 2024</span></div>
            </div>

        </div>
    );
};

export default CPIChartofDAOs;
