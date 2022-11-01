/*
  Warnings:

  - You are about to drop the column `collectionId` on the `tag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `tag` DROP FOREIGN KEY `Tag_collectionId_fkey`;

-- AlterTable
ALTER TABLE `tag` DROP COLUMN `collectionId`;

-- AddForeignKey
ALTER TABLE `Collection` ADD CONSTRAINT `Collection_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
