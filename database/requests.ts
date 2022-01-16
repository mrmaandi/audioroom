import { PrismaClient, Room } from "@prisma/client";

const prisma = new PrismaClient();

export async function main() {
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

export async function getRooms(): Promise<Room[]> {
  return await prisma.room.findMany({include: {
    roomPreferences: true,
    entries: true,
    User: true
  }});
}

export interface CreateRoomRequest {
  title: string;
  description?: string;
  startDateTime?: Date;
  endDateTime?: Date;
  isPrivate?: boolean;
  makePublicAfterEnd?: boolean;
}