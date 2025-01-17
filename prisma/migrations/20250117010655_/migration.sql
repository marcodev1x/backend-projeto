/*
  Warnings:

  - You are about to drop the `ProdutoPedido` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pedidos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ProdutoPedido` DROP FOREIGN KEY `ProdutoPedido_pedido_id_fkey`;

-- DropForeignKey
ALTER TABLE `ProdutoPedido` DROP FOREIGN KEY `ProdutoPedido_produto_id_fkey`;

-- DropForeignKey
ALTER TABLE `pedidos` DROP FOREIGN KEY `pedidos_user_id_fkey`;

-- DropTable
DROP TABLE `ProdutoPedido`;

-- DropTable
DROP TABLE `pedidos`;

-- CreateTable
CREATE TABLE `Pedido` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` ENUM('INDEFINIDO', 'EM_ABERTO', 'PROCESSANDO', 'FINALIZADO', 'CANCELADO') NOT NULL DEFAULT 'INDEFINIDO',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` INTEGER NOT NULL,
    `produtoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_produtoId_fkey` FOREIGN KEY (`produtoId`) REFERENCES `produtos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
