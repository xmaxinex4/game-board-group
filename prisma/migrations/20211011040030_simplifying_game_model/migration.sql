/*
  Warnings:

  - You are about to drop the column `age` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `artists` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `bggComplexityRating` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `categories` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `cooperative` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `designers` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `families` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `highestWins` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `maxPlayers` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `maxPlaytime` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `mechanics` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `minPlayers` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `minPlaytime` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `noPoints` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `publishers` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `usesTeams` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Game` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "age",
DROP COLUMN "artists",
DROP COLUMN "bggComplexityRating",
DROP COLUMN "categories",
DROP COLUMN "cooperative",
DROP COLUMN "description",
DROP COLUMN "designers",
DROP COLUMN "families",
DROP COLUMN "highestWins",
DROP COLUMN "maxPlayers",
DROP COLUMN "maxPlaytime",
DROP COLUMN "mechanics",
DROP COLUMN "minPlayers",
DROP COLUMN "minPlaytime",
DROP COLUMN "noPoints",
DROP COLUMN "publishers",
DROP COLUMN "usesTeams",
DROP COLUMN "year";
