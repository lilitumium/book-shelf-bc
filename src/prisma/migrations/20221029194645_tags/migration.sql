-- AlterTable
ALTER TABLE `book` ADD COLUMN `categoriesId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Tags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_categoriesId_fkey` FOREIGN KEY (`categoriesId`) REFERENCES `Tags`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
