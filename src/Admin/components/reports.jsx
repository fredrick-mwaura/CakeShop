import {useState, useEffect} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './styles/reports.css';
// import axios from 'axios';

const Reports = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios.get('/api/sales') //replace with theEndpoint
//       .then((response) => setData(response.data))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);


  const info = [
    { date: 'day1 ', sales: 400 },
    { date: 'day2', sales: 150 },
    { date: 'day3 ', sales: 120 },
    { date: 'day4 ', sales: 180 },
    { date: 'day5 ', sales: 500 },
    { date: 'day6 ', sales: 160 },
    { date: 'day7 ', sales: 140 },
    { date: 'day8 ', sales: 0 },
    { date: 'day9 ', sales: 110 },
    { date: 'day10 ', sales: 300 },
  ]
  return (
   <div className="reports">
    <ResponsiveContainer width="70%" height={400}>
      <LineChart data={info} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        
        {/* Chart Components */}
        <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
        <XAxis dataKey="date" tick={{ fill: '#8884d8' }} />
        <YAxis tick={{ fill: '#8884d8' }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#309",
            border: "none",
            borderRadius: 8,
            color: "#fff",
          }}
          labelStyle={{ color: "#82ca9d" }}
          itemStyle={{ color: "#8884d8" }}
        />
        <Legend iconType="circle" verticalAlign="top" align="right" />
        
        {/* Line Component with Gradient */}
        <Line
          type="monotone"
          dataKey="sales"
          stroke="url(#colorSales)"
          strokeWidth={3}
          dot={{ r: 6, fill: '#7784d8' }}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
    </div>
  );
};

export default Reports;
