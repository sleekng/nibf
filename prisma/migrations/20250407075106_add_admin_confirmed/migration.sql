/*
  Warnings:

  - You are about to drop the `bookstand` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `bookstand`;

-- CreateTable
CREATE TABLE `book_stands` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `company_name` VARCHAR(191) NOT NULL,
    `contact_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `stand_type` VARCHAR(191) NOT NULL,
    `payment_method` VARCHAR(191) NOT NULL,
    `additional_requirements` TEXT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `reference_id` VARCHAR(191) NOT NULL,
    `admin_confirmed` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `book_stands_reference_id_key`(`reference_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
