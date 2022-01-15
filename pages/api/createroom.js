import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default function createRoom(req, res) {
  if (req.method !== "POST") {
    res.status(400).send({ message: "Only POST requests allowed" });
    return;
  }

  const request = req.body;

  prisma.room.create({
    data: {
      start: request.startDateTime,
      end: request.endDateTime,
      roomPreferences: {
        create: {
          title: request.title,
          description: request.description,
          private: request.isPrivate,
          publicAfterEnd: request.makePublicAfterEnd,
        },
      },
    },
  }).then((response) => {
    res.status(200).json(response);
  });
}
