/*
  Warnings:

  - You are about to drop the `setting` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `setting`;

-- CreateTable
CREATE TABLE `about` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `image` INTEGER NOT NULL,
    `description` TEXT NOT NULL,
    `about_us` LONGTEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `about` ADD CONSTRAINT `about_image_fkey` FOREIGN KEY (`image`) REFERENCES `media`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
