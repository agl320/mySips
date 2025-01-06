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
} from "chart.js";

// Register Chart.js modules
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
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
interface IUserGraphLine {
    height?: number;
    width?: number;
    lineColors?: string[]; // Array of colors for multiple datasets
    fontSize?: number;
    fontColor?: string;
    title?: string;
    xAxisLabel?: string;
    yAxisLabel?: string;
    labels?: string[];
    datasets?: Array<{
        label: string;
        data: number[];
        borderColor?: string;
        backgroundColor?: string;
    }>;
}

// Line chart component
const UserGraphLine: React.FC<IUserGraphLine> = ({
    height = 250,
    width = 250,
    lineColors = ["#ff844b", "#3578e5"],
    fontSize = 12,
    fontColor = "rgba(255,255,255,0.6)",
    title,
    xAxisLabel = "X-Axis",
    yAxisLabel = "Y-Axis",
    labels = [],
    datasets = [],
}) => {
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: datasets.length > 0,
                labels: {
                    usePointStyle: true, // Use point style for rounded legends
                    pointStyle: "circle", // Set the legend point style to circle
                    padding: 20, // Add padding for better spacing
                    boxWidth: 15, // Adjust the size of the point
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
                    display: !!yAxisLabel,
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
                    display: !!xAxisLabel,
                    text: xAxisLabel,
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
            borderColor:
                dataset.borderColor || lineColors[index % lineColors.length],
            backgroundColor:
                dataset.backgroundColor ||
                `${lineColors[index % lineColors.length]}33`, // 33 for light transparency
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
            <Line options={options} data={chartData} />
        </div>
    );
};

export default UserGraphLine;
