import { Box, useColorModeValue, Badge, Flex, Avatar } from "@chakra-ui/react";
import { format, isFuture, parseISO } from "date-fns";
import { useRouter } from "next/router";
import { RoomCombined } from "../../database/requests";

const RoomCard = (props: { room: RoomCombined }) => {
  const router = useRouter();
  const room = props.room as any;

  const isInProgress = props.room.end ? isFuture(new Date(props.room.end)) : true

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
      _hover={{ cursor: "pointer" }}
      onClick={() => router.push(`/library/${room.id}`)}
    >
      <Box>
        <Box fontSize="2xl" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
          {room.roomPreferences.title}
        </Box>
      </Box>

      <Box fontSize="md" textColor="text-slate-600" as="h4" lineHeight="tight" isTruncated>
        {room.roomPreferences.description}
      </Box>

      <Box mt={1}>
        <Box>
          Start: {room.start && format(parseISO(room.start.toString()), "yyyy-MM-dd HH:mm")}
        </Box>
      </Box>

      <Box mt={1}>
        <Box>
          <Flex gap={2} alignItems="center">
            <Avatar size="sm" name={room.User.name || "Unnamed"} src={room.User.image || ""} />
            {room.User.name}
          </Flex>
        </Box>
      </Box>

      <Box mt={1}>
        <Box>Entries: {room.entries.length}</Box>
      </Box>

      <Box mt={1} d="flex" alignItems="baseline" mb={2}>
        {isInProgress ? (
          <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="green">
          In progress
        </Badge>
        ) : (
          <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="yellow">
          Ended
        </Badge>
        )}
        
      </Box>
    </Box>
  );
};

export default RoomCard;
