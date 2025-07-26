-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "bestOffer" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "Meeting" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "agreedPrice" DOUBLE PRECISION NOT NULL,
    "location" TEXT,
    "meetingDate" TIMESTAMP(3),
    "eventId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Meeting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Meeting_listingId_key" ON "Meeting"("listingId");

-- CreateIndex
CREATE UNIQUE INDEX "Meeting_conversationId_key" ON "Meeting"("conversationId");

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
