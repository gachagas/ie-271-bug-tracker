import { DataTable } from "mantine-datatable";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import moment from "moment";
import { Role } from "@prisma/client";
import { type Ticket } from "@prisma/client";

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
    // do developer stuff
    isLoading = false;
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
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default ProjectTicketsBoard;
