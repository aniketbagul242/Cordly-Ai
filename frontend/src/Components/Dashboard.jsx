import React, { useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const demoEndpoints = [
  { label: "📊 Highest Revenue Product", route: "api/reports/demo-revenue" },
  { label: "👥 Top 2 Customers", route: "api/reports/demo-top-customers" },
  { label: "📈 Monthly Sales Trend", route: "api/reports/demo-monthly-sales" },
  { label: "⚠️ Low Stock Products", route: "api/reports/demo-low-stock" },
];

const Dashboard = () => {
  const [selectedRoute, setSelectedRoute] = useState("");
  const [data, setData] = useState(null);
  const [sql, setSQL] = useState("");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchDemo = async () => {
    if (!selectedRoute) return;
    setLoading(true);
    try {
      const res = await axios.get(`https://cordly-ai-backend.onrender.com/${selectedRoute}`);
      setData(res.data.result);
      setSQL(res.data.sql);
      setQuestion(res.data.question);
    } catch (err) {
      console.error(err);
      setData(null);
      setSQL("");
      setQuestion("Error fetching data");
    }
    setLoading(false);
  };

  const getChart = (question, data) => {
    if (!data || data.length === 0) return null;

    //chart for top customer
    if (question.toLowerCase().includes("top") && question.toLowerCase().includes("customer")) {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="full_name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total_spent" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      );
    }

    // chart for monthly sale
    if (question.toLowerCase().includes("monthly sales")) {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total_sales" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      );
    }

     // chart for highest revenue
    if (question.toLowerCase().includes("highest total revenue")) {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="product_name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#ff7f50" />
          </BarChart>
        </ResponsiveContainer>
      );
    }

    //chart for low stock
    if (question.toLowerCase().includes("low in stock")) {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="stock_quantity" fill="#f87171" />
          </BarChart>
        </ResponsiveContainer>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">💡 Business Intelligence Agent</h1>

      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-2">Select a question:</label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          value={selectedRoute}
          onChange={(e) => setSelectedRoute(e.target.value)}
        >
          <option value="">-- Choose a query --</option>
          {demoEndpoints.map(({ label, route }) => (
            <option key={route} value={route}>{label}</option>
          ))}
        </select>
        <button
          onClick={fetchDemo}
          disabled={!selectedRoute || loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </div>

      {question && (
        <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">🧠 Question</h2>
          <p className="text-gray-700 mb-4">{question}</p>
          <h3 className="text-md font-semibold text-gray-800 mb-1">🛠 SQL Query</h3>
          <pre className="bg-gray-100 text-gray-800 p-4 rounded-md overflow-auto text-sm">
            {sql}
          </pre>
        </div>
      )}

      {data && data.length > 0 && (
        <div className="w-full max-w-4xl overflow-x-auto bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">📋 Result</h2>
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                {Object.keys(data[0]).map((col) => (
                  <th key={col} className="text-left px-4 py-2 border-b border-gray-200">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  {Object.values(row).map((value, j) => (
                    <td key={j} className="px-4 py-2 border-b border-gray-100">{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {data && (
        <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-md mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">📊 Chart</h2>
          {getChart(question, data) || (
            <p className="text-gray-500">No chart available for this question.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
