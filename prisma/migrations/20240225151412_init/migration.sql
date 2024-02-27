/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `setting` will be added. If there are existing duplicate values, this will fail.
  - Made the column `type` on table `setting` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `setting` MODIFY `type` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `setting_type_key` ON `setting`(`type`);
