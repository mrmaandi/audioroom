import Image from "next/image";
import { Box, Center, Container, Divider, Grid, GridItem, VStack } from "@chakra-ui/react";

const MainContent = () => {
  return (
    <Container maxW="container.xl">
      <Grid templateColumns={{ md: "repeat(2, 1fr)" }} gap={10} py={16}>
        <GridItem>
          <Center h="full">
            <Box>
              <VStack spacing={6} align="stretch">
                <h1 className="text-5xl font-extrabold pb-5">Connect with producers</h1>
                <p className="text-lg text-slate-600">
                  Sample flippers, music producers and others alike — this is to whom Audioroom is
                  created for. It's a place to create challenges and find other producers to join
                  your challenges.
                </p>
              </VStack>
            </Box>
          </Center>
        </GridItem>
        <GridItem>
          <Center h="full">
            <img src="/img/undraw_online_connection_6778.svg" alt="star" />
          </Center>
        </GridItem>
      </Grid>
      <Divider />
      <Grid templateColumns={{ md: "repeat(2, 1fr)" }} gap={10} py={16}>
        <GridItem>
          <Center h="full">
            <Box>
              <h1 className="text-5xl font-extrabold pb-5">Create challenges</h1>
              <p className="text-lg text-slate-600">
                In the dashboard you can create new challenges for others to participate in.
              </p>
            </Box>
          </Center>
        </GridItem>
        <GridItem>
          <Center h="full">
            <img src="/img/undraw_audio_conversation_re_ptsl.svg" alt="star" />
          </Center>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default MainContent;
