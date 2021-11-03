-- CreateEnum
CREATE TYPE "PlayPreference" AS ENUM ('Never', 'Rarely', 'Sometimes', 'Usually', 'Always');

-- CreateTable
CREATE TABLE "UserPlayPreference" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "preference" "PlayPreference" NOT NULL,

    CONSTRAINT "UserPlayPreference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPlayPreference_userId_gameId_key" ON "UserPlayPreference"("userId", "gameId");

-- AddForeignKey
ALTER TABLE "UserPlayPreference" ADD CONSTRAINT "UserPlayPreference_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlayPreference" ADD CONSTRAINT "UserPlayPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
