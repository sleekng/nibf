/*
  Warnings:

  - The primary key for the `registration` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `registration` table. All the data in the column will be lost.
  - You are about to drop the column `eventName` on the `registration` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `registration` table. All the data in the column will be lost.
  - You are about to drop the column `jobTitle` on the `registration` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `registration` table. All the data in the column will be lost.
  - You are about to drop the column `qrCode` on the `registration` table. All the data in the column will be lost.
  - You are about to drop the column `registrationId` on the `registration` table. All the data in the column will be lost.
  - You are about to drop the column `specialRequirements` on the `registration` table. All the data in the column will be lost.
  - You are about to drop the column `ticketType` on the `registration` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `registration` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `registration` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `interests` on the `registration` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - A unique constraint covering the columns `[registration_id]` on the table `Registration` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `first_name` to the `Registration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `Registration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registration_id` to the `Registration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `terms_accepted` to the `Registration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticket_type` to the `Registration` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Registration_qrCode_key` ON `registration`;

-- DropIndex
DROP INDEX `Registration_registrationId_key` ON `registration`;

-- AlterTable
ALTER TABLE `registration` DROP PRIMARY KEY,
    DROP COLUMN `createdAt`,
    DROP COLUMN `eventName`,
    DROP COLUMN `firstName`,
    DROP COLUMN `jobTitle`,
    DROP COLUMN `lastName`,
    DROP COLUMN `qrCode`,
    DROP COLUMN `registrationId`,
    DROP COLUMN `specialRequirements`,
    DROP COLUMN `ticketType`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `first_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `job_title` VARCHAR(191) NULL,
    ADD COLUMN `last_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `newsletter_subscribed` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `registration_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `special_requirements` TEXT NULL,
    ADD COLUMN `terms_accepted` BOOLEAN NOT NULL,
    ADD COLUMN `ticket_type` VARCHAR(191) NOT NULL,
    ADD COLUMN `user_id` VARCHAR(191) NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `interests` JSON NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Registration_registration_id_key` ON `Registration`(`registration_id`);
