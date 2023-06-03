import { Tabs } from "@mantine/core";
import { Photo, MessageCircle, Settings } from "tabler-icons-react";
import Users from "./Admin/Users";
export const AdminBoard = () => {
  // const links = [{ name: "AdminBoard", component: "SomeComponent" }];

  return (
    <>
      {/* <div className="flex bg-slate-800">
        <div>AdminBoard</div>
        <div>Modify users</div>
        <div>Modify projects</div>
        <div>Modify tickets</div>
        <div>Modify comments</div>
        <div>Content</div>
      </div>
      <div className="p-4">Rest of the content</div> */}

      <Tabs color="lime" variant="outline" radius="xs" defaultValue="gallery">
        <Tabs.List>
          <div className="w-10"></div>
          <Tabs.Tab value="users" icon={<Photo size="0.8rem" />}>
            Users
          </Tabs.Tab>
          <Tabs.Tab value="projects" icon={<MessageCircle size="0.8rem" />}>
            Projects
          </Tabs.Tab>
          <Tabs.Tab value="tickets" icon={<Settings size="0.8rem" />}>
            Tickets
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="users">
          <Users />
        </Tabs.Panel>

        <Tabs.Panel value="projects">Projects tab content</Tabs.Panel>

        <Tabs.Panel value="tickets">Tickets tab content</Tabs.Panel>
      </Tabs>
    </>
  );
};

export default AdminBoard;
