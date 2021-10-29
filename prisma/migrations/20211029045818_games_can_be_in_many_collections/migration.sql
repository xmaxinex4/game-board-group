-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_collectionId_fkey";

-- CreateTable
CREATE TABLE "_CollectionToGame" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CollectionToGame_AB_unique" ON "_CollectionToGame"("A", "B");

-- CreateIndex
CREATE INDEX "_CollectionToGame_B_index" ON "_CollectionToGame"("B");

-- AddForeignKey
ALTER TABLE "_CollectionToGame" ADD FOREIGN KEY ("A") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionToGame" ADD FOREIGN KEY ("B") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
