import { AppShell, Navbar, Header } from "@mantine/core";
import { useState } from "react";
import { AdminBoard } from "./components/AdminBoard";
import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import ProjectManagerBoard from "./components/ProjectManagerBoard";
import { api } from "~/utils/api";
import LandingPage from "./components/LandingPage";
import SubmitterBoard from "./components/SubmitterBoard";
import ProjectTicketsBoard from "./components/ProjectTicketsBoard";
import Dashboard from "./components/Dashboard";

const sampleSvg = (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
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

const Home: NextPage = () => {
  const data = [
    { label: "Admin Dashboard", component: <AdminBoard /> },
    { label: "Dashboard", component: <Dashboard /> },
    { label: "Project Management", component: <ProjectManagerBoard /> },
    { label: "Ticket Management", component: <SubmitterBoard /> },
    { label: "Project tickets", component: <ProjectTicketsBoard /> },
  ];

  const { data: sessionData, status } = useSession();

  const [active, setActive] = useState<number>(0);

  const links = data.map((item, index) => {
    if (item.label === "Admin Dashboard" && sessionData) {
      if (sessionData.user.role !== "ADMIN") {
        return null;
      }
    }

    if (item.label === "Project Management" && sessionData) {
      if (
        sessionData.user.role !== "ADMIN" &&
        sessionData.user.role !== "PROJECT_MANAGER"
      ) {
        return null;
      }
    }

    if (item.label === "Ticket Management" && sessionData) {
      if (
        sessionData.user.role !== "ADMIN" &&
        sessionData.user.role !== "SUBMITTER"
      ) {
        return null;
      }
    }

    if (item.label === "Project tickets" && sessionData) {
      if (
        sessionData.user.role !== "ADMIN" &&
        sessionData.user.role !== "PROJECT_MANAGER" &&
        sessionData.user.role !== "DEVELOPER"
      ) {
        return null;
      }
    }
    return (
      <button
        className={`flex rounded px-3 py-[10px] font-sans text-sm font-medium leading-6 ${
          active === index ? "bg-cyan-950 text-sky-200" : "hover:bg-gray-700/50"
        }`}
        key={item.label}
        onClick={() => setActive(index)}
      >
        <svg className="flex-no-shrink mr-1 h-5 w-5 translate-y-[3px] fill-current stroke-current ">
          {sampleSvg}
        </svg>
        {item.label}
      </button>
    );
  });

  if (status === "loading") {
    return <div className="m-20">Loading...</div>;
  }

  return (
    <div>
      {sessionData ? (
        <AppShell
          padding={0}
          navbar={
            <Navbar width={{ base: 240 }}>
              <div className="flex grow flex-col p-3">
                <div className="mb-6 border-b  border-gray-600 pb-4">
                  Welcome, {sessionData && sessionData.user.name} your role is{" "}
                  {sessionData && sessionData.user.role}
                </div>
                {links}

                <div className="flex px-1"></div>
              </div>
            </Navbar>
          }
          header={
            <Header height={45} p={0}>
              <div className="h-[46px]">Hello world2</div>
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
          {data[active]?.component}
          {/* <AuthShowcase /> */}
        </AppShell>
      ) : (
        <LandingPage />
      )}
    </div>
  );
};

export default Home;

// const AuthShowcase: React.FC = () => {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined }
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={
//           sessionData
//             ? () => void signOut()
//             : () => {
//                 return void signIn();
//               }
//         }
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// };
