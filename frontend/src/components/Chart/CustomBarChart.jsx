import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomTooltip from "./customTooltip";

const CustomBarChart = ({ data }) => {
  //to alternate color
  const getBarColor = (index) => {
    // const colors = ["#FF8042", "#8884d8", "#82ca9d", "#f7b6d2", "#ffcc66"];
    return index % 2 === 0 ? "#875cf5" : "#cfbefb";
  };

  const customTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      // const { payload: data } = payload[0];
      // const { date, amount } = data;
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p className=" text-xs font-semibold text-purple-800 mb-1">
            {payload[0].payload.category}
          </p>
          <p className="text-sm text-gray-600">
            Amount:{" "}
            <span className="text-sm font-medium text-gray-900">
              ${payload[0].payload.amount}
            </span>{" "}
          </p>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="mt-6 bg-white">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />
          <XAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <YAxis
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
            domain={[0, "auto"]}
          />
          <Tooltip content={CustomTooltip} />
          <Bar
            dataKey="amount"
            fill="#FF8042"
            radius={[10, 10, 0, 0]}
            activeDot={{ r: 8, fill: "yellow" }}
            activeStyle={{ fill: "green" }}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(index)}>
                {entry.amount}
              </Cell>
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
