/*
  Warnings:

  - You are about to alter the column `title` on the `Test` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE `Test` MODIFY `title` VARCHAR(100) NOT NULL,
    MODIFY `content` VARCHAR(1000) NOT NULL;

-- CreateTable
CREATE TABLE `Board` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `description` VARCHAR(500) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `content` TEXT NOT NULL,
    `boardId` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(500) NOT NULL,
    `postId` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_boardId_fkey` FOREIGN KEY (`boardId`) REFERENCES `Board`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
