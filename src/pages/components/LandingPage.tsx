import { type NextPage } from "next";
import Head from "next/head";
import { signIn } from "next-auth/react";
import { api } from "~/utils/api";
const LandingPage: NextPage = () => {
  // eslint-disable-next-line
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center bg-black">
        <div className="h-full w-full border-x border-slate-400 md:max-w-2xl">
          <div className="flex border-b border-slate-400 p-4">
            This is the landing page
            <button
              className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
              onClick={() => {
                return void signIn();
              }}
            >
              "Sign in"
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default LandingPage;