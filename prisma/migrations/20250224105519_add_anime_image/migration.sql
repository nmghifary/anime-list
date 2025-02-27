/*
  Warnings:

  - You are about to drop the column `anime_title` on the `Comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "anime_title",
ADD COLUMN     "anime_image" TEXT;
