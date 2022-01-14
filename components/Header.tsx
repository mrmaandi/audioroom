import { Button } from "@chakra-ui/react";
import { MenuIcon } from "@heroicons/react/outline";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { burgerMenuState } from "../recoil-atoms/atoms";

interface NavPath {
  name: string;
  link: string;
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
  },
];

function Header(props: { isMain?: boolean }) {
  const [isOpen, setIsOpen] = useRecoilState(burgerMenuState);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const variants = {
    hidden: { width: "0%" },
    shown: { width: "calc(100vw - 30%)" },
  };

  const MobileMenu = () => (
    <div className="relative z-10">
      <div className="absolute inset-0">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="motion-menu"
              variants={variants}
              initial="hidden"
              animate="shown"
              exit="hidden"
            >
              <div className="bg-slate-500">
                <div className="flex flex-col h-screen">
                  <Link href="/">
                    <div
                      className="block mt-20 pl-6 py-6 text-white bg-slate-700 font-semibold text-lg"
                      onClick={toggleMenu}
                    >
                      Home
                    </div>
                  </Link>
                  <div className="flex flex-grow"></div>
                  <div className="flex flex-col pb-20">
                    {navPaths.map((path, index) => (
                      <Link href={path.link} key={index}>
                        <div
                          className="block pl-6 py-6 text-white bg-slate-700 font-semibold text-lg"
                          onClick={toggleMenu}
                        >
                          {path.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  return (
    <>
      <div className="w-full py-4 px-6 md:px-0">
        <div className="md:container md:mx-auto">
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
                  {navPaths
                    .filter((path) => path.name !== "Sign in")
                    .map((path, index) => (
                      <Link key={index} href={path.link}>
                        {path.name}
                      </Link>
                    ))}
                  {navPaths
                    .filter((path) => path.name === "Sign in")
                    .map((path, index) => (
                      <Button
                        key={index}
                        fontWeight="normal"
                        variant="outline"
                        _hover={{ bg: "white", color: "black" }}
                        onClick={() => router.push(path.link)}
                      >
                        Sign in
                      </Button>
                    ))}
                </div>
              </div>
              <div className="sm:hidden">
                <MenuIcon className="h-10" onClick={toggleMenu} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:hidden">
        <MobileMenu />
      </div>
    </>
  );
}

export default Header;
