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

  if (status !== "authenticated") return <div>Loading Session....</div>;

  let isLoading = true;
  let tickets: ticketData = undefined;

  if (sessionData.user.role === Role.PROJECT_MANAGER) {
    // do pm stuff

    const { data: pmTicketData, isLoading: pmIsLoading } =
      api.projects.getUsersProjectsAndDevelopers.useQuery({
        projectManagerId: sessionData.user.id,
      });

    isLoading = pmIsLoading;

    const dataArray = pmTicketData?.data.map((item) => item);

    tickets = dataArray?.flatMap((obj) => obj.tickets);
  } else if (sessionData.user.role === Role.DEVELOPER) {
    // do dev stuff

    const { data: devTicketData, isLoading: devIsLoading } =
      api.projects.getDeveloperProject.useQuery({
        developerId: sessionData.user.id,
      });

    isLoading = devIsLoading;

    tickets = devTicketData?.data[0]?.tickets;
  } else {
    //should not reach here
    isLoading = false;
  }

  return (
    <>
      <div className="m-8">
        {!isLoading && (
          <button
            onClick={() => {
              console.log(tickets);
            }}
          >
            Query!!!
          </button>
        )}
        {/* <div>
          Current project is {projectIndex ? projectIndex : "nothing in there"}
        </div> */}
        <div className="m-8 w-[80%]">
          <DataTable
            minHeight={150}
            noRecordsText="You currently have no tickets"
            withBorder
            borderRadius="sm"
            withColumnBorders
            striped
            highlightOnHover
            // records={projectData?.data[Number(projectIndex)]?.developers}
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
                                    console.log("Take the ticket");
                                    console.log(datum);
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
                                  console.log("Take and close the ticket")
                                }
                              >
                                <TicketIcon size={16} />
                              </ActionIcon>
                            </HoverCard.Target>
                            <HoverCard.Dropdown>
                              <div className="text-zinc-200">Close Ticket</div>
                              <div />
                            </HoverCard.Dropdown>
                          </HoverCard>
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
