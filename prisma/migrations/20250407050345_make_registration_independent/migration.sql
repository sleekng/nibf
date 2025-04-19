/*
  Warnings:

  - You are about to drop the column `eventId` on the `registration` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `registration` DROP FOREIGN KEY `Registration_eventId_fkey`;

-- DropIndex
DROP INDEX `Registration_eventId_fkey` ON `registration`;

-- AlterTable
ALTER TABLE `registration` DROP COLUMN `eventId`,
    ADD COLUMN `eventName` VARCHAR(191) NOT NULL DEFAULT 'NIBF 2025';
