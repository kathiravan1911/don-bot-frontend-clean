import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const COLORS = ["#22c55e", "#ef4444", "#facc15"]; // green, red, yellow

const StatusPieChart = ({ data }) => {
  const summary = {
    "Target Hit": 0,
    "SL Hit": 0,
    "Open": 0,
  };

  data.forEach((row) => {
    const status = row.Status || "Open";
    if (status.includes("Target")) summary["Target Hit"] += 1;
    else if (status.includes("SL")) summary["SL Hit"] += 1;
    else summary["Open"] += 1;
  });

  const chartData = Object.entries(summary).map(([name, value]) => ({ name, value }));

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">📊 Trade Status Summary</h3>
      <PieChart width={300} height={240}>
        <Pie
          data={chartData}
          cx={150}
          cy={120}
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default StatusPieChart;

