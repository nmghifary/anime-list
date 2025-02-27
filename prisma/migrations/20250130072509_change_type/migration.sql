/*
  Warnings:

  - Changed the type of `anime_mal_id` on the `Collection` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "anime_mal_id",
ADD COLUMN     "anime_mal_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Collection_user_email_anime_mal_id_key" ON "Collection"("user_email", "anime_mal_id");
