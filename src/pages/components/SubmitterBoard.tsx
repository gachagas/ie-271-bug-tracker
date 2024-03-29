import { DataTable } from "mantine-datatable";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import AddTicketModal from "./projectManager/AddTicketModal";
import moment from "moment";
export const SubmitterBoard = () => {
  const { data: sessionData, status } = useSession();

  if (status !== "authenticated") return <div>Loading Session....</div>;

  const { data: ticketData } = api.tickets.getUserTickets.useQuery({
    userId: sessionData.user.id,
  });

  return (
    <>
      <div className="m-8">
        <div>
          <div className="my-4">
            <AddTicketModal />
          </div>
        </div>
        <div className="m-8 w-[80%]">
          <DataTable
            minHeight={150}
            noRecordsText="You currently have no tickets"
            withBorder
            borderRadius="sm"
            withColumnBorders
            striped
            highlightOnHover
            records={ticketData?.data}
            rowStyle={({ status }) => {
              if (status === "OPEN")
                return {
                  color: "#f87171",
                };

              if (status === "IN_PROGRESS")
                return {
                  color: "#fcd34d",
                };

              if (status === "CLOSED")
                return {
                  color: "#86efac",
                };
            }}
            columns={[
              {
                accessor: "id",
                title: "Ticket Id",
                textAlignment: "right",
                width: 200,
              },
              { accessor: "description" },
              { accessor: "project.name" },
              { accessor: "priority" },
              { accessor: "type" },
              { accessor: "status" },
              {
                accessor: "createDate",
                render: (datum) => {
                  const momentDate = moment(datum.createDate).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  );
                  return <div>{momentDate}</div>;
                },
              },
              // {
              //   accessor: "actions",
              //   width: 100,
              //   title: <div className="text-right">Row actions</div>,
              //   render: (datum) => {
              //     return (
              //       <Group spacing={4} position="right" noWrap>
              //         <ActionIcon
              //           color="green"
              //           onClick={() =>
              //             removeProjectAsDeveloper.mutate({
              //               id: datum.id,
              //             })
              //           }
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

export default SubmitterBoard;
