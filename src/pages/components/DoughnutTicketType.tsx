import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { type Ticket, TicketType } from "@prisma/client";

const COLORS = ["#f472b6", "#fde047", "#60a5fa"];

export const DoughnutTicketType = ({ tickets }: { tickets: Ticket[] }) => {
  const priorityCounts = {
    [TicketType.API_ISSUE]: 0,
    [TicketType.UI_ISSUE]: 0,
    [TicketType.DATABASE_ISSUE]: 0,
  };

  if (tickets === undefined) return <div>No Tickets!</div>;

  tickets.forEach((ticket) => {
    const type = ticket.type;
    priorityCounts[type] += 1;
  });

  const apiCount = priorityCounts[TicketType.API_ISSUE];
  const uiCount = priorityCounts[TicketType.UI_ISSUE];
  const databaseCount = priorityCounts[TicketType.DATABASE_ISSUE];

  const doughnutData = [
    { name: "API ISSUE", value: apiCount },
    { name: "UI ISSUE", value: uiCount },
    { name: "Database Issue", value: databaseCount },
  ];

  return (
    <>
      <button
        onClick={() => {
          console.log(tickets);
          console.log("High Count:", apiCount);
          console.log("Medium Count:", uiCount);
          console.log("Low Count:", databaseCount);
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

export default DoughnutTicketType;
