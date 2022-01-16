import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Input,
  Spacer,
  useColorModeValue,
  useDisclosure,
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
  rooms: RoomCombined[];
}

function Library({ rooms }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();

  return (
    <div>
      <Container maxW="container.xl" pt={6}>
        {session ? (
          <Flex alignItems="center">
            <h1 className="text-4xl font-extrabold">Library</h1>
            <Spacer />
            <Button
              fontWeight="normal"
              variant="outline"
              _hover={{ bg: "white", color: "black" }}
              onClick={onOpen}
            >
              Create Room
            </Button>
          </Flex>
        ) : (
          <h1 className="text-4xl font-extrabold pb-5">Library</h1>
        )}

        <Input type="search" placeholder="Search" mt={4} />

        {session && (
          <>
            <h1 className="text-4xl font-extrabold pb-2 pt-5">Your rooms</h1>
            <Grid templateColumns={{ md: "repeat(2, 1fr)" }} gap={5} py={5}>
              {rooms.filter((room: RoomCombined) => room.createdBy === (session as any).user.id)
                .length === 0 && <p>No rooms</p>}
              {rooms.filter((room: RoomCombined) => room.createdBy === (session as any).user.id).map((room, index) => (
                <GridItem key={index}>
                  <RoomCard room={room} />
                </GridItem>
              ))}
            </Grid>
          </>
        )}
        
        <h1 className="text-4xl font-extrabold pb-2 pt-5">All rooms</h1>
        <Grid templateColumns={{ md: "repeat(2, 1fr)" }} gap={5} py={5}>
          {rooms.length === 0 && <p>No data found</p>}
          {rooms.map(
            (room, index) =>
              room && (
                <GridItem key={index}>
                  <RoomCard room={room} />
                </GridItem>
              )
          )}
        </Grid>
      </Container>
      <CreateRoomDrawer isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const allRooms: RoomCombined[] = await getRooms();

  return {
    props: { rooms: JSON.parse(JSON.stringify(allRooms)) },
  };
}

export default Library;
