/*
  Warnings:

  - You are about to drop the column `produtoId` on the `pedidos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `pedidos` DROP FOREIGN KEY `pedidos_produtoId_fkey`;

-- DropIndex
DROP INDEX `pedidos_produtoId_fkey` ON `pedidos`;

-- AlterTable
ALTER TABLE `pedidos` DROP COLUMN `produtoId`;

-- CreateTable
CREATE TABLE `_PedidoProduto` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PedidoProduto_AB_unique`(`A`, `B`),
    INDEX `_PedidoProduto_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_PedidoProduto` ADD CONSTRAINT `_PedidoProduto_A_fkey` FOREIGN KEY (`A`) REFERENCES `pedidos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PedidoProduto` ADD CONSTRAINT `_PedidoProduto_B_fkey` FOREIGN KEY (`B`) REFERENCES `produtos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
