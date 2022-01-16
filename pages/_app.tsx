import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import "tailwindcss/tailwind.css";
import Footer from "../components/Footer";
import Header from "../components/Header";

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
              <Box bgColor="whiteAlpha.900" position="sticky" top={0} zIndex={10} textColor="blackAlpha.900">
                <Header />
              </Box>
            )}

            {/* todo : fix landing page refresh scrolls down */}
{/*             <ScaleFade key={router.route} initialScale={0.9} in={true}> */}
              <div className="font-poppins font-bold">
              <Flex minH="full" flexDirection="column" justifyContent="space-between">
                <Component {...pageProps} />
                {/* <CookieNotice /> */}
                
                <Footer />
              </Flex>
              </div>
{/*             </ScaleFade> */}
          </ChakraProvider>
        </RecoilRoot>
      </SessionProvider>
    </>
  );
}

export default MyApp;
