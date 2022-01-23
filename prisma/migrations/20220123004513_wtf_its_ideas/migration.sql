/*
  Warnings:

  - You are about to drop the `Todo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Todo";

-- CreateTable
CREATE TABLE "Idea" (
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "Idea_pkey" PRIMARY KEY ("id")
);
