/*
  Warnings:

  - Added the required column `valor_pago` to the `pedidos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pedidos` ADD COLUMN `valor_pago` DOUBLE NOT NULL;
