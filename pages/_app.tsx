import { Box, Center, ChakraProvider, Flex, Spinner } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import "tailwindcss/tailwind.css";
import Footer from "../components/Footer";
import Header from "../components/Header";

function MyApp({ Component, pageProps: { session, ...pageProps }, router }: AppProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      console.log("findished");
      setLoading(false);
    };
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Audioroom</title>
      </Head>
      <SessionProvider>
        <RecoilRoot>
          <ChakraProvider>
            {router.route != "/" && (
              <Box
                bgColor="whiteAlpha.900"
                position="sticky"
                top={0}
                zIndex={10}
                textColor="blackAlpha.900"
              >
                <Header />
              </Box>
            )}

            <>
              {loading ? (
                <Center h={400}>
                  <Spinner />
                </Center>
              ) : (
                /*             <ScaleFade key={router.route} initialScale={0.9} in={true}> */
                /* todo : fix landing page refresh scrolls down */
                <div className="font-poppins font-bold">
                  <Flex minH="full" flexDirection="column" justifyContent="space-between">
                    <Component {...pageProps} />
                    {/* <CookieNotice /> */}

                    <Footer />
                  </Flex>
                </div>
                /*             </ScaleFade> */
              )}
            </>
          </ChakraProvider>
        </RecoilRoot>
      </SessionProvider>
    </>
  );
}

export default MyApp;
