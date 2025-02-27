/*
  Warnings:

  - Changed the type of `anime_mal_id` on the `Comment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "anime_mal_id",
ADD COLUMN     "anime_mal_id" INTEGER NOT NULL;
