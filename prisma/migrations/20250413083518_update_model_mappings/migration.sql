/*
  Warnings:

  - You are about to drop the `payment_references` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `payment_references` DROP FOREIGN KEY `payment_references_registration_id_fkey`;

-- DropTable
DROP TABLE `payment_references`;

-- CreateTable
CREATE TABLE `payment_reference` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reference` VARCHAR(191) NOT NULL,
    `registration_id` VARCHAR(191) NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `payment_reference_reference_key`(`reference`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `payment_reference` ADD CONSTRAINT `payment_reference_registration_id_fkey` FOREIGN KEY (`registration_id`) REFERENCES `registration`(`registration_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
