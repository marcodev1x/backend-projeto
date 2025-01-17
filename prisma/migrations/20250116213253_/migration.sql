/*
  Warnings:

  - You are about to drop the column `email` on the `produtos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `produtos_email_key` ON `produtos`;

-- AlterTable
ALTER TABLE `produtos` DROP COLUMN `email`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `email` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_email_key` ON `users`(`email`);
