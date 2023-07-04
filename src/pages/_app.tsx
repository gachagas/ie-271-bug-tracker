import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { MantineProvider, createEmotionCache } from "@mantine/core";
import { api } from "~/utils/api";
import Script from "next/script";
import { useEffect } from "react";
import TagManager, { type TagManagerArgs } from "react-gtm-module";
import "~/styles/globals.css";
import ReactGA from "react-ga";
import ReactGA4 from "react-ga4";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const myCache = createEmotionCache({
    key: "mantine",
    prepend: false,
  });

  const gtmId = "GTM-K6FC2F5";

  const tagManagerArgs: TagManagerArgs = {
    gtmId,
  };

  const trackingId = "G-J697KLK62K";
  ReactGA.initialize(trackingId);
  ReactGA4.initialize(trackingId);

  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
    ReactGA.initialize(trackingId);
    ReactGA4.initialize(trackingId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-J697KLK62K"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-J697KLK62K', {
            page_path: window.location.pathname,
          });
        `,
        }}
      />
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
    </>
  );
};

export default api.withTRPC(MyApp);
