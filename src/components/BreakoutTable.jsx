import React, { useEffect, useState } from "react";
import axios from "axios";
import StatusPieChart from "./StatusPieChart";

const BreakoutTable = () => {
  const [data, setData] = useState([]);
  const [onlyHighChance, setOnlyHighChance] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("https://don-bot-backend.onrender.com/api/breakouts")  // 🌍 LIVE API
        .then((res) => {
          setData(res.data);
          console.log("📊 Data from Render:", res.data);
        })
        .catch((err) => console.error("❌ Error fetching data:", err));
    };

    fetchData(); // First call
    const interval = setInterval(fetchData, 60000); // Refresh every 60 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center gap-4">
        <h2 className="text-xl font-bold">📈 Don Bot Breakout + AI Suggestions</h2>
        <button
          className="bg-blue-600 text-white px-4 py-1 rounded shadow hover:bg-blue-700"
          onClick={() => setOnlyHighChance(!onlyHighChance)}
        >
          {onlyHighChance ? "🔁 Show All" : "✅ Show High Chance Only"}
        </button>
      </div>

      {/* 📊 Pie Chart */}
      <StatusPieChart data={data} />

      {/* 📋 Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-xl shadow">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-2">Symbol</th>
              <th className="p-2">Entry</th>
              <th className="p-2">SL</th>
              <th className="p-2">Target</th>
              <th className="p-2">Status</th>
              <th className="p-2">Success %</th>
              <th className="p-2">AI Suggestion</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((row) => !onlyHighChance || row["AI_Suggestion"].includes("✅"))
              .map((row, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-100">
                  <td className="p-2">{row["Symbol"]}</td>
                  <td className="p-2">{row["Entry"]}</td>
                  <td className="p-2">{row["SL"]}</td>
                  <td className="p-2">{row["Target"]}</td>
                  <td className="p-2">{row["Status"]}</td>
                  <td className="p-2 text-center">{row["SuccessRate"]}%</td>
                  <td className="p-2 text-center">
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        row["AI_Suggestion"].includes("✅")
                          ? "bg-green-600"
                          : row["AI_Suggestion"].includes("❌")
                          ? "bg-red-600"
                          : "bg-gray-500"
                      }`}
                    >
                      {row["AI_Suggestion"]}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BreakoutTable;

