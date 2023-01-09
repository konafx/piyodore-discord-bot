/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "User_discordId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Count" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Count" ("count", "createdAt", "id", "updatedAt", "userId") SELECT "count", "createdAt", "id", "updatedAt", "userId" FROM "Count";
DROP TABLE "Count";
ALTER TABLE "new_Count" RENAME TO "Count";
CREATE UNIQUE INDEX "Count_userId_key" ON "Count"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
