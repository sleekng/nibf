-- AlterTable
ALTER TABLE `bookstand` ADD COLUMN `admin_confirmed` BOOLEAN NOT NULL DEFAULT false,
    ALTER COLUMN `updated_at` DROP DEFAULT;
