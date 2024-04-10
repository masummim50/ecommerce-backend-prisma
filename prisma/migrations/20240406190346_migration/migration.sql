-- CreateTable
CREATE TABLE "_StoreFollowers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_StoreFollowers_AB_unique" ON "_StoreFollowers"("A", "B");

-- CreateIndex
CREATE INDEX "_StoreFollowers_B_index" ON "_StoreFollowers"("B");

-- AddForeignKey
ALTER TABLE "_StoreFollowers" ADD CONSTRAINT "_StoreFollowers_A_fkey" FOREIGN KEY ("A") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StoreFollowers" ADD CONSTRAINT "_StoreFollowers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
