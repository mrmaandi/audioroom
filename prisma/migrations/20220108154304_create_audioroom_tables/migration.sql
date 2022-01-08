/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "start" TIMESTAMP(3),
    "end" TIMESTAMP(3),
    "roomPreferencesId" INTEGER NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomPreferences" (
    "id" SERIAL NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "private" BOOLEAN NOT NULL DEFAULT false,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "code" VARCHAR(20),

    CONSTRAINT "RoomPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entry" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "roomId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Social" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "platformId" INTEGER,
    "name" TEXT,
    "link" TEXT,
    "profileId" INTEGER NOT NULL,

    CONSTRAINT "Social_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialMediaPlatform" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,

    CONSTRAINT "SocialMediaPlatform_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Room_roomPreferencesId_key" ON "Room"("roomPreferencesId");

-- CreateIndex
CREATE UNIQUE INDEX "Entry_roomId_key" ON "Entry"("roomId");

-- CreateIndex
CREATE UNIQUE INDEX "Entry_userId_key" ON "Entry"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Social_profileId_key" ON "Social"("profileId");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_roomPreferencesId_fkey" FOREIGN KEY ("roomPreferencesId") REFERENCES "RoomPreferences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Social" ADD CONSTRAINT "Social_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "SocialMediaPlatform"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Social" ADD CONSTRAINT "Social_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
