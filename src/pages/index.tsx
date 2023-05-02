import { AppShell, Navbar, Header } from "@mantine/core";
import { useState } from "react";

const sampleSvg = (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <path
        d="M22 3.25H2C1.59 3.25 1.25 2.91 1.25 2.5C1.25 2.09 1.59 1.75 2 1.75H22C22.41 1.75 22.75 2.09 22.75 2.5C22.75 2.91 22.41 3.25 22 3.25Z"
        fill="#292D32"
      ></path>{" "}
      <path
        d="M3.66992 2.5V14.47C3.66992 15.45 4.12992 16.38 4.91992 16.97L10.1299 20.87C11.2399 21.7 12.7699 21.7 13.8799 20.87L19.0899 16.97C19.8799 16.38 20.3399 15.45 20.3399 14.47V2.5H3.66992ZM15.9999 13.75H7.99992C7.58992 13.75 7.24992 13.41 7.24992 13C7.24992 12.59 7.58992 12.25 7.99992 12.25H15.9999C16.4099 12.25 16.7499 12.59 16.7499 13C16.7499 13.41 16.4099 13.75 15.9999 13.75ZM15.9999 8.75H7.99992C7.58992 8.75 7.24992 8.41 7.24992 8C7.24992 7.59 7.58992 7.25 7.99992 7.25H15.9999C16.4099 7.25 16.7499 7.59 16.7499 8C16.7499 8.41 16.4099 8.75 15.9999 8.75Z"
        fill="#292D32"
      ></path>{" "}
    </g>
  </svg>
);

export default function Demo() {
  const data = [
    { label: "Dashboard Home" },
    { label: "Manage Projects" },
    { label: "Manage Tickets" },
    { label: "My Projects" },
    { label: "My Tickets" },
  ];

  const [active, setActive] = useState("Notifications");

  const links = data.map((item) => (
    <button
      className={`flex rounded px-3 py-[10px] font-sans text-sm font-medium leading-6 ${
        active === item.label
          ? "bg-cyan-950 text-sky-200"
          : "hover:bg-gray-700/50"
      }`}
      key={item.label}
      onClick={() => setActive(item.label)}
    >
      <svg className="flex-no-shrink mr-1 h-5 w-5 translate-y-[3px] fill-current stroke-current ">
        {sampleSvg}
      </svg>
      {item.label}
    </button>
  ));

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 240 }}>
          <div className="flex grow flex-col p-3">
            <div className="mb-6 border-b  border-gray-600 pb-4">
              YOUR LOGO GOES HERE
            </div>
            {links}

            <div className="flex px-1"></div>
          </div>
        </Navbar>
      }
      header={
        <Header height={45} p="xs">
          <div>Hello world2</div>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <div>Hello world3</div>
    </AppShell>
  );
}
