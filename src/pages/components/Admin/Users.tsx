import { DataTable } from "mantine-datatable";
import { Eye } from "tabler-icons-react";
import { Group, ActionIcon, Text } from "@mantine/core";
import AddUserModal from "./AddUserModal";
import { api } from "~/utils/api";

export const Users = () => {
  const { data, isLoading } = api.example.getAllUsers.useQuery();

  if (isLoading)
    return <div className="flex grow">Place Loading Spinner here</div>;

  if (!data) {
    return null;
  }

  return (
    <>
      <div>
        <AddUserModal />

        <div className="m-8 w-[80%]">
          <DataTable
            withBorder
            borderRadius="sm"
            withColumnBorders
            striped
            highlightOnHover
            records={[
              { id: 1, name: "Joe Biden", bornIn: 1942, party: "Democratic" },
              {
                id: 2,
                name: "Donald Trump",
                bornIn: 1469,
                party: "Republican",
              },
              // more records...
            ]}
            // define columns
            columns={[
              {
                accessor: "id",
                title: "#",
                textAlignment: "right",
              },
              { accessor: "name", width: 200 },
              {
                accessor: "party",
                render: ({ party }) => (
                  <Text
                    weight={700}
                    color={party === "Democratic" ? "blue" : "red"}
                  >
                    {party.slice(0, 3).toUpperCase()}
                  </Text>
                ),
              },
              { accessor: "bornIn" },
              {
                accessor: "actions",
                title: <div className="text-right">Row actions</div>,
                render: (name) => (
                  <Group spacing={4} position="right" noWrap>
                    <ActionIcon
                      color="green"
                      onClick={() => console.log("CLick1", name)}
                    >
                      <Eye size={16} />
                    </ActionIcon>
                    <ActionIcon
                      color="blue"
                      onClick={() => console.log("click2")}
                    >
                      <Eye size={16} />
                    </ActionIcon>
                    <ActionIcon
                      color="red"
                      onClick={() => console.log("click 3")}
                    >
                      <Eye size={16} />
                    </ActionIcon>
                  </Group>
                ),
              },
            ]}
            // TODO: Add toasts here
            onRowClick={({ name, party, bornIn }) =>
              alert(
                `You clicked on ${name}, a ${party.toLowerCase()} president born in ${bornIn}`
              )
            }
          />
        </div>
      </div>
    </>
  );
};

export default Users;
