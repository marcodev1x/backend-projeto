/*
  Warnings:

  - You are about to drop the column `produto_id` on the `pedidos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `pedidos` DROP FOREIGN KEY `pedidos_produto_id_fkey`;

-- DropIndex
DROP INDEX `pedidos_produto_id_fkey` ON `pedidos`;

-- AlterTable
ALTER TABLE `pedidos` DROP COLUMN `produto_id`;

-- CreateTable
CREATE TABLE `ProdutoPedido` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `produto_id` INTEGER NOT NULL,
    `pedido_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProdutoPedido` ADD CONSTRAINT `ProdutoPedido_produto_id_fkey` FOREIGN KEY (`produto_id`) REFERENCES `produtos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProdutoPedido` ADD CONSTRAINT `ProdutoPedido_pedido_id_fkey` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
