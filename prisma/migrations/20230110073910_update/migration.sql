/*
  Warnings:

  - Added the required column `start` to the `SchedulePlan` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SchedulePlan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "start" DATETIME NOT NULL,
    "end" DATETIME,
    "eventId" INTEGER NOT NULL,
    CONSTRAINT "SchedulePlan_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SchedulePlan" ("eventId", "id") SELECT "eventId", "id" FROM "SchedulePlan";
DROP TABLE "SchedulePlan";
ALTER TABLE "new_SchedulePlan" RENAME TO "SchedulePlan";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
