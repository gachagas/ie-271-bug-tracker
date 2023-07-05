import { DataTable } from "mantine-datatable";
import { Trash } from "tabler-icons-react";
import { Group, ActionIcon } from "@mantine/core";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import { api } from "~/utils/api";
import ReactGA4 from "react-ga4";
import moment from "moment";

export const Users = () => {
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
  // const trackingId = "G-J697KLK62K"; //v1
  const trackingId = "G-9LKHKKEMB0"; //v2

  ReactGA4.initialize(trackingId);

  return (
    <>
      <div>
        <button
          onClick={() => {
            const timeStamp = moment().format("MMMM DD, h:mm a");

            const event = {
              bot_reply: timeStamp + "bot",
              user_message: timeStamp + "user",
              user_email: timeStamp + "email",
              custom: timeStamp + "customm",
              long_message:
                "here is a very long message what in the world is going on the quick brown fox jumped over the lazy dog",
            };

            ReactGA4.event("thumbs_down_custom", event);

            console.log("sending");
            console.dir(event);
          }}
        >
          Custom Events
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
