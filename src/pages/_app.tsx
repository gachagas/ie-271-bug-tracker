import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { MantineProvider, createEmotionCache } from "@mantine/core";
import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const myCache = createEmotionCache({
    key: "mantine",
    prepend: false,
  });

  return (
    <SessionProvider session={session}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: "dark" }}
        emotionCache={myCache}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
