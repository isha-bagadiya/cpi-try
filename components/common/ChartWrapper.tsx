'use client'

import React, { memo, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement, TimeScale } from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation'

// Dynamically import chart components with SSR disabled
const DynamicBar = dynamic(
    () => import('react-chartjs-2').then(mod => mod.Bar),
    { ssr: false, loading: () => <div className="h-[400px] animate-pulse bg-gray-100 rounded-lg w-full" /> }
)

const DynamicLine = dynamic(
    () => import('react-chartjs-2').then(mod => mod.Line),
    { ssr: false, loading: () => <div className="h-[400px] animate-pulse bg-gray-100 rounded-lg w-full" /> }
)

// Register Chart.js components globally (only once)
ChartJS.register(CategoryScale, TimeScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, annotationPlugin)

interface ChartWrapperProps {
    type: 'bar' | 'line'
    data: any
    options: any
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({ type, data, options }) => {
    // Dynamically choose between bar or line chart
    const ChartComponent = type === 'bar' ? DynamicBar : DynamicLine

    return (
        <ChartComponent data={data} options={options} />
    )
}

// Wrap with React.memo to prevent unnecessary re-renders
export default memo(ChartWrapper)
