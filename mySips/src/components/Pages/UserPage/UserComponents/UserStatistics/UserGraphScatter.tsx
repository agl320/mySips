import React from "react";
import { Scatter } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Title,
} from "chart.js";

// Register Chart.js modules
ChartJS.register(
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
interface IUserGraphScatter {
    height?: number;
    width?: string;
    lineColor?: string;
    fontSize?: number;
    fontColor?: string;
    title?: string;
    xAxisLabel?: string;
    yAxisLabel?: string;
    data?: Array<{ x: number; y: number }>;
    dataLabel?: string;
}

// Scatter chart component
const UserGraphScatter: React.FC<IUserGraphScatter> = ({
    height = 250,
    width = "100%",
    lineColor = "#ff844b",
    fontSize = 12,
    fontColor = "rgba(255,255,255,0.6)",
    title = "Scatter Chart",
    xAxisLabel = "X-Axis",
    yAxisLabel = "Y-Axis",
    data = [],
    dataLabel,
}) => {
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: dataLabel ? true : false,
                labels: {
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
        datasets: [
            {
                label: dataLabel,
                data,
                backgroundColor: lineColor,
            },
        ],
    };

    return (
        <div
            style={{
                height: `${height}px`,
                width: `${width}`,
                position: "relative",
            }}
        >
            <Scatter options={options} data={chartData} />
        </div>
    );
};

export default UserGraphScatter;
