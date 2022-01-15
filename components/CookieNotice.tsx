import React from "react";
import {
  Stack,
  Text,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";

export default function CookieNotice() {
    const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Drawer placement="bottom" onClose={onClose} isOpen={true}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody>
          <Stack direction="row" alignItems="center">
              <Text fontWeight="semibold">Your Privacy</Text>
            </Stack>
            <Stack direction={{ base: "column", md: "row" }} justifyContent="space-between">
              <Text fontSize={{ base: "sm" }} textAlign={"left"} maxW={"4xl"}>
                We use cookies and similar technologies to help personalise content, tailor and
                measure ads, and provide a better experience. By clicking OK or turning an option on
                in Cookie Preferences, you agree to this, as outlined in our Cookie Policy. To
                change preferences or withdraw consent, please update your Cookie Preferences.
              </Text>
              <Stack direction={{ base: "column", md: "row" }}>
                <Button variant="outline" colorScheme="green">
                  Cookie Preferences
                </Button>
                <Button colorScheme="green">OK</Button>
              </Stack>
            </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
