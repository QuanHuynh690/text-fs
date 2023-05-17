import React, { useEffect, useState } from "react";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
} from "recharts";
import io from "socket.io-client";

const host = "localhost:3001";

const Dashboard: React.FC = () => {
  const [messages, setMessages] = useState({ orange: 0, blue: 0 });
  const [chartData, setChartData] = useState([
    {
      name: "Clicked Data",
      orange: 0,
      blue: 0,
    },
  ]);

  useEffect(() => {
    const socket = io(host);
    socket.on("click", (msg) => {
      setMessages(msg);
    });
    socket.on("chart", (msg) => {
      console.log("msg", msg);
      setChartData(msg);
    });
  });

  return (
    <div className="display-box">
      <div>
        <div className="counter-header">Counter</div>
        <div className="counter-wrap">
          <div className="counter-box orange">{messages.orange}</div>
          <div className="counter-box blue">{messages.blue}</div>
        </div>
      </div>
      <div className="chart">
        <div className="counter-header">Chart</div>
        <BarChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar type="monotone" dataKey="orange" fill="#f77b33" name="Orange" />
          <Bar type="monotone" dataKey="blue" fill="#003cff" name="Blue" />
        </BarChart>
      </div>
    </div>
  );
};

export default Dashboard;
