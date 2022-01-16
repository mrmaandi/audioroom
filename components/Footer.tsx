import { Box, Center, Container } from "@chakra-ui/react";
import Link from "next/link";

function Footer() {
  return (
    <Box
      bgColor="whiteAlpha.900"
      position="sticky"
      top={0}
      zIndex={10}
      textColor="blackAlpha.900"
      py={10}
    >
      <Container maxW="container.xl">
        <Center>Audioroom © 2022</Center>
      </Container>
    </Box>
  );
}

export default Footer;
