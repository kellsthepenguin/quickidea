-- CreateTable
CREATE TABLE "User" (
    "name" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "mail" TEXT NOT NULL,
    "pw" TEXT NOT NULL,
    "salt" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
