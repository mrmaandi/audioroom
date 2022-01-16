import { Entry } from "@prisma/client";
import { Room } from "@prisma/client";
import { User } from "@prisma/client";
import { RoomPreferences } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface CreateRoomRequest {
  title: string;
  description?: string;
  startDateTime?: Date;
  endDateTime?: Date;
  isPrivate?: boolean;
  makePublicAfterEnd?: boolean;
}

export interface CreateEntryRequest {
  roomId: string;
  audioFile: string;
}

export type RoomCombined = Room & { roomPreferences: RoomPreferences | null; entries: Entry[]; User: User; }

/* export async function main() {
  await prisma.user
    .create({
      data: {},
    })
    .then(async () => {
      const allUsers = await prisma.user.findMany({
        include: {
          entries: true,
          profile: true,
        },
      });
    })
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
 */
export async function getRooms(): Promise<RoomCombined[]> {
  return await prisma.room.findMany({include: {
    roomPreferences: true,
    entries: true,
    User: true
  }}).finally(async () => {
    await prisma.$disconnect();
  });
}


export async function getRoom(id: string): Promise<RoomCombined | null> {
  return await prisma.room.findUnique({include: {
    roomPreferences: true,
    entries: true,
    User: true
  }, where: {
    id: id
  }}).finally(async () => {
    await prisma.$disconnect();
  });
}
