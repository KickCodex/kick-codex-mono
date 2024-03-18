/*
  Warnings:

  - A unique constraint covering the columns `[provider_name,provider_uid]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `image` TEXT NULL,
    ADD COLUMN `provider_name` VARCHAR(50) NULL,
    ADD COLUMN `provider_uid` VARCHAR(100) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_provider_name_provider_uid_key` ON `users`(`provider_name`, `provider_uid`);
