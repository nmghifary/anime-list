/*
  Warnings:

  - A unique constraint covering the columns `[user_email,comment_id]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "Comment_anime_mal_id_idx" ON "Comment"("anime_mal_id");

-- CreateIndex
CREATE UNIQUE INDEX "Like_user_email_comment_id_key" ON "Like"("user_email", "comment_id");
