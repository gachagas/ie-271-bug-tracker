import { DataTable } from "mantine-datatable";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import moment from "moment";
import { Role } from "@prisma/client";
import { type Ticket } from "@prisma/client";
import { ActionIcon, HoverCard, Group } from "@mantine/core";
import { HandGrab, Ticket as TicketIcon } from "tabler-icons-react";
type ticketData =
  | (Ticket & {
      project: { name: string };
      developer: { name: string } | null;
    })[]
  | undefined;

export const ProjectTicketsBoard = () => {
  const { data: sessionData, status } = useSession();
  const trpc = api.useContext();

  if (status !== "authenticated") return <div>Loading Session....</div>;

  let tickets: ticketData = undefined;

  if (sessionData.user.role === Role.PROJECT_MANAGER) {
    // do pm stuff

    const { data: pmTicketData } =
      api.projects.getUsersProjectsAndDevelopers.useQuery({
        projectManagerId: sessionData.user.id,
      });

    const dataArray = pmTicketData?.data.map((item) => item);

    tickets = dataArray?.flatMap((obj) => obj.tickets);
  } else if (sessionData.user.role === Role.DEVELOPER) {
    // do dev stuff

    const { data: devTicketData } = api.projects.getDeveloperProject.useQuery({
      developerId: sessionData.user.id,
    });

    tickets = devTicketData?.data[0]?.tickets;
  } else {
    //should not reach here
  }

  const takeTicket = api.tickets.takeTicket.useMutation({
    onSuccess: () => {
      void trpc.projects.getDeveloperProject.invalidate();
    },
  });

  const closeTicket = api.tickets.closeTicket.useMutation({
    onSuccess: () => {
      void trpc.projects.getDeveloperProject.invalidate();
    },
  });

  return (
    <>
      <div className="m-8">
        <div>LEGEND</div>
        <div className="m-2 flex h-full w-full flex-row items-center">
          <div className="h-4 w-4 bg-red-400"></div>
          <span className="ml-2">IN OPEN</span>
        </div>

        <div className="m-2 flex h-full w-full flex-row items-center">
          <div className="h-4 w-4 bg-yellow-400"></div>
          <span className="ml-2">IN PROGRESS</span>
        </div>
        <div className="m-2 flex h-full w-full flex-row items-center">
          <div className="h-4 w-4 bg-green-400"></div>
          <span className="ml-2">CLOSED</span>
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
            records={tickets}
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
              // {
              //   accessor: "id",
              //   title: "Ticket Id",
              //   textAlignment: "right",
              //   width: 100
              // },
              { accessor: "description" },
              { accessor: "project.name" },
              { accessor: "priority" },
              { accessor: "type" },
              { accessor: "status" },
              { accessor: "developer.name" },

              {
                accessor: "createDate",
                render: (datum) => {
                  const momentDate = moment(datum.createDate).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  );
                  return <div>{momentDate}</div>;
                },
              },
              {
                accessor: "actions",
                width: 100,
                title: <div className="text-right">Row actions</div>,
                render: (datum) => {
                  return (
                    <Group spacing={4} position="right" noWrap>
                      {sessionData.user.role === "PROJECT_MANAGER" ? (
                        <div className="text-zinc-100">
                          No Actions for project managers
                        </div>
                      ) : (
                        <>
                          {datum.status === "OPEN" && (
                            <HoverCard
                              width={200}
                              shadow="md"
                              position="left-end"
                              openDelay={400}
                            >
                              <HoverCard.Target>
                                <ActionIcon
                                  color="green"
                                  onClick={() => {
                                    takeTicket.mutate({
                                      ticketId: datum.id,
                                      developerId: sessionData.user.id,
                                    });
                                  }}
                                >
                                  <HandGrab size={16} />
                                </ActionIcon>
                              </HoverCard.Target>
                              <HoverCard.Dropdown>
                                <div className="text-zinc-200">Take Ticket</div>
                              </HoverCard.Dropdown>
                            </HoverCard>
                          )}

                          {datum.status !== "CLOSED" && (
                            <HoverCard
                              width={200}
                              shadow="md"
                              position="left-end"
                              openDelay={400}
                            >
                              <HoverCard.Target>
                                <ActionIcon
                                  color="green"
                                  onClick={() =>
                                    closeTicket.mutate({
                                      ticketId: datum.id,
                                      developerId: sessionData.user.id,
                                    })
                                  }
                                >
                                  <TicketIcon size={16} />
                                </ActionIcon>
                              </HoverCard.Target>
                              <HoverCard.Dropdown>
                                <div className="text-zinc-200">
                                  Close Ticket
                                </div>
                                <div />
                              </HoverCard.Dropdown>
                            </HoverCard>
                          )}
                        </>
                      )}
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

export default ProjectTicketsBoard;
