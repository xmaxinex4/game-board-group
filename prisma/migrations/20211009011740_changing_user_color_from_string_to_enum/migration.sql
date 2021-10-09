/*
  Warnings:

  - The values [PastelRed,PastelPink,PastelOrange,PastelYellow,PastelGreen,PastelTeal,PastelLightblue,PastelBlue,PastelPurple] on the enum `Color` will be removed. If these variants are still used in the database, this will fail.
  - Changed the type of `color` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Color_new" AS ENUM ('Red', 'LightPink', 'Pink', 'LightOrange', 'Orange', 'DarkOrange', 'LightYellow', 'Yellow', 'LightGreen', 'Green', 'DarkGreen', 'LightBlue', 'Cyan', 'Blue', 'Teal', 'DarkBlue', 'LightPurple', 'Purple', 'DarkPurple', 'Brown', 'DarkBrown', 'Grey', 'DarkGrey', 'BlueGrey');
ALTER TABLE "User" ALTER COLUMN "color" TYPE "Color_new" USING ("color"::text::"Color_new");
ALTER TYPE "Color" RENAME TO "Color_old";
ALTER TYPE "Color_new" RENAME TO "Color";
DROP TYPE "Color_old";
COMMIT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "color",
ADD COLUMN     "color" "Color" NOT NULL;
