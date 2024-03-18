/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `sneakers` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `sneaker.model_id` ON `sneakers`;

-- CreateIndex
CREATE UNIQUE INDEX `sneaker.name` ON `sneakers`(`name`);

-- RedefineIndex
CREATE INDEX `sneaker.model_id` ON `sneakers`(`model_id`);
