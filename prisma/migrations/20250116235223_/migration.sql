/*
  Warnings:

  - You are about to drop the `pedidos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `pedidos` DROP FOREIGN KEY `pedidos_produto_id_fkey`;

-- DropForeignKey
ALTER TABLE `pedidos` DROP FOREIGN KEY `pedidos_user_id_fkey`;

-- DropTable
DROP TABLE `pedidos`;

-- CreateTable
CREATE TABLE `_pedidos` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_pedidos_AB_unique`(`A`, `B`),
    INDEX `_pedidos_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_pedidos` ADD CONSTRAINT `_pedidos_A_fkey` FOREIGN KEY (`A`) REFERENCES `produtos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_pedidos` ADD CONSTRAINT `_pedidos_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
