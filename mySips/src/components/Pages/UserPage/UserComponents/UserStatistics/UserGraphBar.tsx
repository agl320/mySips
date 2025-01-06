import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Register Chart.js modules
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
    Title
);

// Transparent background plugin
const customTransparentBackgroundPlugin = {
    id: "transparent_background",
    beforeDraw: (chart) => {
        const { ctx, width, height } = chart;
        ctx.save();
        ctx.clearRect(0, 0, width, height);
        ctx.restore();
    },
};
ChartJS.register(customTransparentBackgroundPlugin);

// Props interface
interface IUserGraphBar {
    height?: number;
    width?: number;
    barColors?: string[]; // Array of colors for multiple datasets
    fontSize?: number;
    fontColor?: string;
    title?: string;
    labels?: string[];
    datasets?: Array<{
        label: string;
        data: number[];
        backgroundColor?: string;
    }>;
    yAxisLabel: string;
}

// Bar chart component
const UserGraphBar: React.FC<IUserGraphBar> = ({
    height = 300,
    width = 500,
    barColors = ["#ff844b", "#3578e5"],
    fontSize = 12,
    fontColor = "rgba(255,255,255,0.6)",
    title,
    labels = ["0", "25", "50", "75", "100"], // Default labels for Sugar/Ice levels
    datasets = [],
    yAxisLabel = "Frequency",
}) => {
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: datasets.length > 0,
                labels: {
                    usePointStyle: true,
                    pointStyle: "rectRounded", // Rounded legend boxes
                    padding: 20,
                    color: fontColor,
                    font: {
                        family: "General Sans, sans-serif",
                        size: fontSize + 2,
                    },
                },
            },
            title: {
                display: !!title,
                text: title,
                font: {
                    weight: "normal",
                    size: fontSize + 6,
                    family: "General Sans, sans-serif",
                },
                color: fontColor,
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: yAxisLabel,
                    font: {
                        size: fontSize + 2,
                        family: "General Sans, sans-serif",
                    },
                    color: fontColor,
                },
                ticks: {
                    font: {
                        size: fontSize,
                        family: "General Sans, sans-serif",
                    },
                    color: fontColor,
                },
                grid: { color: "rgba(255,255,255,0.2)" },
            },
            x: {
                title: {
                    display: true,
                    text: "Levels",
                    font: {
                        size: fontSize + 2,
                        family: "General Sans, sans-serif",
                    },
                    color: fontColor,
                },
                ticks: {
                    font: {
                        size: fontSize,
                        family: "General Sans, sans-serif",
                    },
                    color: fontColor,
                },
                grid: { color: "rgba(255,255,255,0.2)" },
            },
        },
    };

    const chartData = {
        labels,
        datasets: datasets.map((dataset, index) => ({
            ...dataset,
            backgroundColor:
                dataset.backgroundColor || barColors[index % barColors.length],
        })),
    };

    return (
        <div
            style={{
                height: `${height}px`,
                width: `${width}px`,
                position: "relative",
            }}
        >
            <Bar options={options} data={chartData} />
        </div>
    );
};

export default UserGraphBar;
