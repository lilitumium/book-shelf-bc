/*
  Warnings:

  - You are about to drop the `_booktocollection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_booktocollection` DROP FOREIGN KEY `_BookToCollection_A_fkey`;

-- DropForeignKey
ALTER TABLE `_booktocollection` DROP FOREIGN KEY `_BookToCollection_B_fkey`;

-- DropTable
DROP TABLE `_booktocollection`;
