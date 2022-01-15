import {
  Badge,
  Box,
  Button,
  Center,
  chakra,
  Circle,
  Container,
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  Input,
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Room } from "@prisma/client";
import { format, parseISO } from "date-fns";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import CreateRoomDrawer from "../components/CreateRoomDrawer";
import Header from "../components/Header";
import { getRooms } from "../database/requests";

interface Props {
  data: Room[];
}

const RoomCard = (props: { room: Room }) => {
  const { room } = props;

  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      w="full"
      borderWidth="1px"
      rounded="lg"
      shadow="lg"
      position="relative"
      height="full"
      p="6"
    >
      {/* <Box w="100%" h="200px" bgGradient="linear(to-br, blue.300, teal.500)">
          <Center height="full" fontSize="2xl" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated textColor="white">{(room as any).roomPreferences.title}</Center>
        </Box> */}

      <Box>
        <Box fontSize="2xl" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
          {(room as any).roomPreferences.title}
        </Box>
      </Box>

      <Box fontSize="md" textColor="text-slate-600" as="h4" lineHeight="tight" isTruncated>
        {(room as any).roomPreferences.description}
      </Box>

      <Box mt={1}>
        <Box>
          Start: {room.start && format(parseISO(room.start.toString()), "yyyy-MM-dd HH:mm")}
        </Box>
      </Box>

      <Box mt={1} d="flex" alignItems="baseline" mb={2}>
        <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="green">
          In progress
        </Badge>
      </Box>
    </Box>
  );
};

function Library({ data }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Container maxW="container.xl">
        <div className="flex items-center">
          <h1 className="text-3xl my-6">Library</h1>
          <div className="flex-grow"></div>
          <Button
            fontWeight="normal"
            variant="outline"
            _hover={{ bg: "white", color: "black" }}
            onClick={onOpen}
          >
            Create Room
          </Button>
        </div>
        <Input type="search" placeholder='Search' />
        <Grid templateColumns={{ md: "repeat(2, 1fr)" }} gap={5} py={5}>
          {data.length === 0 && <p>No data found</p>}
          {data.map((room, index) => (
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
  const allRooms: Room[] = await getRooms();

  return {
    props: { data: JSON.parse(JSON.stringify(allRooms)) },
  };
}

export default Library;
