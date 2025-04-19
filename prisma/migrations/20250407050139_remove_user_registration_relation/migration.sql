/*
  Warnings:

  - You are about to drop the column `userId` on the `registration` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `registration` DROP FOREIGN KEY `Registration_userId_fkey`;

-- DropIndex
DROP INDEX `Registration_userId_fkey` ON `registration`;

-- AlterTable
ALTER TABLE `registration` DROP COLUMN `userId`;
