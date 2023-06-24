import { Select } from "@mantine/core";
import { useSession } from "next-auth/react";
import { type Project, Role } from "@prisma/client";
import { api } from "~/utils/api";
import { useState } from "react";
import DoughnutTicketPriority from "./DoughnutTicketPriority";
import DoughnutTicketType from "./DoughnutTicketType";
import DoughnutTicketStatus from "./DoughnutTicketStatus";

export const Dashboard = () => {
  const { data: sessionData, status } = useSession();

  const [selectedProject, setSelectedProject] = useState<string>("");

  if (status !== "authenticated") return <div>Loading Session....</div>;

  const { data: pmProjects, isLoading } =
    api.projects.projectManagerProjects.useQuery({
      projectManagerId: sessionData.user.id,
    });

  const projectArray =
    pmProjects?.data.map((project: Project) => ({
      label: project.name,
      value: project.id,
    })) ?? [];

  const { data: pmTickets } = api.tickets.getProjectTickets.useQuery({
    projectId: selectedProject,
  });

  const totalPmTickets = pmTickets?.data.length;

  const handleSelectProject = (projectId: string) => {
    console.log(projectId);
    setSelectedProject(projectId);
  };

  return (
    <>
      <div className="m-8 h-full w-full">
        {isLoading && <div>Loading....</div>}
        {sessionData.user.role === Role.PROJECT_MANAGER && (
          <Select
            className="mb-8 flex w-96 flex-col"
            label="Choose Project"
            placeholder="Pick one"
            data={projectArray}
            onChange={handleSelectProject}
          />
        )}

        {/* pm data */}
        {sessionData.user.role === "PROJECT_MANAGER" && (
          <div className="m-8 flex h-full flex-col">
            <div className="m-8 flex gap-8">
              <div className="h-[300px] w-1/3 ">
                <DoughnutTicketPriority tickets={pmTickets?.data ?? []} />
              </div>
              <div className="h-[300px] w-1/3 ">
                <DoughnutTicketType tickets={pmTickets?.data ?? []} />
              </div>
              <div className="h-[300px] w-1/3 ">
                <DoughnutTicketStatus tickets={pmTickets?.data ?? []} />
              </div>
            </div>
            <div className="m-8 flex gap-8">
              <div className="text-3xl font-semibold text-blue-200">
                Total Number of Tickets: {totalPmTickets}
              </div>
            </div>
          </div>
        )}

        {/* pm data */}

        {/* dev data */}
        {/* dev data */}
      </div>
    </>
  );
};

export default Dashboard;
