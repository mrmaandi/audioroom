import {
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { MenuIcon } from "@heroicons/react/outline";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { burgerMenuState } from "../recoil-atoms/atoms";

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
    name: "Pricing",
    link: "/pricing",
  },
  {
    name: "Sign in",
    link: "/signin",
    isButton: true,
  },
];

function Header(props: { isMain?: boolean }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const MobileMenu = () => {
    return (
      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>

          <DrawerBody>
          <VStack spacing={10} align="stretch">
            {navPaths.map((path, index) => (
              <Link href={path.link} key={index}>
                <Box onClick={onClose} fontSize="lg" fontWeight="semibold">{path.name}</Box>
              </Link>
            ))}
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
                <a className="text-3xl">
                  Audio<span className="font-extra-bold">room</span>
                </a>
              </Link>
            </div>
            <div>
              <div className="hidden sm:flex">
                <div className="grid grid-flow-col items-center gap-x-8 text-lg">
                  {navPaths.map((path, index) =>
                    !path.isButton ? (
                      <Link key={index} href={path.link}>
                        {path.name}
                      </Link>
                    ) : (
                      <Button
                        key={index}
                        fontWeight="normal"
                        textTransform="uppercase"
                        variant="outline"
                        fontSize="lg"
                        _hover={{ bg: "white", color: "black" }}
                        onClick={() => router.push(path.link)}
                      >
                        {path.name}
                      </Button>
                    )
                  )}
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
