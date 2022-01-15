import {
    Button,
    Container,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Switch,
    Textarea,
    useToast,
    VStack
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Header from "../components/Header";
import { CreateRoomRequest } from "../database/requests";

function CreateRoom() {
  const router = useRouter();
  const toast = useToast()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());
  const [isPrivate, setIsPrivate] = useState(false);
  const [makePublicAfterEnd, setMakePublicAfterEnd] = useState(false);

  const onCreate = () => {
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
      .then(() => router.push("/library"))
      .catch(() =>
        toast({
          title: "Failed to create room",
          description: "Something went wrong",
          status: "error",
          isClosable: true,
        })
      );
  };

  return (
    <div>
      <div className="sticky top-0 bg-white z-10 text-slate-700">
        <Header />
      </div>

      <Container maxW="container.xl">
        <h1 className="text-3xl my-6">Create room</h1>
      </Container>

      <Container maxW="container.sm">
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
            <Textarea id="description" type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Start date</FormLabel>
            <Input id="startDateTime" type="datetime-local" />
            <FormHelperText>Select if you want the challenge to start later</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>End date</FormLabel>
            <Input id="endDateTime" type="datetime-local" />
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="privateRoom">Private room</FormLabel>
            <Switch id="privateRoom" size="lg" />
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <FormLabel>Public after end</FormLabel>
            <Switch id="publicAfterEnd" size="lg" />
          </FormControl>

          <Button fontWeight="normal" textTransform="uppercase" onClick={onCreate}>
            Create
          </Button>
        </VStack>
      </Container>
    </div>
  );
}

export default CreateRoom;
