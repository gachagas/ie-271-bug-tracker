import { useForm } from "@mantine/form";
import { Button, Group, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

const AddProjectModal = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [opened, { open, close }] = useDisclosure(false);

  const { data: sessionData } = useSession();

  const createUser = api.projects.createProject.useMutation({
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

  const handleFormSubmit = (values: { name: string; description: string }) => {
    if (sessionData === null) return;

    try {
      createUser.mutate({ projectManagerId: sessionData.user.id, ...values });
      console.log("adssda");
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
    },

    validate: {
      name: (value: string) =>
        value === ""
          ? "Name is required"
          : value.length < 3
          ? "Name must be at least 3 characters"
          : null,

      description: (value: string) =>
        value === ""
          ? "Description is required"
          : value.length < 5
          ? "Name must be at least 5 characters"
          : null,
    },
  });

  return (
    <>
      <Modal opened={opened} onClose={close} title="New Project">
        <form onSubmit={form.onSubmit(handleFormSubmit)}>
          <div className="my-4">
            <TextInput
              withAsterisk
              label="Name"
              placeholder="project name"
              {...form.getInputProps("name")}
            />
          </div>
          <div className="my-4">
            <TextInput
              withAsterisk
              label="Description"
              placeholder="Project Description"
              {...form.getInputProps("description")}
            />
          </div>

          <Group position="right" mt="md">
            {isError && <div>Error: Duplicate Entry</div>}
            <Button
              type="submit"
              {...(createUser.isLoading && { loading: true })}
            >
              Submit
            </Button>
          </Group>
        </form>
      </Modal>
      <Button className="" onClick={open}>
        Add Project
      </Button>
    </>
  );
};

export default AddProjectModal;
