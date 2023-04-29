import {
  AppShell,
  Button,
  Navbar,
  Header,
  createStyles,
  getStylesRef,
  rem,
} from "@mantine/core";
import { useState } from "react";

// const useStyles = createStyles((theme) => ({
//   header: {
//     paddingBottom: theme.spacing.md,
//     marginBottom: `calc(${theme.spacing.md} * 1.5)`,
//     borderBottom: `${rem(1)} solid ${
//       theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
//     }`,
//   },

//   footer: {
//     paddingTop: theme.spacing.md,
//     marginTop: theme.spacing.md,
//     borderTop: `${rem(1)} solid ${
//       theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
//     }`,
//   },

//   link: {
//     ...theme.fn.focusStyles(),
//     display: "flex",
//     alignItems: "center",
//     textDecoration: "none",
//     fontSize: theme.fontSizes.sm,
//     color:
//       theme.colorScheme === "dark"
//         ? theme.colors.dark[1]
//         : theme.colors.gray[7],
//     padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
//     borderRadius: theme.radius.sm,
//     fontWeight: 500,

//     "&:hover": {
//       backgroundColor:
//         theme.colorScheme === "dark"
//           ? theme.colors.dark[6]
//           : theme.colors.gray[0],
//       color: theme.colorScheme === "dark" ? theme.white : theme.black,

//       [`& .${getStylesRef("icon")}`]: {
//         color: theme.colorScheme === "dark" ? theme.white : theme.black,
//       },
//     },
//   },

//   linkIcon: {
//     ref: getStylesRef("icon"),
//     color:
//       theme.colorScheme === "dark"
//         ? theme.colors.dark[2]
//         : theme.colors.gray[6],
//     marginRight: theme.spacing.sm,
//   },

//   linkActive: {
//     "&, &:hover": {
//       backgroundColor: theme.fn.variant({
//         variant: "light",
//         color: theme.primaryColor,
//       }).background,
//       color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
//         .color,
//       [`& .${getStylesRef("icon")}`]: {
//         color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
//           .color,
//       },
//     },
//   },
// }));

// const data = [
//   { link: "", label: "Notifications" },
//   { link: "", label: "Billing" },
//   { link: "", label: "Security" },
//   { link: "", label: "SSH Keys" },
//   { link: "", label: "Databases" },
//   { link: "", label: "Authentication" },
//   { link: "", label: "Other Settings" },
// ];

export default function Demo() {
  // const { classes, cx } = useStyles();
  // const [active, setActive] = useState("Billing");

  // const links = data.map((item) => (
  //   <a
  //     className={cx(classes.link, {
  //       [classes.linkActive]: item.label === active,
  //     })}
  //     href={item.link}
  //     key={item.label}
  //     onClick={(event) => {
  //       event.preventDefault();
  //       setActive(item.label);
  //     }}
  //   >
  //     <item.icon className={classes.linkIcon} stroke={1.5} />
  //     <span>{item.label}</span>
  //   </a>
  // ));

  const data = [
    { label: "Notifications" },
    { label: "Billing" },
    { label: "Security" },
  ];

  const [active, setActive] = useState("Notifications");

  const links = data.map((item) => (
    <button
      className={`m-1 flex ${
        active === item.label ? "bg-blue-500 text-white" : "hover:bg-blue-200"
      }`}
      key={item.label}
      onClick={() => setActive(item.label)}
    >
      {item.label}
    </button>
  ));

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 240 }}>
          <div className="flex grow flex-col p-4">
            <div className="mb-6 border-b  border-gray-600 pb-4">
              YOUR LOGO GOES HERE
            </div>
            {links}

            <div className="flex px-1">
              <Button
                className="grow"
                variant="subtle"
                onClick={() => {
                  console.log("HEllo world");
                }}
              >
                This is a nice button
              </Button>
            </div>
            <div className="m-2 flex bg-slate-800 px-3 py-[10px]">
              <span className="text-sm font-medium"> Billing</span>
            </div>
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
