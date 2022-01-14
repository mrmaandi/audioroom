import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Audioroom</title>
      </Head>
      <RecoilRoot>
        <ChakraProvider>
          <div className="font-poppins font-bold">
            <Component {...pageProps} />
          </div>
        </ChakraProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
