import { api } from "~/utils/api";
import { DataTable } from "mantine-datatable";
import { Eye } from "tabler-icons-react";
import { useDisclosure } from "@mantine/hooks";
import {
  Checkbox,
  Modal,
  Button,
  Group,
  ActionIcon,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";

export const Users = () => {
  const { data, isLoading } = api.example.getAllUsers.useQuery();
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      email: "tt@example.com",
      termsOfService: false,
    },
    validate: {
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
    },
  });

  if (isLoading)
    return <div className="flex grow">Place Loading Spinner here</div>;

  if (!data) {
    return null;
  }

  const users = data.map((user) => {
    return (
      <div key={user.id}>
        Hello~ {user.name} with ID {user.id}{" "}
      </div>
    );
  });

  return (
    <>
      <div>
        <Modal opened={opened} onClose={close} title="Add User">
          <form
            onSubmit={form.onSubmit((values) =>
              console.log("Le values", values)
            )}
          >
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps("email")}
            />

            <Checkbox
              mt="md"
              label="I agree to sell my privacy"
              {...form.getInputProps("termsOfService", { type: "checkbox" })}
            />

            <Group position="right" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Modal>

        <div>{users}</div>
        <Button onClick={open}>Add user</Button>
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
