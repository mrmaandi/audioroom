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
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Switch,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { CreateRoomRequest } from "../database/requests";
import Dropzone from "./Dropzone";

const CreateRoomDrawer = (props: { isOpen: boolean; onClose: () => void; onOpen: () => void }) => {
  const toast = useToast();
  const { isOpen, onClose, onOpen } = props;
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());
  const [isPrivate, setIsPrivate] = useState(false);
  const [makePublicAfterEnd, setMakePublicAfterEnd] = useState(false);
  const [audioSample, setAudioSample] = useState<File>();

  const clearValues = () => {
    setTitle("");
    setDescription("");
    setStartDateTime(new Date());
    setEndDateTime(new Date());
    setIsPrivate(false);
    setMakePublicAfterEnd(false);
    setAudioSample(undefined);
  };

  const onRoomCreate = () => {
    const request: CreateRoomRequest = {
      title: title,
      description: description,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
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

  const onFileAccepted = (file: File) => {
    setAudioSample(file);
    console.log(file);
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
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
                <Input id="startDateTime" type="datetime-local" />
                <FormHelperText>
                  Select if you want the challenge to start at a later time
                </FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>End date</FormLabel>
                <Input id="endDateTime" type="datetime-local" />
              </FormControl>

              <FormControl display="flex" flexDirection="column">
                <FormLabel>Audio sample</FormLabel>
                <Dropzone onFileAccepted={onFileAccepted} />
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
              <FormControl display="flex" alignItems="center">
                <FormLabel>Public after end</FormLabel>
                <Switch id="publicAfterEnd" size="lg" />
              </FormControl>
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
