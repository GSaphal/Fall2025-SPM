// @ts-nocheck
import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const generateGradient = (ctx, color) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, `${color}90`); // Stronger opacity at the top
  gradient.addColorStop(1, `${color}10`); // Subtle fade at the bottom
  return gradient;
};

const SpendingChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      const ctx = chart.ctx;
      chart.data.datasets[0].backgroundColor = generateGradient(
        ctx,
        "rgba(34, 197, 94,"
      );
      chart.update();
    }
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Monthly Spending ($)",
        data: [
          1200, 900, 1400, 1100, 1500, 1300, 1700, 1600, 1400, 1500, 1800, 1900,
        ],
        borderColor: "#22c55e", // Tailwind green-400
        tension: 0.5, // Smooth curve
        pointBorderColor: "#fff",
        pointBackgroundColor: "#22c55e",
        pointHoverRadius: 6,
        pointRadius: 4,
        pointHoverBackgroundColor: "#16a34a",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: "#374151",
        titleColor: "#fff",
        bodyColor: "#e5e7eb",
        borderColor: "#6b7280",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#6b7280", // Tailwind gray-500
          font: { size: 14 },
        },
        grid: { display: false },
      },
      y: {
        display: false, // Hide Y-axis
      },
    },
    elements: {
      line: { borderWidth: 3 },
      point: { borderWidth: 2 },
    },
  };

  return (
    <div className="h-44">
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default SpendingChart;
