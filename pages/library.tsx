import {
  Badge,
  Box,
  Button, Container, Grid,
  GridItem, Input, useColorModeValue,
  useDisclosure
} from "@chakra-ui/react";
import { Room } from "@prisma/client";
import { format, parseISO } from "date-fns";
import { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import CreateRoomDrawer from "../components/CreateRoomDrawer";
import RoomCard from "../components/ui/RoomCard";
import { getRooms, RoomCombined } from "../database/requests";

interface Props {
  data: RoomCombined[];
}

function Library({ data }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();

  return (
    <div>
      <Container maxW="container.xl">
        <div className="flex items-center">
          <h1 className="text-4xl font-extrabold pb-5">Library</h1>
          {session && (
            <>
              <div className="flex-grow"></div>
              <Button
                fontWeight="normal"
                variant="outline"
                _hover={{ bg: "white", color: "black" }}
                onClick={onOpen}
              >
                Create Room
              </Button>
            </>
          )}
        </div>
        <Input type="search" placeholder="Search" />
        <Grid templateColumns={{ md: "repeat(2, 1fr)" }} gap={5} py={5}>
          {data.length === 0 && <p>No data found</p>}
          {data.map((room, index) => room && (
            <GridItem key={index}>
              <RoomCard room={room} />
            </GridItem>
          ))}
        </Grid>
      </Container>
      <CreateRoomDrawer isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const allRooms: RoomCombined[] = await getRooms();

  return {
    props: { data: JSON.parse(JSON.stringify(allRooms)) },
  };
}

export default Library;
