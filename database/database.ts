import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function main() {
    await prisma.user.create({
        data: {
          
        },
      })
      .then(async () => {
        const allUsers = await prisma.user.findMany({
            include: {
              entries: true,
              profile: true,
            },
          })
          
          console.dir(allUsers, { depth: null })
      })
      .catch((e) => {
        throw e
      })
      .finally(async () => {
        await prisma.$disconnect()
      })
}