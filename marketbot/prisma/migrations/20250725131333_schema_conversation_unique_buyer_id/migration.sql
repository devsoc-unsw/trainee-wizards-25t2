/*
  Warnings:

  - A unique constraint covering the columns `[buyerId]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Conversation_buyerId_key" ON "Conversation"("buyerId");
