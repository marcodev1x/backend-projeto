/*
  Warnings:

  - You are about to drop the `_pedidos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_pedidos` DROP FOREIGN KEY `_pedidos_A_fkey`;

-- DropForeignKey
ALTER TABLE `_pedidos` DROP FOREIGN KEY `_pedidos_B_fkey`;

-- DropTable
DROP TABLE `_pedidos`;

-- CreateTable
CREATE TABLE `pedidos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` ENUM('INDEFINIDO', 'EM_ABERTO', 'PROCESSANDO', 'FINALIZADO', 'CANCELADO') NOT NULL DEFAULT 'INDEFINIDO',
    `user_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `produto_id` INTEGER NOT NULL,
    `valor_pago` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pedidos` ADD CONSTRAINT `pedidos_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pedidos` ADD CONSTRAINT `pedidos_produto_id_fkey` FOREIGN KEY (`produto_id`) REFERENCES `produtos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
