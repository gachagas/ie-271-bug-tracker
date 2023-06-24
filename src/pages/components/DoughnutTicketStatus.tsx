import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { type Ticket, TicketStatus } from "@prisma/client";

const COLORS = ["#ef4444", "#fde047", "#4ade80"];

export const DoughnutTicketStatus = ({ tickets }: { tickets: Ticket[] }) => {
  const priorityCounts = {
    [TicketStatus.OPEN]: 0,
    [TicketStatus.IN_PROGRESS]: 0,
    [TicketStatus.CLOSED]: 0,
  };

  if (tickets === undefined) return <div>No Tickets!</div>;

  tickets.forEach((ticket) => {
    const status = ticket.status;
    priorityCounts[status] += 1;
  });

  const openCount = priorityCounts[TicketStatus.OPEN];
  const inProgressCount = priorityCounts[TicketStatus.IN_PROGRESS];
  const closedCount = priorityCounts[TicketStatus.CLOSED];

  const doughnutData = [
    { name: "OPEN", value: openCount },
    { name: "IN PROGRESS", value: inProgressCount },
    { name: "CLOSED", value: closedCount },
  ];

  return (
    <>
      <button
        onClick={() => {
          console.log(tickets);
          console.log("Open Count:", openCount);
          console.log("Medium Count:", inProgressCount);
          console.log("Low Count:", closedCount);
        }}
      >
        Tickets By Issue Type
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

export default DoughnutTicketStatus;
