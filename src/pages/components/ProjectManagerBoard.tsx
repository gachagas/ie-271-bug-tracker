import { Select } from "@mantine/core";
import { useState } from "react";
import AddProjectModal from "./ProjectManager/AddProjectModal";
import { useSession } from "next-auth/react";
import { Group } from "@mantine/core";
import { ActionIcon } from "@mantine/core";
import { DataTable } from "mantine-datatable";

import { api } from "~/utils/api";

export const ProjectManagerBoard = () => {
  const [projectIndex, setProjectIndex] = useState<string | null>(null);

  const { data: sessionData, status } = useSession();

  if (status !== "authenticated") return <div>Loading Session....</div>;
  const { data: projectData, isLoading } =
    api.projects.getUsersProjectsAndDevelopers.useQuery({
      projectManagerId: sessionData.user.id,
    });

  if (isLoading === true) return <div>Loading Data....</div>;

  const mappedData =
    projectData?.data.map((project, index) => {
      return { value: index.toString(), label: project.name };
    }) || [];

  return (
    <>
      <div className="m-8">
        <div>
          <Select
            className="flex w-96 flex-col"
            label="Choose Project"
            placeholder="Pick one"
            data={mappedData}
            onChange={setProjectIndex}
          />
          <div className="my-4">
            <AddProjectModal />
          </div>
        </div>
        {!isLoading && (
          <button onClick={() => console.log(projectData)}>Query!</button>
        )}
        <div>
          Current project is {projectIndex ? projectIndex : "nothing in there"}
        </div>

        <div className="m-8 w-[80%]">
          <div>Developers</div>
          <DataTable
            minHeight={150}
            noRecordsText="No developers in this project"
            withBorder
            borderRadius="sm"
            withColumnBorders
            striped
            highlightOnHover
            records={projectData?.data[Number(projectIndex)]?.developers}
            columns={[
              {
                accessor: "id",
                title: "#",
                textAlignment: "right",
                width: 200,
              },
              { accessor: "name", width: 200 },

              // {
              //   accessor: "projectManager.name",
              //   title: "name of the project owner",
              // },
              // {
              //   accessor: "actions",
              //   title: <div className="text-right">Row actions</div>,
              //   render: (datum) => {
              //     return (
              //       <Group spacing={4} position="right" noWrap>
              //         <ActionIcon color="green">
              //           {/* <EditUserModal
              //             id={datum.id}
              //             name={datum.name}
              //             description={datum.password}
              //             projectManagerId={datum.name ?? ""}
              //             role={datum.role}
              //           /> */}
              //         </ActionIcon>
              //       </Group>
              //     );
              //   },
              // },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default ProjectManagerBoard;
