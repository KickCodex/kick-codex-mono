-- AlterTable
ALTER TABLE `contributions` ADD COLUMN `diff` JSON NOT NULL,
    ADD COLUMN `original_data` JSON NOT NULL;
