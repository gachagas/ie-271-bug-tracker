import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { type Ticket, TicketPriority } from "@prisma/client";

const COLORS = ["#ef4444", "#fde047", "#4ade80"];

export const DoughnutTicketPriority = ({ tickets }: { tickets: Ticket[] }) => {
  const priorityCounts = {
    [TicketPriority.HIGH]: 0,
    [TicketPriority.MEDIUM]: 0,
    [TicketPriority.LOW]: 0,
  };

  if (tickets === undefined) return <div>No Tickets!</div>;

  tickets.forEach((ticket) => {
    const priority = ticket.priority;
    priorityCounts[priority] += 1;
  });

  const highCount = priorityCounts[TicketPriority.HIGH];
  const mediumCount = priorityCounts[TicketPriority.MEDIUM];
  const lowCount = priorityCounts[TicketPriority.LOW];

  const doughnutData = [
    { name: "High", value: highCount },
    { name: "Medium", value: mediumCount },
    { name: "Low", value: lowCount },
  ];

  return (
    <>
      <button
        onClick={() => {
          console.log(tickets);
          console.log("High Count:", highCount);
          console.log("Medium Count:", mediumCount);
          console.log("Low Count:", lowCount);
        }}
      >
        Tickets By Priority
      </button>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={200} height={200}>
          <Pie
            dataKey="value"
            data={doughnutData}
            innerRadius={40}
            outerRadius={80}
            fill="#82ca9d"
            label
          >
            {doughnutData.map((entry, index) => (
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
    </>
  );
};

export default DoughnutTicketPriority;
