-- CreateTable
CREATE TABLE "Todo" (
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
