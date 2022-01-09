import { MenuIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { burgerMenuState } from "../recoil-atoms/atoms";

function Header() {
  const [isOpen, setIsOpen] = useRecoilState(burgerMenuState);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full py-5 px-5 md:px-0">
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
              <div className="grid grid-flow-col gap-x-4">
                <Link href="/library">
                  <a>Library</a>
                </Link>
                <Link href="/pricing">
                  <a>Pricing</a>
                </Link>
                <Link href="/signin">
                  <a>Sign in</a>
                </Link>
              </div>
            </div>
            <div className="sm:hidden">
              <MenuIcon className="h-9" onClick={toggleMenu} />
            </div>
            <div className="sm:hidden">
              <div className={classNames("absolute left-0 top-0 w-4/6 h-screen bg-slate-500", {
                "hidden": isOpen
              })}>
                <div className="flex flex-col">
                  <div className="">
                    <a
                      href="index.html"
                      className="block text-sm px-2 py-4 text-white bg-green-500 font-semibold"
                    >
                      Home
                    </a>
                  </div>
                  <div>
                    <a
                      href="#services"
                      className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300"
                    >
                      Services
                    </a>
                  </div>
                  <div>
                    <a
                      href="#about"
                      className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300"
                    >
                      About
                    </a>
                  </div>
                  <div>
                    <a
                      href="#contact"
                      className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300"
                    >
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
