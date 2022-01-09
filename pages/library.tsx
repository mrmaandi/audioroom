import { Room } from "@prisma/client";
import { GetStaticPropsContext } from "next";
import Header from "../components/Header";
import { getRooms } from "../database/database";

interface Props {
  data: Room[];
}

function Library({ data }: Props) {
  return (
    <div>
      <div className="sticky top-0 bg-white">
        <Header />
      </div>
      <div className="md:container md:mx-auto h-screen px-6 md:px-0">
        <h1 className="text-3xl my-6">Library</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.length === 0 && <p>No data found</p>}
          {data.map((room) => (
            <div className="border rounded bg-white">
              <h1 className="text-lg">{room.id}</h1>
              <p className="text-sm">{room.createdAt}</p>
            </div>
          ))}
        </div>
        <div className="h-screen">other</div>
      </div>
    </div>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const allRooms: Room[] = await getRooms();

  return {
    props: { data: JSON.parse(JSON.stringify(allRooms)) },
  };
}

export default Library;
