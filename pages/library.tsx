import { Button, Container } from "@chakra-ui/react";
import { Room } from "@prisma/client";
import { format, parse, parseISO } from "date-fns";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import Header from "../components/Header";
import { getRooms } from "../database/requests";

interface Props {
  data: Room[];
}

function Library({ data }: Props) {
  const router = useRouter();

  return (
    <div>
      <div className="sticky top-0 bg-white z-10 text-slate-700">
        <Header />
      </div>
      <Container maxW="container.xl">
        <div className="flex items-center">
          <h1 className="text-3xl my-6">Library</h1>
          <div className="flex-grow"></div>
          <Button
            fontWeight="normal"
            variant="outline"
            _hover={{ bg: "white", color: "black" }}
            onClick={() => router.push("/createroom")}
          >
            Create Room
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.length === 0 && <p>No data found</p>}
          {data.map((room) => (
            <div className="border rounded bg-white">
              <h1 className="text-lg">{(room as any).roomPreferences.title}</h1>
              <p className="text-md">{(room as any).roomPreferences.description}</p>
              <p className="text-sm">Start at {room.start && format(parseISO(room.start.toString()), "yyyy-MM-dd HH:mm")}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const allRooms: Room[] = await getRooms();

  return {
    props: { data: JSON.parse(JSON.stringify(allRooms)) },
    revalidate: 2
  };
}

export default Library;
