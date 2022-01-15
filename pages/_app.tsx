import { ChakraProvider, ScaleFade } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import "tailwindcss/tailwind.css";
import Header from "../components/Header";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        <title>Audioroom</title>
      </Head>
      <RecoilRoot>
        <ChakraProvider>
          {router.route != '/' && <div className="sticky top-0 bg-white z-10 text-slate-700"><Header /></div>}
          
          <ScaleFade key={router.route} initialScale={0.9} in={true}>
            <div className="font-poppins font-bold">
              <Component {...pageProps} />
              {/* <CookieNotice /> */}
            </div>
          </ScaleFade>
        </ChakraProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
