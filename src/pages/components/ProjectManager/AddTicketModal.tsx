import { useForm } from "@mantine/form";
import { Button, Group, Modal, Select, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { TicketType, TicketPriority } from "@prisma/client";

const AddTicketModal = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [opened, { open, close }] = useDisclosure(false);

  const { data: sessionData } = useSession();

  const { data: projectData, isLoading: isProjectLoading } =
    api.projects.getAll.useQuery();

  const mappedProjectData =
    projectData?.map((datum) => ({
      value: datum.id,
      label: datum.name,
    })) || [];

  const createTicket = api.tickets.createTicket.useMutation({
    onMutate: () => console.log("mutating..."),
    onSuccess: () => {
      console.log("success!");
      close();
      setIsError(false);
    },
    onError: () => {
      console.log("Error! in backend");
      setIsError(true);
    },
    onSettled: () => console.log("Settled"),
  });

  const handleFormSubmit = (values: {
    description: string;
    type: TicketType;
    priority: TicketPriority;
    projectId: string;
  }) => {
    if (sessionData === null) return;
    try {
      createTicket.mutate({ submitterId: sessionData.user.id, ...values });
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  const form = useForm({
    initialValues: {
      description: "",
      type: "",
      priority: "",
      projectId: "",
    },

    validate: {
      description: (value: string) =>
        value === ""
          ? "Description is required"
          : value.length < 3
          ? "Description must be at least 3 characters"
          : null,

      type: (value: string) => {
        const roles = Object.keys(TicketType);
        if (!roles.includes(value)) {
          return "Must Pick a Type";
        }
      },

      priority: (value: string) => {
        const roles = Object.keys(TicketPriority);
        if (!roles.includes(value)) {
          return "Must Pick a Priority";
        }
      },
    },
  });

  return (
    <>
      <Modal opened={opened} onClose={close} title="New Project">
        <form onSubmit={form.onSubmit(handleFormSubmit)}>
          <div className="my-4">
            <TextInput
              withAsterisk
              label="Description"
              placeholder="Ticket description"
              {...form.getInputProps("description")}
            />
          </div>
          <div className="my-4">
            <Select
              withAsterisk
              label="Pick a Type"
              placeholder="Pick one"
              data={[
                { value: TicketType.API_ISSUE, label: "API Issue" },
                { value: TicketType.UI_ISSUE, label: "UI Issue" },
                { value: TicketType.DATABASE_ISSUE, label: "Database Issue" },
              ]}
              dropdownPosition="bottom"
              {...form.getInputProps("type")}
            />
          </div>

          <div className="my-4">
            <Select
              withAsterisk
              label="Pick a Priority"
              placeholder="Pick one"
              data={[
                { value: TicketPriority.HIGH, label: "High" },
                { value: TicketPriority.MEDIUM, label: "Medium" },
                { value: TicketPriority.LOW, label: "Low" },
              ]}
              dropdownPosition="bottom"
              {...form.getInputProps("priority")}
            />
          </div>

          <div className="my-4">
            <Select
              withAsterisk
              label="Pick a Project"
              placeholder="Pick one"
              data={mappedProjectData}
              dropdownPosition="bottom"
              {...form.getInputProps("projectId")}
            />
          </div>

          <Group position="right" mt="md">
            {isError && <div>Error: Duplicate Entry</div>}
            <Button
              type="submit"
              {...(createTicket.isLoading && { loading: true })}
            >
              Submit
            </Button>
          </Group>
        </form>
      </Modal>
      <Button className="" onClick={open}>
        Add New Ticket
      </Button>
    </>
  );
};

export default AddTicketModal;
