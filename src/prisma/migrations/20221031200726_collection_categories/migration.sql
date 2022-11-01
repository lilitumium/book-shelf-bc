/*
  Warnings:

  - You are about to drop the column `tagId` on the `collection` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `collection` DROP COLUMN `tagId`,
    ADD COLUMN `categoryId` INTEGER NULL;
