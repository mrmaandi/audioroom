import { Box, Heading, Link, Text } from "@chakra-ui/react";
import Header from "../components/Header";

const SignIn = () => {
  return (
    <div>
      <Box
        bg="whiteAlpha.100"
        minH="100vh"
        py="12"
        px={{ base: "4", lg: "8" }}
      >
        <Box maxW="md" mx="auto">
          <Heading textAlign="center" size="xl" fontWeight="extrabold">
            Sign in to your account
          </Heading>
          <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
            <Text as="span">Don&apos;t have an account? </Text>
            <Link href="#">Start free trial</Link>
          </Text>
        </Box>
      </Box>
    </div>
  );
};

export default SignIn;
