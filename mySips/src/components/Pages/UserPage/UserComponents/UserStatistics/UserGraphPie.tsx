import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// Register Chart.js modules
ChartJS.register(ArcElement, Tooltip, Legend, Title);

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
interface IUserGraphPie {
    height?: number;
    width?: number;
    pieColors?: string[]; // Array of colors for datasets
    fontSize?: number;
    fontColor?: string;
    title?: string;
    labels?: string[];
    datasets?: Array<{
        label: string;
        data: number[];
        backgroundColor?: string[];
    }>;
    showLegend?: boolean;
}

const UserGraphPie: React.FC<IUserGraphPie> = ({
    height = 300,
    width = 300,
    pieColors = [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
    ],
    fontSize = 12,
    fontColor = "rgba(255,255,255,0.6)",
    title,
    labels = [],
    datasets = [],
    showLegend = false,
}) => {
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: showLegend,
                labels: {
                    usePointStyle: true,
                    pointStyle: "circle",
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
    };

    const chartData = {
        labels,
        datasets: datasets.map((dataset, index) => ({
            ...dataset,
            backgroundColor:
                dataset.backgroundColor ||
                pieColors.slice(0, dataset.data.length),
            borderWidth: 1, // Removes the outline
            borderColor: "#1c1c1c",
            borderRadius: 5,
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
            <Pie options={options} data={chartData} />
        </div>
    );
};

export default UserGraphPie;
