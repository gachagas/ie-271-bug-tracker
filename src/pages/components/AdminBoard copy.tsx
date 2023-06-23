import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export const Dashboard = () => {
  const data02 = [
    { name: "Group A", value: 2400 },
    { name: "Group B", value: 4567 },
    { name: "Group C", value: 1398 },
    { name: "Group D", value: 9800 },
    { name: "Group E", value: 3908 },
    { name: "Group F", value: 4800 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  // if project manager, render a select project list then display data based on that selected
  // if developer immediately display developer's assigned project(if it exists)

  return (
    <>
      <div className="flex h-1/2 w-1/2 flex-col bg-slate-600">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={200} height={200}>
            <Pie
              dataKey="value"
              data={data02}
              // cx={500}
              // cy={200}
              innerRadius={40}
              outerRadius={80}
              fill="#82ca9d"
              label
            >
              {data02.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
          </PieChart>
        </ResponsiveContainer>
        <div className="text-slate-800"> some text heasddasre and labels</div>
      </div>
    </>
  );
};

export default Dashboard;
