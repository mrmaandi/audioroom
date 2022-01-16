import { Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";

const LandingSection = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-grow py-12">
        <div className="m-auto py-32">
          <div className="flex flex-col items-center gap-5">
            <h1 className="text-5xl font-extrabold">Audioroom</h1>
            <p className="text-xl">The space for creativity</p>
            <Button
              bg="white"
              fontWeight="normal"
              color="black"
              size="lg"
              onClick={() => router.push("/library")}
            >
              Start Exploring
            </Button>
          </div>
        </div>
      </div>
      <div className="flex justify-center py-5">
        <div className="flex flex-col gap-2">
          <p>Find out what we`re about</p>
          <ChevronDownIcon className="animate-bounce h-6" />
        </div>
      </div>
    </>
  );
};

export default LandingSection;
