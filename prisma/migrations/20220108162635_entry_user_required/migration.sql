-- AlterTable
ALTER TABLE "RoomPreferences" ADD COLUMN     "publicAfterEnd" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;
