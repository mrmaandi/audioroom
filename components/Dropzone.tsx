import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Center, useColorModeValue } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { audioSampleState } from "../recoil-atoms/atoms";

const Dropzone = () => {
  const [audioSample, setAudioSample] = useRecoilState(audioSampleState);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setAudioSample(acceptedFiles[0])
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
  });

  const dropText = isDragActive
    ? "Drop the files here ..."
    : "Drag 'n' drop audio sample here, or click to select files";

  const activeBg = useColorModeValue("gray.100", "gray.600");
  const borderColor = useColorModeValue(
    isDragActive ? "teal.300" : "gray.300",
    isDragActive ? "teal.500" : "gray.500"
  );

  return (
    <Center
      p={10}
      cursor="pointer"
      bg={isDragActive ? activeBg : "transparent"}
      _hover={{ bg: activeBg }}
      transition="background-color 0.2s ease"
      borderRadius={4}
      border="3px dashed"
      borderColor={borderColor}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <p>{dropText}</p>
    </Center>
  );
};

export default Dropzone;
