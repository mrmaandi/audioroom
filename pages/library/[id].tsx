import { Box, Button, Container, Flex, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import { Entry, Room } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Dropzone from "../../components/Dropzone";
import { CreateEntryRequest, getRoom, RoomCombined } from "../../database/requests";

const Room = (props: { data: RoomCombined | null }) => {
  const room = props.data as any;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();
  const router = useRouter();
  const toast = useToast();

  if (!room) {
    return <p>Unknown room</p>;
  }

  const addEntry = () => {
    const request: CreateEntryRequest = {
      roomId: room.id,
      audioFile: "",
    };

    fetch("/api/add-entry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })
      .then(() => {
        onClose();
        toast({
          title: "Entry added",
          description: "Your entry was added to the room.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        router.replace(router.asPath);
      })
      .catch(() =>
        toast({
          title: "Failed to add entry",
          description: "Something went wrong, please try again",
          status: "error",
          isClosable: true,
        })
      );
  };

  return (
    <Container maxW="container.xl">
      <Flex>
        <h1 className="text-4xl font-extrabold">{room.roomPreferences.title}</h1>
        {/* {session && (
          <>
            <div className="flex-grow"></div>
            <Button
              fontWeight="normal"
              variant="outline"
              _hover={{ bg: "white", color: "black" }}
              onClick={onOpen}
            >
              Add entry
            </Button>
          </>
        )} */}
      </Flex>

      {session && (
        <>
          <Box pt={6}>
            <Dropzone />
          </Box>
          <Button
            fontWeight="normal"
            variant="outline"
            _hover={{ bg: "white", color: "black" }}
            onClick={addEntry}
          >
            Add entry
          </Button>
        </>
      )}
      <Box pt={6}>
        <h1 className="text-4xl font-extrabold">Entries</h1>
      </Box>
      <VStack spacing={10} align="stretch">
        {room.entries.map((entry: Entry, index: number) => (
          <Box key={index}>{entry.id}</Box>
        ))}
      </VStack>
    </Container>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const room: RoomCombined | null = await getRoom(context.params!.id as string);

  return {
    props: { data: JSON.parse(JSON.stringify(room)) },
  };
}

export default Room;
