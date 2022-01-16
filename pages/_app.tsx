import { ChakraProvider, ScaleFade } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import "tailwindcss/tailwind.css";
import Header from "../components/Header";
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: { session, ...pageProps }, router }: AppProps) {
  return (
    <>
      <Head>
        <title>Audioroom</title>
      </Head>
      <SessionProvider>
        <RecoilRoot>
          <ChakraProvider>
            {router.route != "/" && (
              <div className="sticky top-0 bg-white z-10 text-slate-700">
                <Header />
              </div>
            )}

            {/* todo : fix landing page refresh scrolls down */}
{/*             <ScaleFade key={router.route} initialScale={0.9} in={true}> */}
              <div className="font-poppins font-bold">
                <Component {...pageProps} />
                {/* <CookieNotice /> */}
              </div>
{/*             </ScaleFade> */}
          </ChakraProvider>
        </RecoilRoot>
      </SessionProvider>
    </>
  );
}

export default MyApp;
