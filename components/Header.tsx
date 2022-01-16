import {
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  StackDivider,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { MenuIcon } from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

interface NavPath {
  name: string;
  link: string;
  showOnMobile?: boolean;
  isButton?: boolean;
}

export const navPaths: NavPath[] = [
  {
    name: "Library",
    link: "/library",
  },
  {
    name: "Blog",
    link: "/blog",
  },
  {
    name: "Pricing",
    link: "/pricing",
  },
];

function Header(props: { isMain?: boolean }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();
  const router = useRouter();

  const AuthButton = () => {
    if (session) {
      return (
        <>
          <Flex justifyContent="center" alignItems="center" gap={2}>
            <Avatar name={session.user?.name || "Unnamed"} src={session.user?.image || ""} />
            {session.user?.name} <br />
          </Flex>
          <Button
            fontWeight="normal"
            textTransform="uppercase"
            variant="outline"
            fontSize="lg"
            _hover={{ bg: "white", color: "black" }}
            onClick={() => signOut()}
          >
            Sign out
          </Button>
        </>
      );
    }

    return (
      <Button
        fontWeight="normal"
        textTransform="uppercase"
        variant="outline"
        fontSize="lg"
        _hover={{ bg: "white", color: "black" }}
        onClick={() => signIn()}
      >
        Sign in
      </Button>
    );
  };

  const MobileMenu = () => {
    return (
      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>
          <DrawerBody>
            <VStack spacing={12} align="stretch">
              {navPaths.map((path, index) => (
                <Link href={path.link} key={index}>
                  <Box onClick={onClose} fontSize="lg" fontWeight="semibold">
                    {path.name}
                  </Box>
                </Link>
              ))}
              <AuthButton />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  };

  return (
    <>
      <div className="w-full py-4 md:px-0">
        <Container maxW="container.xl">
          <div className="flex justify-between items-center uppercase">
            <div>
              <Link href="/">
                <a className="text-4xl">
                  Audio<span className="font-extra-bold">room</span>
                </a>
              </Link>
            </div>
            <div>
              <div className="hidden sm:flex">
                <div className="grid grid-flow-col items-center gap-x-8 text-lg">
                  {navPaths.map(
                    (path, index) =>
                      !path.isButton && (
                        <Link key={index} href={path.link}>
                          {path.name}
                        </Link>
                      )
                  )}
                  <AuthButton />
                </div>
              </div>
              <div className="sm:hidden">
                <MenuIcon className="h-10" onClick={onOpen} />
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className="sm:hidden">
        <MobileMenu />
      </div>
    </>
  );
}

export default Header;
