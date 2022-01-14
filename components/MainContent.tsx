import Image from "next/image";
import { Box, Center, Container, Grid, GridItem } from "@chakra-ui/react";

const MainContent = () => {
  return (
    <Container maxW="container.xl">
      <Grid templateColumns={{md: "repeat(2, 1fr)"}} py={10}>
        <GridItem>
          <Center h="full">
            <Box>
              <h1 className="text-4xl pb-5">What's it about</h1>
              <p className="">
                Sample flippers, music producers and others alike — this is to whom Audioroom is
                created for. It's a place to create challenges and find other producers to join your
                challenges.
              </p>
            </Box>
          </Center>
        </GridItem>
        <GridItem>
          <Center h="full">
            <img src="/img/undraw_online_connection_6778.svg" alt="star" />
          </Center>
        </GridItem>
      </Grid>
      <Grid templateColumns="repeat(2, 1fr)" py={10}>
        <GridItem>
          <Center h="full">
            <Box>
              <h1 className="text-4xl pb-5">Create your own challenges</h1>
              <p className="">
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
