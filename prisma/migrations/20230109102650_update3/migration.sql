/*
  Warnings:

  - Added the required column `guildId` to the `Count` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Count" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Count" ("count", "createdAt", "id", "updatedAt", "userId") SELECT "count", "createdAt", "id", "updatedAt", "userId" FROM "Count";
DROP TABLE "Count";
ALTER TABLE "new_Count" RENAME TO "Count";
CREATE UNIQUE INDEX "Count_userId_guildId_key" ON "Count"("userId", "guildId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
