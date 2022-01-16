import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


export default (request, response) => {
  if (request.method !== "POST") {
    response.status(400).send({ message: "Only POST requests allowed" });
    return;
  }
  
  const req = request.body;
  const { cookies } = request 
  const ses = prisma.session.findUnique({
    where: { sessionToken: cookies['next-auth.session-token'] },
  });

  ses.then((result) => {
    console.log(result.userId);

    prisma.room.create({
      data: {
        start: req.startDateTime,
        end: req.endDateTime,
        createdBy: result.userId,
        roomPreferences: {
          create: {
            title: req.title,
            description: req.description,
            private: req.isPrivate,
            publicAfterEnd: req.makePublicAfterEnd,
            audioSample: ''
          },
        },
      },
    }).then((res) => {
      response.status(200).json(res);
    });
  })

}
