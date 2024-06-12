/*
  Warnings:

  - You are about to drop the `Board` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_postId_fkey`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_boardId_fkey`;

-- DropTable
DROP TABLE `Board`;

-- DropTable
DROP TABLE `Comment`;

-- DropTable
DROP TABLE `Post`;

-- DropTable
DROP TABLE `Test`;

-- CreateTable
CREATE TABLE `test` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `content` VARCHAR(1000) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `board` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `description` VARCHAR(500) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `content` TEXT NOT NULL,
    `board_id` BIGINT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comment` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(500) NOT NULL,
    `post_id` BIGINT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `post_board_id_fkey` FOREIGN KEY (`board_id`) REFERENCES `board`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
