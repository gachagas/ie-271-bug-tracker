import { Select } from "@mantine/core";
import { useSession } from "next-auth/react";
import { type Project, Role } from "@prisma/client";
import { api } from "~/utils/api";
import { type ReactNode, useState } from "react";
import DoughnutTicketPriority from "./DoughnutTicketPriority";

export const Dashboard = () => {
  const { data: sessionData, status } = useSession();

  const [selectedProject, setSelectedProject] = useState<string>("");

  if (status !== "authenticated") return <div>Loading Session....</div>;

  const { data: pmProjects, isLoading } =
    api.projects.projectManagerProjects.useQuery({
      projectManagerId: sessionData.user.id,
    });

  const projectArray =
    pmProjects?.data.map((project: Project) => project.id) ?? [];

  const { data: pmTickets } = api.tickets.getProjectTickets.useQuery({
    projectId: selectedProject,
  });

  const handleSelectProject = (projectId: string) => {
    console.log(projectId);
    setSelectedProject(projectId);
  };

  const mappedProjects: ReactNode = pmTickets?.data.map((datum) => (
    <div key={datum.id}>{datum.description}</div>
  ));

  return (
    <>
      <div className="m-8 h-full w-full">
        {isLoading && <div>COOKING....</div>}
        {mappedProjects}
        {sessionData.user.role === Role.PROJECT_MANAGER && (
          <Select
            className="mb-8 flex w-96 flex-col"
            label="Choose Project"
            placeholder="Pick one"
            data={projectArray}
            onChange={handleSelectProject}
          />
        )}
        <button onClick={() => console.log("Hello world")}>Query!</button>
        <button onClick={() => console.log(pmTickets)}>Pmtickets!</button>
        {/* pm data */}
        <div className="m-8 flex h-full flex-col">
          <div className="m-8 flex gap-8">
            <div className="h-[300px] w-1/3 ">
              <DoughnutTicketPriority tickets={pmTickets?.data ?? []} />
            </div>
            <div className="w-1/3 bg-red-500"></div>
            <div className="w-1/3 bg-red-500"></div>
          </div>
          <div className="m-8 flex gap-8">
            <div className="bg-blue-500">55</div>
            <div className="bg-blue-500">66</div>
            <div className="bg-blue-500">77</div>
          </div>
        </div>

        {/* pm data */}

        {/* dev data */}
        {/* dev data */}
      </div>
    </>
  );
};

export default Dashboard;
