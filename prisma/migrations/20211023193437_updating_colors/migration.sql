/*
  Warnings:

  - The values [LightPink,LightOrange,DarkOrange,LightYellow,Yellow,LightGreen,DarkGreen,LightBlue,Cyan,DarkBlue,LightPurple,DarkPurple,DarkBrown,DarkGrey,BlueGrey] on the enum `Color` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Color_new" AS ENUM ('Red', 'Rose', 'Pink', 'Merigold', 'Orange', 'Squash', 'Olive', 'Green', 'Pine', 'Blue', 'Teal', 'Navy', 'Lilac', 'Purple', 'Plum', 'Tan', 'Brown', 'Silver', 'Grey', 'Slate');
ALTER TABLE "User" ALTER COLUMN "color" TYPE "Color_new" USING ("color"::text::"Color_new");
ALTER TYPE "Color" RENAME TO "Color_old";
ALTER TYPE "Color_new" RENAME TO "Color";
DROP TYPE "Color_old";
COMMIT;
