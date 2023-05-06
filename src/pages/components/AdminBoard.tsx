import { Tabs } from "@mantine/core";
import { Photo, MessageCircle, Settings } from "tabler-icons-react";

export const AdminBoard = () => {
  const links = [{ name: "AdminBoard", component: "SomeComponent" }];

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
          <Tabs.Tab value="gallery" icon={<Photo size="0.8rem" />}>
            Gallery
          </Tabs.Tab>
          <Tabs.Tab value="messages" icon={<MessageCircle size="0.8rem" />}>
            Messages
          </Tabs.Tab>
          <Tabs.Tab value="settings" icon={<Settings size="0.8rem" />}>
            Settings
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="gallery">Gallery tab content</Tabs.Panel>

        <Tabs.Panel value="messages">Messages tab content</Tabs.Panel>

        <Tabs.Panel value="settings">Settings tab content</Tabs.Panel>
      </Tabs>
    </>
  );
};

export default AdminBoard;
