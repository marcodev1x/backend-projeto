-- AlterTable
ALTER TABLE `pedidos` ADD COLUMN `status` ENUM('INDEFINIDO', 'EM_ABERTO', 'PROCESSANDO', 'FINALIZADO', 'CANCELADO') NOT NULL DEFAULT 'INDEFINIDO';
