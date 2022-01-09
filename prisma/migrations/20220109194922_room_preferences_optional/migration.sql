/*
  Warnings:

  - You are about to drop the column `roomPreferencesId` on the `Room` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[roomId]` on the table `RoomPreferences` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roomId` to the `RoomPreferences` table without a default value. This is not possible if the table is not empty.

*/



-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_roomPreferencesId_fkey";

-- DropIndex
DROP INDEX "Room_roomPreferencesId_key";

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "roomPreferencesId";

-- AlterTable
ALTER TABLE "RoomPreferences" ADD COLUMN     "roomId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RoomPreferences_roomId_key" ON "RoomPreferences"("roomId");

-- AddForeignKey
ALTER TABLE "RoomPreferences" ADD CONSTRAINT "RoomPreferences_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
