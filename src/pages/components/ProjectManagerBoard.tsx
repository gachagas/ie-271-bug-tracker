import { ActionIcon, Button, Select } from "@mantine/core";
import { useState } from "react";
import AddProjectModal from "./ProjectManager/AddProjectModal";
import { useSession } from "next-auth/react";
import { Group } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { api } from "~/utils/api";
import { Trash } from "tabler-icons-react";

export const ProjectManagerBoard = () => {
  const trpc = api.useContext();

  const [projectIndex, setProjectIndex] = useState<string | null>(null);
  const [developerToAdd, setDeveloperToAdd] = useState<string | null>(null);
  const [addDeveloperTouched, setAddDeveloperTouched] =
    useState<boolean>(false);

  const { data: sessionData, status } = useSession();

  if (status !== "authenticated") return <div>Loading Session....</div>;

  const { data: projectData, isLoading } =
    api.projects.getUsersProjectsAndDevelopers.useQuery({
      projectManagerId: sessionData.user.id,
    });

  const { data: projectlessDevelopers } =
    api.users.getProjectlessDeveloper.useQuery({});

  const removeProjectAsDeveloper =
    api.users.removeProjectAsDeveloper.useMutation({
      onSuccess: () => {
        void trpc.projects.getUsersProjectsAndDevelopers.invalidate();
        void trpc.users.getProjectlessDeveloper.invalidate();
      },
    });

  const addProjectAsDeveloper = api.users.addToProjectAsDeveloper.useMutation({
    onSuccess: () => {
      void trpc.projects.getUsersProjectsAndDevelopers.invalidate();
      void trpc.users.getProjectlessDeveloper.invalidate();
    },
  });

  if (isLoading === true) return <div>Loading Data....</div>;

  const mappedData =
    projectData?.data.map((project, index) => {
      return { value: index.toString(), label: project.name };
    }) || [];

  const mappedProjectLessDevelopers =
    projectlessDevelopers?.data.map((developer) => {
      return { value: developer.id, label: developer.name };
    }) || [];

  const disabledAddUserButton = <Button data-disabled>Add New User</Button>;

  const addUserButton = (
    <Button
      onClick={() => {
        if (developerToAdd) {
          setAddDeveloperTouched(false);
          addProjectAsDeveloper.mutate({
            id: developerToAdd,
            projectId: projectData?.data[Number(projectIndex)]?.id || "",
          });
        }
      }}
    >
      Add New User
    </Button>
  );

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
          <button
            onClick={() => console.log(projectData?.data[Number(projectIndex)])}
          >
            Query!
          </button>
        )}
        <div>
          Current project is {projectIndex ? projectIndex : "nothing in there"}
        </div>

        <div className="m-8 w-[80%]">
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
                title: "Developer Id",
                textAlignment: "right",
                width: 200,
              },
              { accessor: "name" },
              {
                accessor: "actions",
                width: 100,
                title: <div className="text-right">Row actions</div>,
                render: (datum) => {
                  return (
                    <Group spacing={4} position="right" noWrap>
                      <ActionIcon
                        color="green"
                        onClick={() =>
                          removeProjectAsDeveloper.mutate({
                            id: datum.id,
                          })
                        }
                      >
                        <Trash size={16} />
                      </ActionIcon>
                    </Group>
                  );
                },
              },
            ]}
          />
        </div>
        <Select
          className="flex w-96 flex-col"
          label="Choose User to add"
          placeholder="Pick one"
          data={mappedProjectLessDevelopers}
          onChange={(name) => {
            setAddDeveloperTouched(true);
            setDeveloperToAdd(name);
          }}
        />
        <div className="my-4">
          {addDeveloperTouched ? addUserButton : disabledAddUserButton}
        </div>
      </div>
    </>
  );
};

export default ProjectManagerBoard;
