import { DataTable } from "mantine-datatable";
import { EditCircle, Trash } from "tabler-icons-react";
import { Group, ActionIcon } from "@mantine/core";
import AddUserModal from "./AddUserModal";
import { api } from "~/utils/api";

export const Users = () => {
  const { data, isLoading } = api.example.getAllUsers.useQuery();
  const trpc = api.useContext();
  const deleteUser = api.users.deleteUser.useMutation({
    onMutate: () => console.log("mutating..."),
    onSuccess: () => {
      void trpc.example.getAllUsers.invalidate();
    },
    onError: () => {
      console.log("Error! in backend");
    },
    onSettled: () => console.log("Settled"),
  });

  if (isLoading)
    return <div className="flex grow">Place Loading Spinner here</div>;

  if (!data) {
    return null;
  }

  return (
    <>
      <div>
        <button onClick={() => console.log(data)}>Display data</button>
        <AddUserModal />

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
              {
                accessor: "id",
              },
              { accessor: "email" },
              {
                accessor: "actions",
                title: <div className="text-right">Row actions</div>,
                render: (datum) => (
                  <Group spacing={4} position="right" noWrap>
                    <ActionIcon
                      color="green"
                      onClick={() => console.log("CLick1", datum)}
                    >
                      <EditCircle size={16} />
                    </ActionIcon>
                    <ActionIcon
                      color="blue"
                      onClick={() => {
                        deleteUser.mutate({ id: datum.id });
                      }}
                    >
                      <Trash size={16} />
                    </ActionIcon>
                  </Group>
                ),
              },
            ]}
            // TODO: Add toasts here
            // onRowClick={({ name, id, email }) =>
            //   alert(`you clicked on ${name} ${id} ${email}`)
            // }
          />
        </div>
      </div>
    </>
  );
};

export default Users;
