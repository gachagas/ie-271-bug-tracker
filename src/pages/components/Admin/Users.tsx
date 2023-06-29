import { DataTable } from "mantine-datatable";
import { Trash } from "tabler-icons-react";
import { Group, ActionIcon } from "@mantine/core";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import { api } from "~/utils/api";
import ReactGA from "react-ga";
import ReactGA4 from "react-ga4";

export const Users = () => {
  const trackingId = "G-J697KLK62K";
  ReactGA.initialize(trackingId);
  ReactGA4.initialize(trackingId);

  const { data, isLoading } = api.users.getAll.useQuery();
  const trpc = api.useContext();
  const deleteUser = api.users.deleteUser.useMutation({
    onSuccess: () => {
      void trpc.users.getAll.invalidate();
    },
  });

  if (isLoading)
    return <div className="flex grow">Place Loading Spinner here</div>;

  if (!data) {
    return null;
  }

  return (
    <>
      <div>
        <button
          onClick={() => {
            ReactGA.event({
              category: "sampleCategory",
              action: "sampleAction",
              label: "sampleLabel",
              value: 45,
            });

            ReactGA4.event({
              category: "ga4Wevent",
              action: "ga4action",
              label: "ga4lebel",
              value: 65,
            });

            ReactGA4.event({
              category: "ga4Wevent222",
              action: "ga4action",
              label: "ga4lebel22",
              value: 65,
            });

            ReactGA4.event({
              category: "ga4Wevent222",
              action: "ga4action",
              label: "ga4lebel22333",
              value: 65,
            });

            console.log("sending event");
          }}
        >
          Display data
        </button>
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
              { accessor: "email" },
              { accessor: "password" },
              { accessor: "role" },
              {
                accessor: "actions",
                title: <div className="text-right">Row actions</div>,
                render: (datum) => {
                  return (
                    <Group spacing={4} position="right" noWrap>
                      <ActionIcon color="green">
                        <EditUserModal
                          id={datum.id}
                          email={datum.email ?? ""}
                          password={datum.password}
                          name={datum.name ?? ""}
                          role={datum.role}
                        />
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
                  );
                },
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default Users;
