-- AlterTable
ALTER TABLE `setting` MODIFY `type` VARCHAR(191) NULL,
    MODIFY `value` LONGTEXT NULL,
    MODIFY `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NULL;
