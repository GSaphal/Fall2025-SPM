import React, { useEffect, useState } from "react";

const CircularProgress = ({
  percentage,
  size = 80,
  strokeWidth = 6,
  strokeColor = "#4ade80",
  trackColor = "#e5e7eb",
}) => {
  const [progress, setProgress] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const timeout = setTimeout(() => setProgress(percentage), 300);
    return () => clearTimeout(timeout);
  }, [percentage]);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (progress / 100) * circumference}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.6s ease-in-out" }}
        />
      </svg>
      {/* Percentage Label */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: size < 80 ? "0.75rem" : "0.875rem",
          fontWeight: "600",
          color: "#111827",
        }}
      >
        {progress.toFixed(2)}%
      </div>
    </div>
  );
};

export default CircularProgress;
