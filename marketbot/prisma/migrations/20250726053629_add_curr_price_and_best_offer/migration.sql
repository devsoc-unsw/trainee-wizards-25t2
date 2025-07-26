/*
  Warnings:

  - Added the required column `currPrice` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "currPrice" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Listing" ALTER COLUMN "bestOffer" SET DATA TYPE TEXT;
