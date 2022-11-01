/*
  Warnings:

  - You are about to drop the column `collectionId` on the `book` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `book` DROP FOREIGN KEY `Book_categoriesId_fkey`;

-- DropForeignKey
ALTER TABLE `book` DROP FOREIGN KEY `Book_collectionId_fkey`;

-- AlterTable
ALTER TABLE `book` DROP COLUMN `collectionId`;

-- CreateTable
CREATE TABLE `_BookToTag` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_BookToTag_AB_unique`(`A`, `B`),
    INDEX `_BookToTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_BookToCollection` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_BookToCollection_AB_unique`(`A`, `B`),
    INDEX `_BookToCollection_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_BookToTag` ADD CONSTRAINT `_BookToTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BookToTag` ADD CONSTRAINT `_BookToTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BookToCollection` ADD CONSTRAINT `_BookToCollection_A_fkey` FOREIGN KEY (`A`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BookToCollection` ADD CONSTRAINT `_BookToCollection_B_fkey` FOREIGN KEY (`B`) REFERENCES `Collection`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
