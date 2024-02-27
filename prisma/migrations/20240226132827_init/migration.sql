-- DropForeignKey
ALTER TABLE `submenu` DROP FOREIGN KEY `submenu_banner_fkey`;

-- AlterTable
ALTER TABLE `submenu` MODIFY `banner` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `submenu` ADD CONSTRAINT `submenu_banner_fkey` FOREIGN KEY (`banner`) REFERENCES `media`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
