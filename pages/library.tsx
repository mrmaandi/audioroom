import { Room } from "@prisma/client";
import { GetStaticPropsContext } from "next";
import Header from "../components/Header";
import { getRooms } from "../database/database";

interface Props {
  data: Room[];
}

function Library({ data }: Props) {
  return (
    <div className="relative">
      <Header />
      <div className="md:container md:mx-auto">
        <h1 className="text-3xl mb-6">Library</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.length === 0 && <p>No data found</p>}
          {data.map((room) => (
            <div className="border rounded bg-slate-100">
              <h1 className="text-lg">{room.id}</h1>
              <p className="text-sm">{room.createdAt}</p>
            </div>
          ))}
        </div>
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
