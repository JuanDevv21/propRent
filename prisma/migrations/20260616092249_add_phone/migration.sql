/*
  Warnings:

  - Added the required column `telefono` to the `Inquilino` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefono` to the `Propietario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Inquilino" ADD COLUMN     "telefono" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Propietario" ADD COLUMN     "telefono" TEXT NOT NULL;
