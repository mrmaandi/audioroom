import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Switch,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { addHours, format, parseISO } from "date-fns";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { CreateRoomRequest } from "../database/requests";
import { audioSampleState } from "../recoil-atoms/atoms";
import Dropzone from "./Dropzone";

const CreateRoomDrawer = (props: { isOpen: boolean; onClose: () => void; onOpen: () => void }) => {
  const toast = useToast();
  const { isOpen, onClose, onOpen } = props;
  const router = useRouter();
  const [audioSample, setAudioSample] = useRecoilState(audioSampleState);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDateTime, setStartDateTime] = useState(format(new Date(), "yyyy-MM-dd'T'hh:mm"));
  const [endDateTime, setEndDateTime] = useState(format(addHours(new Date(), 1), "yyyy-MM-dd'T'hh:mm"));
  const [isPrivate, setIsPrivate] = useState(false);
  const [makePublicAfterEnd, setMakePublicAfterEnd] = useState(false);

  const clearValues = () => {
    setTitle("");
    setDescription("");
    setStartDateTime(format(new Date(), "yyyy-MM-dd'T'hh:mm"));
    setEndDateTime(format(addHours(new Date(), 1), "yyyy-MM-dd'T'hh:mm"));
    setIsPrivate(false);
    setMakePublicAfterEnd(false);
    setAudioSample(undefined);
  };

  const onRoomCreate = () => {
    const request: CreateRoomRequest = {
      title: title,
      description: description,
      startDateTime: parseISO(startDateTime),
      endDateTime: parseISO(endDateTime),
      isPrivate: isPrivate,
      makePublicAfterEnd: makePublicAfterEnd,
    };

    fetch("/api/createroom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })
      .then(() => {
        onClose();
        toast({
          title: "Room created",
          description: "New room was successfully created",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        clearValues();
        router.replace(router.asPath);
      })
      .catch(() =>
        toast({
          title: "Failed to create room",
          description: "Something went wrong, please try again",
          status: "error",
          isClosable: true,
        })
      );
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="md">
      <form
        id="create-room-form"
        onSubmit={(e) => {
          e.preventDefault();
          onRoomCreate();
        }}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Create new room</DrawerHeader>
          <DrawerCloseButton />

          <DrawerBody>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  id="title"
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  id="description"
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Start date</FormLabel>
                <Input
                  id="startDateTime"
                  type="datetime-local"
                  value={startDateTime}
                  onChange={(e) => setStartDateTime(e.currentTarget.value)}
                />
                <FormHelperText>
                  Select if you want the challenge to start at a later time
                </FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>End date</FormLabel>
                <Input
                  id="endDateTime"
                  type="datetime-local"
                  value={endDateTime}
                  onChange={(e) => setEndDateTime(e.currentTarget.value)}
                />
                <FormHelperText>
                  Don`t set if you want to keep submittions open forever
                </FormHelperText>
              </FormControl>

              <FormControl display="flex" flexDirection="column">
                <FormLabel>Audio sample</FormLabel>
                <Dropzone />
                {audioSample && <p>Selected: {audioSample.name}</p>}
              </FormControl>

              <FormControl alignItems="center">
                <Box display="flex">
                  <FormLabel htmlFor="privateRoom">Private room</FormLabel>
                  <Switch id="privateRoom" size="lg" />
                </Box>
                <FormHelperText>
                  If toggled on, your room will be not be seen publically
                </FormHelperText>
              </FormControl>
              {/* <FormControl display="flex" alignItems="center">
                <FormLabel>Public after end</FormLabel>
                <Switch id="publicAfterEnd" size="lg" />
              </FormControl> */}
            </VStack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button
              variant="outline"
              fontWeight="normal"
              textTransform="uppercase"
              onClick={clearValues}
              mr={3}
            >
              Clear
            </Button>
            <Button
              type="submit"
              colorScheme="blue"
              form="create-room-form"
              fontWeight="normal"
              textTransform="uppercase"
            >
              Create
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  );
};

export default CreateRoomDrawer;
