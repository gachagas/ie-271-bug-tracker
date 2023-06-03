import { DataTable } from "mantine-datatable";
import { api } from "~/utils/api";
import AddProjectModal from "./AddProjectModal";

export const Projects = () => {
  const { data, isLoading } = api.projects.getAll.useQuery();

  const trpc = api.useContext();

  // const deleteUser = api.users.deleteUser.useMutation({
  //   onMutate: () => console.log("mutating..."),
  //   onSuccess: () => {
  //     void trpc.projects.getAll.invalidate();
  //   },
  //   onError: () => {
  //     console.log("Error! in backend");
  //   },
  //   onSettled: () => console.log("Settled"),
  // });

  if (isLoading)
    return <div className="flex grow">Place Loading Spinner here</div>;

  if (!data) {
    return null;
  }

  return (
    <>
      <div>
        <button onClick={() => console.log(data)}>Display data</button>
        <AddProjectModal />

        <div className="m-8 w-[80%]">
          <DataTable
            withBorder
            borderRadius="sm"
            withColumnBorders
            striped
            highlightOnHover
            records={data}
            columns={[
              {
                accessor: "id",
                title: "#",
                textAlignment: "right",
              },
              { accessor: "name", width: 200 },
              { accessor: "description" },
              { accessor: "projectManagerId" },
              {
                accessor: "projectManager.name",
                title: "name of the project owner",
              },

              // {
              //   accessor: "actions",
              //   title: <div className="text-right">Row actions</div>,
              //   render: (datum) => {
              //     const clickedData = {
              //       id: datum.id,
              //       email: datum.email ?? "",
              //       password: datum.password,
              //       name: datum.name ?? "",
              //       role: datum.role,
              //     };

              //     return (
              //       <Group spacing={4} position="right" noWrap>
              //         <ActionIcon color="green">
              //           <EditUserModal datum={clickedData} />
              //         </ActionIcon>
              //         <ActionIcon
              //           color="blue"
              //           onClick={() => {
              //             deleteUser.mutate({ id: datum.id });
              //           }}
              //         >
              //           <Trash size={16} />
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

export default Projects;
