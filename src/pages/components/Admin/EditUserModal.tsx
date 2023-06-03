import { useForm } from "@mantine/form";
import {
  Button,
  Group,
  Modal,
  PasswordInput,
  Select,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Role } from "@prisma/client";
import { EditCircle } from "tabler-icons-react";

import { api } from "~/utils/api";

export type UserInput = {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
};

interface EditUserModalProps {
  datum: UserInput;
}

const EditUserModal = ({ datum }: EditUserModalProps) => {
  const [selectOpened, setSelectOpened] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [opened, { open, close }] = useDisclosure(false);

  const updateUser = api.users.updateUser.useMutation({
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
    email: string;
    password: string;
    name: string;
    role: string;
  }) => {
    try {
      updateUser.mutate({
        id: datum.id,
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role as Role,
      });
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  const form = useForm({
    initialValues: {
      name: datum.name,
      email: datum.email,
      password: datum.password,
      role: datum.role,
    },

    validate: {
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",

      password: (value: string) =>
        value.length < 3 ? "Must be at least 3 characters" : null,

      name: (value: string) =>
        value === ""
          ? "Name is required"
          : value.length < 3
          ? "Name must be at least 3 characters"
          : null,

      role: (value: string) => {
        const roles = Object.keys(Role);
        if (!roles.includes(value)) {
          return "Must Pick a role";
        }
      },
    },
  });

  return (
    <>
      <Modal opened={opened} onClose={close} title="Update User">
        <form onSubmit={form.onSubmit(handleFormSubmit)}>
          <div className="my-4">
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps("email")}
            />
          </div>
          <div className="my-4">
            <PasswordInput
              placeholder="Password"
              label="Password"
              description="Please don't use an actual password"
              withAsterisk
              {...form.getInputProps("password")}
            />
          </div>
          <div className="my-4">
            <TextInput
              withAsterisk
              label="Name"
              placeholder="Your Name"
              {...form.getInputProps("name")}
            />
          </div>
          <div className="my-4">
            <Select
              withAsterisk
              label="Pick a role"
              placeholder="Pick one"
              data={[
                { value: Role.ADMIN, label: "Admin" },
                { value: Role.DEVELOPER, label: "Developer" },
                { value: Role.PROJECT_MANAGER, label: "Project Manager" },
                { value: Role.SUBMITTER, label: "Submitter" },
              ]}
              dropdownPosition="bottom"
              onDropdownOpen={() => setSelectOpened(true)}
              onDropdownClose={() => setSelectOpened(false)}
              {...form.getInputProps("role")}
            />
          </div>
          <div className="my-4">
            {selectOpened && <div className="h-40" />}
            {!selectOpened && (
              <Group position="right" mt="md">
                {isError && <div>Error: Duplicate Entry</div>}
                <Button
                  type="submit"
                  {...(updateUser.isLoading && { loading: true })}
                >
                  Submit
                </Button>
              </Group>
            )}
          </div>
        </form>
      </Modal>
      <EditCircle size={16} onClick={open}></EditCircle>
    </>
  );
};

export default EditUserModal;
